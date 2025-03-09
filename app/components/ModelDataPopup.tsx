"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Headphones } from "lucide-react";
import { useState } from "react";
import VoiceAgent from "./VoiceAgent";

interface ModelDataPopupProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    model: {
      firstMessage: string;
      systemPrompt: string;
      provider: string;
      model: string;
      temperature: number;
      maxTokens: number;
    };
    voice: {
      provider: string;
      voice: string;
      model: string;
      language: string;
      backgroundSound: string;
      minChars: string;
    };
    transcriber: {
      provider: string;
      model: string;
      language: string;
    };
  };
  onTestVoiceAgent: () => void;
}

export function ModelDataPopup({
  isOpen,
  onClose,
  data,
  onTestVoiceAgent,
}: ModelDataPopupProps) {
  // Log configuration data to console
  console.log("Voice Agent Configuration:", data);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="bg-[#1b1b1b] border-[#2a2a2a] text-white max-w-[800px] max-h-[80vh] overflow-y-auto"
        style={{
          borderImage: "linear-gradient(to right, #26d0ce, #9be15d) 1",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        <DialogHeader>
          <DialogTitle
            className="text-xl font-medium"
            style={{
              background: "linear-gradient(90deg, #26d0ce 0%, #9be15d 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Voice Agent Configuration
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Model Section */}

          {/* Voice Agent Testing Section */}
          <Card className="bg-[#232323] border-[#3a3a3a] p-4">
            <h3
              className="text-lg font-medium mb-3"
              style={{
                background: "linear-gradient(90deg, #26d0ce 0%, #9be15d 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Test Your Voice Agent
            </h3>
            <p className="text-[#89898a] text-sm mb-4">
              Click the microphone button to start speaking and test your voice
              agent with the current configuration.
            </p>

            <VoiceAgent
              config={{
                model: {
                  provider: data.model.provider,
                  model: data.model.model,
                  temperature: data.model.temperature,
                  maxTokens: data.model.maxTokens,
                  systemPrompt: data.model.systemPrompt,
                  firstMessage: data.model.firstMessage,
                },
                voice: {
                  provider: data.voice.provider,
                  voice: data.voice.voice,
                  model: data.voice.model,
                  language: data.voice.language,
                  minChars: data.voice.minChars,
                },
                transcriber: {
                  provider: data.transcriber.provider,
                  model: data.transcriber.model,
                  language: data.transcriber.language,
                },
              }}
            />
          </Card>

          <Card className="bg-[#232323] border-[#3a3a3a] p-4">
            <h3
              className="text-lg font-medium mb-3"
              style={{
                background: "linear-gradient(90deg, #26d0ce 0%, #9be15d 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Model Configuration
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[#89898a] text-sm">Provider:</p>
                <p className="text-white">{data.model.provider}</p>
              </div>
              <div>
                <p className="text-[#89898a] text-sm">Model:</p>
                <p className="text-white">{data.model.model}</p>
              </div>
              <div>
                <p className="text-[#89898a] text-sm">Temperature:</p>
                <p className="text-white">{data.model.temperature}</p>
              </div>
              <div>
                <p className="text-[#89898a] text-sm">Max Tokens:</p>
                <p className="text-white">{data.model.maxTokens}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-[#89898a] text-sm">First Message:</p>
              <p className="text-white bg-[#1b1b1b] p-2 rounded-md mt-1">
                {data.model.firstMessage}
              </p>
            </div>
            <div className="mt-4">
              <p className="text-[#89898a] text-sm">System Prompt:</p>
              <pre className="text-white bg-[#1b1b1b] p-2 rounded-md mt-1 whitespace-pre-wrap">
                {data.model.systemPrompt}
              </pre>
            </div>
          </Card>

          {/* Voice Section */}
          <Card className="bg-[#232323] border-[#3a3a3a] p-4">
            <h3
              className="text-lg font-medium mb-3"
              style={{
                background: "linear-gradient(90deg, #26d0ce 0%, #9be15d 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Voice Configuration
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[#89898a] text-sm">Provider:</p>
                <p className="text-white">{data.voice.provider}</p>
              </div>
              <div>
                <p className="text-[#89898a] text-sm">Voice:</p>
                <p className="text-white">{data.voice.voice}</p>
              </div>
              <div>
                <p className="text-[#89898a] text-sm">Model:</p>
                <p className="text-white">{data.voice.model}</p>
              </div>
              <div>
                <p className="text-[#89898a] text-sm">Language:</p>
                <p className="text-white">{data.voice.language}</p>
              </div>
              <div>
                <p className="text-[#89898a] text-sm">Background Sound:</p>
                <p className="text-white">{data.voice.backgroundSound}</p>
              </div>
              <div>
                <p className="text-[#89898a] text-sm">Min Characters:</p>
                <p className="text-white">{data.voice.minChars}</p>
              </div>
            </div>
          </Card>

          {/* Transcriber Section */}
          <Card className="bg-[#232323] border-[#3a3a3a] p-4">
            <h3
              className="text-lg font-medium mb-3"
              style={{
                background: "linear-gradient(90deg, #26d0ce 0%, #9be15d 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Transcriber Configuration
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[#89898a] text-sm">Provider:</p>
                <p className="text-white">{data.transcriber.provider}</p>
              </div>
              <div>
                <p className="text-[#89898a] text-sm">Model:</p>
                <p className="text-white">{data.transcriber.model}</p>
              </div>
              <div>
                <p className="text-[#89898a] text-sm">Language:</p>
                <p className="text-white">{data.transcriber.language}</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex justify-center mt-6">
          <Button
            onClick={onClose}
            className="bg-[#232323] hover:bg-[#2a2a2a] text-white border-[#3a3a3a]"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
