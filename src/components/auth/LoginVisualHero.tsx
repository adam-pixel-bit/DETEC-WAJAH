import React from "react";
import { HlaBadge } from "@/components/ui/VesperLogo";
import { Smile, Activity, Eye, ShieldCheck, CheckCircle2 } from "lucide-react";

export function LoginVisualHero() {
  return (
    <div className="relative w-full h-full min-h-[580px] rounded-2xl lg:rounded-3xl bg-gradient-to-br from-[#0047BA] via-[#0B63E5] to-[#003B99] p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-2xl">
      {/* Background ambient lighting/waves */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-blue-900/30 blur-2xl pointer-events-none" />

      {/* Top Header Content */}
      <div className="relative z-10 space-y-4">
        <HlaBadge />
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight max-w-sm">
          Empowering real-time vision intelligence
        </h2>
        <p className="text-xs text-blue-100/80 max-w-xs font-normal">
          Instant client-side facial expression analysis, 68 anatomical landmarks, and zero biometric cloud storage.
        </p>
      </div>

      {/* 3D Angled Tablet / Device Mockup (Matching the reference image perspective) */}
      <div className="relative z-10 mt-8 w-full flex justify-end">
        <div
          className="w-[340px] sm:w-[420px] lg:w-[440px] bg-slate-900 p-2.5 rounded-[32px] shadow-[-25px_30px_70px_rgba(0,15,50,0.6)] border-[4px] border-slate-800/80 transform rotate-[-10deg] translate-x-8 sm:translate-x-12 translate-y-6 sm:translate-y-8 select-none transition-transform hover:rotate-[-8deg] duration-300"
          style={{ perspective: "1000px" }}
        >
          {/* Inner Tablet Display */}
          <div className="bg-[#F8FAFC] rounded-[22px] overflow-hidden border border-slate-200 text-slate-800 p-3.5 space-y-3">
            {/* Top Bar inside Tablet */}
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-bold text-slate-700 ml-2">Vesper Vision OS</span>
              </div>
              <div className="flex items-center gap-1.5 text-[9px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Camera Ready
              </div>
            </div>

            {/* Dashboard Mock Content inside Tablet */}
            <div className="grid grid-cols-12 gap-2.5">
              {/* Mini Sidebar inside Tablet */}
              <div className="col-span-4 bg-white p-2 rounded-xl border border-slate-200/70 space-y-2 text-[9px] text-slate-600">
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Modules</span>
                <div className="p-1 rounded bg-blue-50 text-blue-700 font-bold flex items-center gap-1">
                  <Activity className="w-2.5 h-2.5" />
                  <span>Face Vision</span>
                </div>
                <div className="p-1 rounded hover:bg-slate-50 flex items-center gap-1">
                  <Eye className="w-2.5 h-2.5 text-slate-400" />
                  <span>Landmarks</span>
                </div>
                <div className="p-1 rounded hover:bg-slate-50 flex items-center gap-1">
                  <ShieldCheck className="w-2.5 h-2.5 text-slate-400" />
                  <span>Privacy</span>
                </div>
              </div>

              {/* Main Preview inside Tablet */}
              <div className="col-span-8 space-y-2">
                {/* Metric Card */}
                <div className="bg-white p-2.5 rounded-xl border border-slate-200/70 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-slate-400 font-medium">Dominant Visual Match</span>
                    <p className="text-sm font-bold text-slate-900 flex items-center gap-1">
                      <Smile className="w-3.5 h-3.5 text-emerald-500" />
                      Happy (94%)
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-slate-400 font-medium">Inference Latency</span>
                    <p className="text-xs font-bold text-blue-600">18 ms / 60 FPS</p>
                  </div>
                </div>

                {/* Patient/Subject Analysis Row */}
                <div className="bg-white p-2 rounded-xl border border-slate-200/70 space-y-1">
                  <span className="text-[8px] font-bold text-slate-400 uppercase">Analysis Stream</span>
                  <div className="flex items-center justify-between text-[9px] border-b border-slate-100 pb-1">
                    <span className="font-semibold text-slate-700">Subject 01</span>
                    <span className="text-emerald-600 font-medium flex items-center gap-0.5">
                      <CheckCircle2 className="w-2.5 h-2.5" /> 68 Pts
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[9px]">
                    <span className="font-semibold text-slate-700">WebGL Acceleration</span>
                    <span className="text-blue-600 font-medium">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
