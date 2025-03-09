"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Headphones } from "lucide-react";

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
      backgroundSound: string;
      minChars: string;
    };
    transcriber: {
      // Add transcriber properties when they become available
    };
  };
  onTestVoiceAgent: () => void;
}

export function ModelDataPopup({ isOpen, onClose, data, onTestVoiceAgent }: ModelDataPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1b1b1b] border-[#2a2a2a] text-white max-w-[800px] max-h-[80vh] overflow-y-auto"
        style={{
          borderImage: "linear-gradient(to right, #26d0ce, #9be15d) 1",
          borderWidth: "1px",
          borderStyle: "solid",
        }}>
        <DialogHeader>
          <DialogTitle 
            className="text-xl font-medium"
            style={{
              background: "linear-gradient(90deg, #26d0ce 0%, #9be15d 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
            Voice Agent Configuration
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          {/* Model Section */}
          <Card className="bg-[#232323] border-[#3a3a3a] p-4">
            <h3 
              className="text-lg font-medium mb-3"
              style={{
                background: "linear-gradient(90deg, #26d0ce 0%, #9be15d 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
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
              <p className="text-white bg-[#1b1b1b] p-2 rounded-md mt-1">{data.model.firstMessage}</p>
            </div>
            <div className="mt-4">
              <p className="text-[#89898a] text-sm">System Prompt:</p>
              <pre className="text-white bg-[#1b1b1b] p-2 rounded-md mt-1 whitespace-pre-wrap">{data.model.systemPrompt}</pre>
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
              }}>
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
                <p className="text-[#89898a] text-sm">Background Sound:</p>
                <p className="text-white">{data.voice.backgroundSound}</p>
              </div>
              <div>
                <p className="text-[#89898a] text-sm">Min Characters:</p>
                <p className="text-white">{data.voice.minChars}</p>
              </div>
            </div>
          </Card>

          {/* Transcriber Section - Can be expanded when transcriber settings are available */}
          <Card className="bg-[#232323] border-[#3a3a3a] p-4">
            <h3 
              className="text-lg font-medium mb-3"
              style={{
                background: "linear-gradient(90deg, #26d0ce 0%, #9be15d 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
              Transcriber Configuration
            </h3>
            <p className="text-[#89898a]">Transcriber settings will be available soon.</p>
          </Card>

          {/* JSON Data Display */}
          <Card className="bg-[#232323] border-[#3a3a3a] p-4">
            <h3 
              className="text-lg font-medium mb-3"
              style={{
                background: "linear-gradient(90deg, #26d0ce 0%, #9be15d 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
              Complete Configuration (JSON)
            </h3>
            <pre className="text-white bg-[#1b1b1b] p-3 rounded-md overflow-x-auto text-sm">
              {JSON.stringify(data, null, 2)}
            </pre>
          </Card>
        </div>

        <div className="flex justify-between mt-6">
          <Button 
            onClick={onClose}
            className="bg-[#232323] hover:bg-[#2a2a2a] text-white border-[#3a3a3a]">
            Close
          </Button>
          <Button 
            onClick={onTestVoiceAgent}
            className="text-[#001f2b] font-medium flex items-center gap-2"
            style={{
              background: "linear-gradient(90deg, #26d0ce 0%, #9be15d 100%)",
            }}>
            <Headphones size={16} />
            Test Voice Agent
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
