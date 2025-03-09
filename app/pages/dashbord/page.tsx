"use client";

import { useState, useEffect } from "react";
import { Info, Trash2, Plus, HelpCircle, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ModelDataPopup } from "@/app/components/ModelDataPopup";

export default function Home() {
  const [selectedVoice, setSelectedVoice] = useState("sarah");
  const [selectedProvider, setSelectedProvider] = useState("11labs");
  const [selectedModel, setSelectedModel] = useState("Eleven Flash V2.5");
  const [minChars, setMinChars] = useState("10");
  const [backgroundSound, setBackgroundSound] = useState("Default");
  const [selectedAssistant, setSelectedAssistant] = useState("Mary");
  const [activeTab, setActiveTab] = useState("model");
  const [firstMessage, setFirstMessage] = useState(
    "Hello, this is Mary from Mary&apos;s Dental. How can I assist you today?"
  );
  const [systemPrompt, setSystemPrompt] = useState(
    'You are a voice assistant for Mary&apos;s Dental, a dental office located at 123 North Face Place, Anaheim, California. The hours are 8 AM to 5PM daily, but they are closed on Sundays.\n\nMary&apos;s dental provides dental services to the local Anaheim community. The practicing dentist is Dr. Mary Smith.\n\nYou are tasked with answering questions about the business, and booking appointments. If they wish to book an appointment, your goal is to gather necessary information from callers in a friendly and efficient manner like follows:\n\n1. Ask for their full name.\n2. Ask for the purpose of their appointment.\n3. Request their preferred date and time for the appointment.\n4. Confirm all details with the caller, including the date and time of the appointment.\n\n- Be sure to be kind of funny and witty!\n- Keep all your responses short and simple. Use casual language, phrases like "Umm...", "Well...", and "I mean" are preferred.\n- This is a voice conversation, so keep your responses short, like in a real conversation. Don&apos;t ramble for too long.'
  );
  const [modelProvider, setModelProvider] = useState("openai");
  const [aiModel, setAiModel] = useState("gpt-4o-mini");
  const [temperature, setTemperature] = useState(1);
  const [maxTokens, setMaxTokens] = useState(250);
  const [detectEmotion, setDetectEmotion] = useState(true);
  const [isCreatingAssistant, setIsCreatingAssistant] = useState(false);
  const [isModelDataPopupOpen, setIsModelDataPopupOpen] = useState(false);
  const [modelData, setModelData] = useState<any>(null);

  // Sample assistants data
  const assistants = [
    { id: 1, name: "Shoppii assistance", subtitle: "ash" },
    { id: 2, name: "test1", subtitle: "" },
    { id: 3, name: "Mary", subtitle: "alloy" },
    { id: 4, name: "Mary", subtitle: "sarah" },
  ];

  // Handle publish button click
  const handlePublish = () => {
    // Collect all data from form sections
    const collectedData = {
      model: {
        firstMessage,
        systemPrompt,
        provider: modelProvider,
        model: aiModel,
        temperature,
        maxTokens
      },
      voice: {
        provider: selectedProvider,
        voice: selectedVoice,
        model: selectedModel,
        backgroundSound,
        minChars
      },
      transcriber: {
        // Add transcriber properties when they become available
      }
    };

    // Set the collected data and open the popup
    setModelData(collectedData);
    setIsModelDataPopupOpen(true);
  };

  // Handle test voice agent button click
  const handleTestVoiceAgent = () => {
    console.log("Testing voice agent with data:", modelData);
    // Here you would implement the actual voice agent testing functionality
    // For now, we're just logging the data
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white p-0 flex">
      {/* Left sidebar */}
      <div
        className="w-[240px] bg-[#1b1b1b] border-r border-[#2a2a2a] h-screen overflow-y-auto"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(38,208,206,0.25) 0%, rgba(27,27,27,1) 100%)",
        }}
      >
        <div className="p-4">
          <Button
            className="w-full flex items-center justify-between text-[#001f2b] mb-6 font-bold"
            style={{
              background: "linear-gradient(90deg, #26d0ce 0%, #9be15d 100%)",
              boxShadow: "0 0 10px rgba(38, 208, 206, 0.5)",
            }}
            onClick={() => setIsCreatingAssistant(true)}
          >
            <span>Create Assistant</span>
            <Plus size={16} />
          </Button>

          <div className="space-y-2 mt-2">
            {assistants.map((assistant) => (
              <div
                key={assistant.id}
                onClick={() => setSelectedAssistant(assistant.name)}
                className={`p-3 rounded-md cursor-pointer ${
                  selectedAssistant === assistant.name
                    ? "bg-[#9be15d] bg-opacity-30"
                    : "hover:bg-[#232323]"
                }`}
                style={{
                  boxShadow:
                    selectedAssistant === assistant.name
                      ? "0 0 8px rgba(155, 225, 93, 0.3)"
                      : "none",
                }}
              >
                <div
                  className={`font-medium ${
                    selectedAssistant === assistant.name
                      ? "text-[#9be15d] font-bold"
                      : "text-[#ffffff]"
                  }`}
                >
                  {assistant.name}
                </div>
                {assistant.subtitle && (
                  <div
                    className={`text-sm ${
                      selectedAssistant === assistant.name
                        ? "text-[#9be15d] text-opacity-80"
                        : "text-[#cccccc]"
                    }`}
                  >
                    {assistant.subtitle}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4">
        <div className="max-w-[1000px] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="text-[#001f2b] border-[#3a3a3a] hover:opacity-90 transition-opacity font-medium"
                style={{
                  background:
                    "linear-gradient(90deg, #26d0ce 0%, #9be15d 100%)",
                }}
              >
                Document...
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gradient-to-r from-[#26d0ce] to-[#1a2980] px-3 py-1.5 rounded-md">
                <span className="text-[#001f2b] font-medium">Cost</span>
                <span className="text-[#001f2b] font-medium">~$0.11</span>
                <span className="text-[#001f2b] font-medium">/min</span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-[#26d0ce] to-[#1a2980] px-3 py-1.5 rounded-md">
                <span className="text-[#001f2b] font-medium">Latency</span>
                <span className="text-[#001f2b] font-medium">~575</span>
                <span className="text-[#001f2b] font-medium">ms</span>
              </div>
            </div>
          </div>

          <Tabs
            defaultValue="model"
            className="w-full"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="bg-[#232323] p-1 mb-6">
              <TabsTrigger
                value="model"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#26d0ce] data-[state=active]:to-[#9be15d] data-[state=active]:text-[#001f2b]"
              >
                Model
              </TabsTrigger>
              <TabsTrigger
                value="transcriber"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#26d0ce] data-[state=active]:to-[#9be15d] data-[state=active]:text-[#001f2b]"
              >
                Transcriber
              </TabsTrigger>
              <TabsTrigger
                value="voice"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#26d0ce] data-[state=active]:to-[#9be15d] data-[state=active]:text-[#001f2b]"
              >
                Voice
              </TabsTrigger>
              <TabsTrigger
                value="functions"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#26d0ce] data-[state=active]:to-[#9be15d] data-[state=active]:text-[#001f2b]"
              >
                Functions
              </TabsTrigger>
              <TabsTrigger
                value="advanced"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#26d0ce] data-[state=active]:to-[#9be15d] data-[state=active]:text-[#001f2b]"
              >
                Advanced
              </TabsTrigger>
              <TabsTrigger
                value="analysis"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#26d0ce] data-[state=active]:to-[#9be15d] data-[state=active]:text-[#001f2b]"
              >
                Analysis
              </TabsTrigger>
            </TabsList>

            <TabsContent value="model" className="space-y-6">
              <Card
                className="bg-[#1b1b1b] border-[#2a2a2a] p-6"
                style={{
                  borderImage: "linear-gradient(to right, #26d0ce, #9be15d) 1",
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
              >
                <h2
                  className="text-lg font-medium mb-2"
                  style={{
                    background:
                      "linear-gradient(90deg, #26d0ce 0%, #9be15d 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Model
                </h2>
                <p className="text-[#89898a] text-sm mb-6">
                  This section allows you to configure the model for the
                  assistant.
                </p>

                <div className="flex gap-8">
                  {/* Left side - Prompt sections */}
                  <div className="flex-1 space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Label className="text-[#89898a] font-medium">
                          First Message
                        </Label>
                        <HelpCircle size={16} className="text-[#89898a]" />
                      </div>
                      <Textarea
                        value={firstMessage}
                        onChange={(e) => setFirstMessage(e.target.value)}
                        className="bg-[#232323] border-[#3a3a3a] min-h-[80px] text-white w-full"
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Label className="text-[#89898a] font-medium">
                          System Prompt
                        </Label>
                        <HelpCircle size={16} className="text-[#89898a]" />
                      </div>
                      <Textarea
                        value={systemPrompt}
                        onChange={(e) => setSystemPrompt(e.target.value)}
                        className="bg-[#232323] border-[#3a3a3a] min-h-[380px] text-white w-full"
                      />
                    </div>
                  </div>

                  {/* Right side - Configuration options */}
                  <div className="w-[300px] space-y-6">
                    <div>
                      <Label className="text-[#89898a] mb-2 block font-medium">
                        Provider
                      </Label>
                      <Select
                        value={modelProvider}
                        onValueChange={setModelProvider}
                      >
                        <SelectTrigger className="w-full bg-[#232323] border-[#3a3a3a] text-white">
                          <SelectValue placeholder="Select provider" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#232323] text-white border-[#3a3a3a]">
                          <SelectItem value="openai">openai</SelectItem>
                          <SelectItem value="anthropic">anthropic</SelectItem>
                          <SelectItem value="nebius">nebius</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-[#89898a] mb-2 block font-medium">
                        Model
                      </Label>
                      <Select value={aiModel} onValueChange={setAiModel}>
                        <SelectTrigger className="w-full bg-[#232323] border-[#3a3a3a] text-white">
                          <SelectValue placeholder="Select model" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#232323] text-white border-[#3a3a3a] max-h-[300px] overflow-y-auto">
                          <SelectItem value="gemma-2-2b-it">Gemma-2-2b-it</SelectItem>
                          <SelectItem value="gemma-2-9b-it">Gemma-2-9b-it</SelectItem>
                          <SelectItem value="gemma-27B-instruct">Gemma-27B-Instruct</SelectItem>
                          <SelectItem value="hermes-3-llama-3.1-405B">Hermes-3-Llama-3.1-405B</SelectItem>
                          <SelectItem value="llama-3.2-1B-instruct">Llama-3.2-1B-Instruct</SelectItem>
                          <SelectItem value="llama-3.2-3B-instruct">Llama-3.2-3B-Instruct</SelectItem>
                          <SelectItem value="llama-3.3-70B-instruct">Llama-3.3-70B-Instruct</SelectItem>
                          <SelectItem value="llama3-openbiollm-70B">Llama3-OpenBioLLM-70B</SelectItem>
                          <SelectItem value="llama3-openbiollm-8B">Llama3-OpenBioLLM-8B</SelectItem>
                          <SelectItem value="meta-llama-3.1-405B-instruct">Meta-Llama-3.1-405B-Instruct</SelectItem>
                          <SelectItem value="meta-llama-3.1-70B-instruct">Meta-Llama-3.1-70B-Instruct</SelectItem>
                          <SelectItem value="meta-llama-3.1-8B-instruct">Meta-Llama-3.1-8B-Instruct</SelectItem>
                          <SelectItem value="meta-llama-3.1-nemotron-70B-instruct-hf">Meta-Llama-3.1-Nemotron-70B-Instruct-HF</SelectItem>
                          <SelectItem value="mistral-nemo-instruct-2407">Mistral-Nemo-Instruct-2407</SelectItem>
                          <SelectItem value="mixtral-8x22B-instruct-v0.1">Mixtral-8×22B-Instruct-v0.1</SelectItem>
                          <SelectItem value="olmo-7B-instruct">OLMo-7B-Instruct</SelectItem>
                          <SelectItem value="phi-3-medium-128k-instruct">Phi-3-medium-128k-instruct</SelectItem>
                          <SelectItem value="phi-3-mini-4k-instruct">Phi-3-mini-4k-instruct</SelectItem>
                          <SelectItem value="phi-3.5-mini-instruct">Phi-3.5-mini-instruct</SelectItem>
                          <SelectItem value="phi-3.5-moe-instruct">Phi-3.5-MoE-instruct</SelectItem>
                          <SelectItem value="phi-4">phi-4</SelectItem>
                          <SelectItem value="qwen2.5-1.5B-instruct">Qwen2.5-1.5B-Instruct</SelectItem>
                          <SelectItem value="qwen2.5-32B-instruct">Qwen2.5-32B-Instruct</SelectItem>
                          <SelectItem value="qwen2.5-72B-instruct">Qwen2.5-72B-Instruct</SelectItem>
                          <SelectItem value="qwen2.5-coder-32B-instruct">Qwen2.5-Coder-32B-Instruct</SelectItem>
                          <SelectItem value="qwen2.5-coder-7B">Qwen2.5-Coder-7B</SelectItem>
                          <SelectItem value="qwen2.5-coder-7B-instruct">Qwen2.5-Coder-7B-Instruct</SelectItem>
                          <SelectItem value="qwq-32B">QwQ-32B</SelectItem>
                          <SelectItem value="qwq-32B-preview">QwQ-32B-Preview</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-[#89898a] mb-2 block font-medium">
                        Files
                      </Label>
                      <Select>
                        <SelectTrigger className="w-full bg-[#232323] border-[#3a3a3a] text-white">
                          <SelectValue placeholder="Select Files" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#232323] text-white border-[#3a3a3a]">
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Label
                            className="font-medium"
                            style={{
                              background:
                                "linear-gradient(90deg, #26d0ce 0%, #9be15d 100%)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                            }}
                          >
                            Temperature
                          </Label>
                          <HelpCircle size={16} className="text-[#89898a]" />
                        </div>
                        <span className="text-white">{temperature}</span>
                      </div>
                      <div className="relative pt-1">
                        <input
                          type="range"
                          min="0"
                          max="2"
                          step="0.1"
                          value={temperature}
                          onChange={(e) =>
                            setTemperature(parseFloat(e.target.value))
                          }
                          className="w-full appearance-none h-1 rounded-full outline-none text-white"
                          style={{
                            background:
                              "linear-gradient(90deg, #26d0ce 0%, #9be15d 100%)",
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Label
                            className="font-medium"
                            style={{
                              background:
                                "linear-gradient(90deg, #26d0ce 0%, #9be15d 100%)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                            }}
                          >
                            Max Tokens
                          </Label>
                          <HelpCircle size={16} className="text-[#89898a]" />
                        </div>
                        <span className="text-white">{maxTokens}</span>
                      </div>
                      <Input
                        type="number"
                        value={maxTokens}
                        onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                        className="bg-[#232323] border-[#3a3a3a] text-white focus:border-[#26d0ce] focus:ring-[#26d0ce]"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Label className="text-[#89898a] font-medium">
                          Detect Emotion
                        </Label>
                        <HelpCircle size={16} className="text-[#89898a]" />
                      </div>
                      <Switch
                        checked={detectEmotion}
                        onCheckedChange={setDetectEmotion}
                        className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#26d0ce] data-[state=checked]:to-[#1a2980]"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="voice" className="space-y-6">
              <Card
                className="bg-[#1b1b1b] border-[#2a2a2a] p-6"
                style={{
                  borderImage: "linear-gradient(to right, #26d0ce, #9be15d) 1",
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
              >
                <h2
                  className="text-lg font-medium mb-2"
                  style={{
                    background:
                      "linear-gradient(90deg, #26d0ce 0%, #9be15d 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Voice Configuration
                </h2>
                <p className="text-[#89898a] text-sm mb-6">
                  Choose from the list of voices, or sync your voice library if
                  you aren&apos;t able to find your voice in the dropdown. If
                  you are still facing any error, you can enable custom voice
                  and add a voice ID manually.
                </p>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="text-[#89898a] mb-2 block font-medium">
                      Provider
                    </Label>
                    <Select
                      value={selectedProvider}
                      onValueChange={setSelectedProvider}
                    >
                      <SelectTrigger className="w-full bg-[#232323] border-[#3a3a3a] text-white">
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#232323] text-white border-[#3a3a3a]">
                        <SelectItem value="11labs">11labs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label
                      className="mb-2 block font-medium"
                      style={{
                        background:
                          "linear-gradient(90deg, #26d0ce 0%, #9be15d 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      Voice
                    </Label>
                    <Select
                      value={selectedVoice}
                      onValueChange={setSelectedVoice}
                    >
                      <SelectTrigger className="w-full bg-[#232323] border-[#3a3a3a] text-white">
                        <SelectValue placeholder="Select voice" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#232323] text-white border-[#3a3a3a]">
                        <SelectItem value="sarah">sarah</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <Switch className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#26d0ce] data-[state=checked]:to-[#1a2980]" />
                  <Label
                    className="font-medium"
                    style={{
                      background:
                        "linear-gradient(90deg, #26d0ce 0%, #9be15d 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Add Voice ID Manually
                  </Label>
                </div>

                <div className="mt-6">
                  <Label className="text-[#89898a] mb-2 block font-medium">
                    Model
                  </Label>
                  <p className="text-[#89898a] text-sm mb-2">
                    This is the model that will be used.
                  </p>
                  <Select
                    value={selectedModel}
                    onValueChange={setSelectedModel}
                  >
                    <SelectTrigger className="w-full bg-[#232323] border-[#3a3a3a] text-white">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#232323] text-white border-[#3a3a3a]">
                      <SelectItem value="Eleven Flash V2.5">
                        Eleven Flash V2.5
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </Card>

              <Card
                className="bg-[#1b1b1b] border-[#2a2a2a] p-6"
                style={{
                  borderImage: "linear-gradient(to right, #26d0ce, #9be15d) 1",
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
              >
                <h2
                  className="text-lg font-medium mb-2"
                  style={{
                    background:
                      "linear-gradient(90deg, #26d0ce 0%, #9be15d 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Additional Configuration
                </h2>
                <p className="text-[#89898a] text-sm mb-6">
                  Configure additional settings for the voice of your assistant.
                </p>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Label
                        className="font-medium"
                        style={{
                          background:
                            "linear-gradient(90deg, #26d0ce 0%, #9be15d 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        Background Sound
                      </Label>
                      <Info size={16} className="text-[#89898a]" />
                    </div>
                    <Select
                      value={backgroundSound}
                      onValueChange={setBackgroundSound}
                    >
                      <SelectTrigger className="w-full bg-[#232323] border-[#3a3a3a] text-white">
                        <SelectValue placeholder="Select background sound" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#232323] text-white border-[#3a3a3a]">
                        <SelectItem value="Default">Default</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Label
                        className="font-medium"
                        style={{
                          background:
                            "linear-gradient(90deg, #26d0ce 0%, #9be15d 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        Input Min Characters
                      </Label>
                      <Info size={16} className="text-[#89898a]" />
                    </div>
                    <Input
                      value={minChars}
                      onChange={(e) => setMinChars(e.target.value)}
                      className="bg-[#232323] border-[#3a3a3a] text-white focus:border-[#26d0ce] focus:ring-[#26d0ce]"
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="transcriber" className="space-y-6">
              <Card
                className="bg-[#1b1b1b] border-[#2a2a2a] p-6"
                style={{
                  borderImage: "linear-gradient(to right, #26d0ce, #9be15d) 1",
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
              >
                <h2
                  className="text-lg font-medium mb-2"
                  style={{
                    background:
                      "linear-gradient(90deg, #26d0ce 0%, #9be15d 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Transcriber Configuration
                </h2>
                <p className="text-[#89898a] text-sm mb-6">
                  Configure the transcription settings for your assistant.
                </p>
                <div className="flex flex-col items-center justify-center text-[#89898a] py-12">
                  <p className="mb-2">
                    Transcriber settings will be available soon.
                  </p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="functions" className="space-y-6">
              <Card
                className="bg-[#1b1b1b] border-[#2a2a2a] p-6"
                style={{
                  borderImage: "linear-gradient(to right, #26d0ce, #9be15d) 1",
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
              >
                <h2
                  className="text-lg font-medium mb-2"
                  style={{
                    background:
                      "linear-gradient(90deg, #26d0ce 0%, #9be15d 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Functions Configuration
                </h2>
                <p className="text-[#89898a] text-sm mb-6">
                  Add custom functions for your assistant to use.
                </p>
                <div className="flex flex-col items-center justify-center text-[#89898a] py-12">
                  <p className="mb-2">
                    Functions configuration will be available soon.
                  </p>
                  <Button
                    variant="outline"
                    className="text-[#001f2b] border-[#3a3a3a] hover:opacity-90 transition-opacity mt-4 disabled:opacity-50"
                    style={{
                      background:
                        "linear-gradient(90deg, #26d0ce 0%, #1a2980 100%)",
                    }}
                    disabled
                  >
                    Add Function
                  </Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <Card
                className="bg-[#1b1b1b] border-[#2a2a2a] p-6"
                style={{
                  borderImage: "linear-gradient(to right, #26d0ce, #9be15d) 1",
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
              >
                <h2
                  className="text-lg font-medium mb-2"
                  style={{
                    background:
                      "linear-gradient(90deg, #26d0ce 0%, #9be15d 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Advanced Configuration
                </h2>
                <p className="text-[#89898a] text-sm mb-6">
                  Configure advanced settings for your assistant.
                </p>
                <div className="flex flex-col items-center justify-center text-[#89898a] py-12">
                  <p className="mb-2">
                    Advanced settings will be available soon.
                  </p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              <Card
                className="bg-[#1b1b1b] border-[#2a2a2a] p-6"
                style={{
                  borderImage: "linear-gradient(to right, #26d0ce, #9be15d) 1",
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
              >
                <h2
                  className="text-lg font-medium mb-2"
                  style={{
                    background:
                      "linear-gradient(90deg, #26d0ce 0%, #9be15d 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Analysis Configuration
                </h2>
                <p className="text-[#89898a] text-sm mb-6">
                  Configure analysis settings for your assistant.
                </p>
                <div className="flex flex-col items-center justify-center text-[#89898a] py-12">
                  <p className="mb-2">
                    Analysis settings will be available soon.
                  </p>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="fixed bottom-6 right-6">
            <Button
              className="text-[#001f2b] font-medium flex items-center gap-2 relative overflow-hidden group"
              style={{
                background: "linear-gradient(90deg, #26d0ce 0%, #9be15d 100%)",
              }}
              onClick={handlePublish}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#26d0ce] to-[#9be15d] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center gap-2">
                <Zap size={16} className="animate-pulse" />
                <span>Publish</span>
              </span>
              <span className="absolute -inset-x-1 bottom-0 h-[2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Button>
          </div>

          {/* Model Data Popup */}
          {modelData && (
            <ModelDataPopup 
              isOpen={isModelDataPopupOpen} 
              onClose={() => setIsModelDataPopupOpen(false)}
              data={modelData}
              onTestVoiceAgent={handleTestVoiceAgent}
            />
          )}
        </div>
      </div>
    </div>
  );
}
