import React from "react";

export function VesperLogo({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Faceted Geometric Prism Logo */}
      <svg
        className="w-7 h-7 shrink-0"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 8L15 24H9L4 14L6 8Z"
          fill={light ? "#93C5FD" : "#2563EB"}
        />
        <path
          d="M16 8L26 8L18 24H12L16 8Z"
          fill={light ? "#FFFFFF" : "#0B63E5"}
        />
      </svg>
      <span
        className={`text-xl font-bold tracking-tight ${
          light ? "text-white" : "text-slate-900"
        }`}
      >
        Vesper
      </span>
    </div>
  );
}

export function HlaBadge({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
        <div className="w-2.5 h-2.5 rounded-full bg-white" />
      </div>
      <div className="text-left text-white leading-tight">
        <span className="block text-xs font-black tracking-wider uppercase">HLA</span>
        <span className="block text-[8px] font-semibold tracking-widest uppercase opacity-90 -mt-0.5">
          VISION AI LAB
        </span>
      </div>
    </div>
  );
}
