"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Settings, Loader2, Send } from "lucide-react";
import { Input } from "@/components/ui/input";

interface VoiceAgentProps {
  config: {
    model: {
      provider: string;
      model: string;
      temperature: number;
      maxTokens: number;
      systemPrompt: string;
      firstMessage: string;
    };
    voice: {
      provider: string;
      voice: string;
      model: string;
      language: string;
      minChars: string;
    };
    transcriber: {
      provider: string;
      model: string;
      language: string;
    };
  };
}

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

export default function VoiceAgent({ config }: VoiceAgentProps): JSX.Element {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Initialize with system prompt and first message if provided
  useEffect(() => {
    const initialMessages: Message[] = [];

    if (config.model.systemPrompt) {
      initialMessages.push({
        role: "system",
        content: config.model.systemPrompt,
      });
    }

    if (config.model.firstMessage) {
      initialMessages.push({
        role: "assistant",
        content: config.model.firstMessage,
      });
    }

    setMessages(initialMessages);
  }, [config.model.systemPrompt, config.model.firstMessage]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    // Add user message to the chat
    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Create a temporary message for the streaming response
      const tempMessageIndex = messages.length + 1; // +1 for the user message
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      // Send all messages to API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: config.model.model, // Use model from props
          temperature: config.model.temperature, // Use temperature from props
          max_tokens: config.model.maxTokens, // Use maxTokens from props
          top_p: 0.9, // Add top_p parameter
          stream: true, // Enable streaming
          extra_body: { top_k: 50 }, // Add top_k parameter
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      if (!reader) throw new Error("Response body reader not available");

      const decoder = new TextDecoder();
      let assistantResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // Decode the chunk and process it
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.substring(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              console.log("Parsed chunk:", parsed);
              
              // Handle different response formats
              let content = "";
              
              // OpenAI format with delta
              if (parsed.choices?.[0]?.delta?.content) {
                content = parsed.choices[0].delta.content;
              }
              // Nebius/other format with message
              else if (parsed.choices?.[0]?.message?.content) {
                content = parsed.choices[0].message.content;
              }
              // Handle any other format that might contain content
              else if (typeof parsed.content === 'string') {
                content = parsed.content;
              }
              
              if (content) {
                assistantResponse += content;
                // Update the message in real-time
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[tempMessageIndex] = {
                    role: "assistant",
                    content: assistantResponse,
                  };
                  return updated;
                });
              }
            } catch (e) {
              console.error("Error parsing SSE chunk:", e, "Raw data:", data);
            }
          }
        }
      }

      // If we didn't get any response, update with a fallback message
      if (!assistantResponse) {
        setMessages((prev) => {
          const updated = [...prev];
          updated[tempMessageIndex] = {
            role: "assistant",
            content:
              "I received your message but couldn't generate a response.",
          };
          return updated;
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Add error message to chat
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto p-4 flex flex-col h-[600px]">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages
          .filter((m) => m.role !== "system")
          .map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                message.role === "user" ? "bg-blue-100 ml-auto" : "bg-gray-100"
              } max-w-[80%]`}
            >
              {message.content}
            </div>
          ))}
        {isLoading && (
          <div className="flex justify-center items-center">
            <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          className="flex-1"
        />
        <Button onClick={sendMessage} disabled={isLoading || !input.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
