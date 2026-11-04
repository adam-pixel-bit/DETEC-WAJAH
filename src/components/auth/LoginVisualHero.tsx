"use client";

import React, { useState, useRef } from "react";
import { HlaBadge } from "@/components/ui/VesperLogo";
import {
  Smile,
  Activity,
  Eye,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap,
  Frown,
  Meh,
  AlertCircle
} from "lucide-react";

type MockExpression = "happy" | "surprised" | "neutral" | "focused";

export function LoginVisualHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeExpression, setActiveExpression] = useState<MockExpression>("happy");
  const [activeModule, setActiveModule] = useState<"vision" | "landmarks" | "privacy">("vision");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Mouse Parallax 3D Tilt calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Moderate tilt factor
    setTilt({
      x: -(y / rect.height) * 12,
      y: (x / rect.width) * 14,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const expressionData: Record<
    MockExpression,
    { label: string; score: number; latency: string; color: string; icon: any; barBg: string }
  > = {
    happy: {
      label: "Happy",
      score: 96,
      latency: "16 ms",
      color: "text-emerald-500",
      icon: Smile,
      barBg: "bg-emerald-500",
    },
    surprised: {
      label: "Surprised",
      score: 92,
      latency: "19 ms",
      color: "text-amber-500",
      icon: Sparkles,
      barBg: "bg-amber-500",
    },
    neutral: {
      label: "Neutral",
      score: 89,
      latency: "15 ms",
      color: "text-blue-500",
      icon: Meh,
      barBg: "bg-blue-500",
    },
    focused: {
      label: "Focused",
      score: 91,
      latency: "17 ms",
      color: "text-purple-500",
      icon: AlertCircle,
      barBg: "bg-purple-500",
    },
  };

  const current = expressionData[activeExpression];
  const CurrentIcon = current.icon;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full min-h-[580px] rounded-2xl lg:rounded-3xl bg-gradient-to-br from-[#0047BA] via-[#0B63E5] to-[#003B99] p-6 sm:p-8 lg:p-10 flex flex-col justify-between overflow-hidden shadow-2xl transition-all select-none"
    >
      {/* Background ambient lighting/waves */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-blue-900/40 blur-2xl pointer-events-none" />

      {/* Top Header Content */}
      <div className="relative z-10 space-y-3">
        <div className="flex items-center justify-between">
          <HlaBadge />
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-white/15 text-white backdrop-blur-md border border-white/20">
            <Zap className="w-3 h-3 text-amber-300" /> Interactive Preview
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight max-w-sm">
          Empowering real-time vision intelligence
        </h2>
        <p className="text-xs text-blue-100/80 max-w-xs font-normal">
          Instant client-side facial expression analysis, 68 anatomical landmarks, and zero biometric cloud storage.
        </p>
      </div>

      {/* Interactive 3D Tablet Mockup */}
      <div className="relative z-10 mt-6 w-full flex justify-end">
        <div
          className="w-[330px] sm:w-[380px] lg:w-[410px] bg-slate-900 p-2.5 rounded-[32px] shadow-[-25px_30px_70px_rgba(0,15,50,0.65)] border-[4px] border-slate-800/90 transform transition-transform duration-150 ease-out"
          style={{
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) rotateZ(-7deg) translate(20px, 15px)`,
          }}
        >
          {/* Inner Tablet Display */}
          <div className="bg-[#F8FAFC] rounded-[22px] overflow-hidden border border-slate-200 text-slate-800 p-3 space-y-2.5 shadow-inner">
            {/* Top Bar inside Tablet */}
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-rose-400" />
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-bold text-slate-700 ml-1.5">Vesper Vision OS</span>
              </div>
              <div className="flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live 60 FPS
              </div>
            </div>

            {/* Dashboard Mock Content inside Tablet */}
            <div className="grid grid-cols-12 gap-2">
              {/* Mini Sidebar inside Tablet (Interactive Modules) */}
              <div className="col-span-4 bg-white p-2 rounded-xl border border-slate-200/70 space-y-1.5 text-[9px]">
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Modules</span>
                
                <button
                  type="button"
                  onClick={() => setActiveModule("vision")}
                  className={`w-full text-left p-1.5 rounded-lg font-bold flex items-center gap-1 transition-all ${
                    activeModule === "vision"
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Activity className="w-2.5 h-2.5" />
                  <span>Face Vision</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModule("landmarks")}
                  className={`w-full text-left p-1.5 rounded-lg font-bold flex items-center gap-1 transition-all ${
                    activeModule === "landmarks"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Eye className="w-2.5 h-2.5" />
                  <span>68 Landmarks</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModule("privacy")}
                  className={`w-full text-left p-1.5 rounded-lg font-bold flex items-center gap-1 transition-all ${
                    activeModule === "privacy"
                      ? "bg-purple-50 text-purple-700 border border-purple-200"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <ShieldCheck className="w-2.5 h-2.5" />
                  <span>Privacy Guard</span>
                </button>
              </div>

              {/* Main Preview inside Tablet */}
              <div className="col-span-8 space-y-2">
                {activeModule === "vision" && (
                  <>
                    {/* Metric Card */}
                    <div className="bg-white p-2 rounded-xl border border-slate-200/70 flex items-center justify-between shadow-xs">
                      <div>
                        <span className="text-[8px] text-slate-400 font-semibold uppercase">Dominant Match</span>
                        <p className={`text-xs font-black flex items-center gap-1 ${current.color}`}>
                          <CurrentIcon className="w-3.5 h-3.5" />
                          {current.label} ({current.score}%)
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-[8px] text-slate-400 font-semibold uppercase">Latency</span>
                        <p className="text-[11px] font-bold text-blue-600">{current.latency}</p>
                      </div>
                    </div>

                    {/* Interactive Expression Selector Pills inside tablet */}
                    <div className="bg-white p-2 rounded-xl border border-slate-200/70 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] font-bold text-slate-400 uppercase">Test Simulator</span>
                        <span className="text-[7px] font-bold text-blue-600 bg-blue-50 px-1 py-0.2 rounded">Tap any</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        {(["happy", "surprised", "neutral", "focused"] as MockExpression[]).map((exp) => (
                          <button
                            key={exp}
                            type="button"
                            onClick={() => setActiveExpression(exp)}
                            className={`py-1 px-1.5 rounded-lg text-[9px] font-bold capitalize transition-all border ${
                              activeExpression === exp
                                ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                            }`}
                          >
                            {exp === "happy" && "😄 "}
                            {exp === "surprised" && "😮 "}
                            {exp === "neutral" && "😐 "}
                            {exp === "focused" && "🧐 "}
                            {exp}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {activeModule === "landmarks" && (
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200/70 space-y-1.5 text-center">
                    <span className="text-[8px] font-bold text-emerald-600 uppercase">68 Anatomical Coordinates</span>
                    <div className="h-16 rounded-lg bg-slate-950 flex items-center justify-center relative overflow-hidden">
                      <div className="w-9 h-11 border-2 border-emerald-400/80 rounded-xl flex flex-col items-center justify-center p-1 relative">
                        <div className="flex gap-2 mb-1">
                          <span className="w-1 h-1 rounded-full bg-emerald-400" />
                          <span className="w-1 h-1 rounded-full bg-emerald-400" />
                        </div>
                        <span className="w-1.5 h-0.5 bg-emerald-400 mb-1" />
                        <span className="w-4 h-1 border-b-2 border-emerald-400 rounded-full" />
                      </div>
                      <span className="absolute bottom-1 right-1.5 text-[7px] font-mono text-emerald-400 bg-emerald-950/80 px-1 rounded">
                        100% Tracked
                      </span>
                    </div>
                    <p className="text-[8px] text-slate-500">Real-time ocular, nasal, and mandibular contour mesh.</p>
                  </div>
                )}

                {activeModule === "privacy" && (
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200/70 space-y-1.5 text-left">
                    <span className="text-[8px] font-bold text-purple-600 uppercase flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      Zero Cloud Footprint
                    </span>
                    <p className="text-[8px] text-slate-600 leading-relaxed">
                      Frames stream directly into browser WebGL textures and expire instantly. No biometric images ever leave your device.
                    </p>
                    <div className="p-1 rounded bg-purple-50 text-purple-700 text-[8px] font-bold text-center">
                      HIPAA & GDPR Privacy Architecture
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
