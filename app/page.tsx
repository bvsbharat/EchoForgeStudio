"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Mic, Wand2 } from "lucide-react";

export default function Welcome() {
  return (
    <main className="flex min-h-screen flex-col bg-[#141414] text-white">
      {/* Header */}
      <header className="w-full py-4 px-8 flex justify-between items-center border-b border-[#2a2a2a]">
        <div className="flex items-center gap-2">
          <div className="relative p-1.5 bg-[#1d1d1d] rounded-md border border-[#2a2a2a]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#26d0ce]"
            >
              <path
                d="M12 2C11.0111 2 10.0444 2.29324 9.22215 2.84265C8.3999 3.39206 7.75904 4.17295 7.3806 5.08658C7.00216 6.00021 6.90315 7.00555 7.09607 7.97545C7.289 8.94536 7.7652 9.83627 8.46447 10.5355C9.16373 11.2348 10.0546 11.711 11.0245 11.9039C11.9945 12.0969 12.9998 11.9978 13.9134 11.6194C14.827 11.241 15.6079 10.6001 16.1573 9.77785C16.7068 8.95561 17 7.98891 17 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17 8C18.6569 8 20 6.65685 20 5C20 3.34315 18.6569 2 17 2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 12H5.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 12H19.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 17V22"
                stroke="#9be15d"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 22H16"
                stroke="#9be15d"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="7"
                y="12"
                width="10"
                height="5"
                rx="1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-[#26d0ce] to-[#9be15d] text-transparent bg-clip-text">
              EchoForge
            </span>
            <span className="text-[#cccccc] font-normal ml-1.5">Studio</span>
          </h1>
        </div>
        <nav className="flex gap-6">
          <Link
            href="#features"
            className="text-[#cccccc] hover:text-white transition-colors"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-[#cccccc] hover:text-white transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="#docs"
            className="text-[#cccccc] hover:text-white transition-colors"
          >
            Documentation
          </Link>
        </nav>
      </header>

      {/* Main content */}
      <div className="flex flex-1 flex-col items-center justify-center p-8">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, rgba(38,208,206,0.15) 0%, rgba(20,20,20,0) 50%)",
          }}
        />

        <div className="z-10 flex flex-col items-center justify-center max-w-3xl text-center gap-8">
          <h1 className="text-6xl font-extrabold tracking-tight text-white sm:text-7xl mb-2">
            Voice AI agents
            <span className="block mt-2">for any Business</span>
          </h1>

          <p className="text-xl text-[#cccccc]">
            Create custom voice assistants with advanced AI capabilities.
            Configure models, voices, and functions to build the perfect agent
            for your needs.
          </p>

          <div className="flex gap-6 mt-4">
            <Link href="/pages/dashbord">
              <Button
                className="flex items-center justify-between text-[#001f2b] px-8 py-6 text-lg font-bold"
                style={{
                  background:
                    "linear-gradient(90deg, #26d0ce 0%, #9be15d 100%)",
                  boxShadow: "0 0 10px rgba(38, 208, 206, 0.5)",
                }}
              >
                <span>Create an Agent</span>
                <Plus size={20} className="ml-2" />
              </Button>
            </Link>
          </div>

          <div className="mt-16 flex justify-center w-full">
            <div className="grid grid-cols-10 gap-2 w-full">
              {Array.from({ length: 50 }).map((_, i) => (
                <div
                  key={i}
                  className="h-3 w-full rounded-full"
                  style={{
                    backgroundColor: getRandomColor(),
                    opacity: Math.random() * 0.7 + 0.3,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function getRandomColor() {
  const colors = [
    "#26d0ce", // teal
    "#9be15d", // green
    "#f06292", // pink
    "#ba68c8", // purple
    "#4fc3f7", // blue
    "#fff176", // yellow
    "#ff8a65", // orange
    "#ffffff", // white
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
