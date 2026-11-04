"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Camera, Square, CheckSquare, FlipHorizontal, Eye } from "lucide-react";

interface DetectionControlsProps {
  isCameraActive: boolean;
  onStartCamera: () => void;
  onStopCamera: () => void;
  showLandmarks: boolean;
  onToggleLandmarks: () => void;
  showBox: boolean;
  onToggleBox: () => void;
  mirrored: boolean;
  onToggleMirror: () => void;
}

export const DetectionControls: React.FC<DetectionControlsProps> = ({
  isCameraActive,
  onStartCamera,
  onStopCamera,
  showLandmarks,
  onToggleLandmarks,
  showBox,
  onToggleBox,
  mirrored,
  onToggleMirror,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
      {/* Primary Action Button */}
      <div className="flex items-center gap-2">
        {isCameraActive ? (
          <Button
            onClick={onStopCamera}
            variant="destructive"
            className="text-xs h-10 px-5 font-semibold gap-2 shadow-sm"
          >
            <Camera className="w-4 h-4" />
            Stop Camera Feed
          </Button>
        ) : (
          <Button
            onClick={onStartCamera}
            className="text-xs h-10 px-5 font-semibold gap-2 shadow-sm"
          >
            <Camera className="w-4 h-4" />
            Activate Camera
          </Button>
        )}
      </div>

      {/* Visual Configuration Toggles */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={onToggleBox}
          disabled={!isCameraActive}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98] ${
            showBox
              ? "bg-blue-50 border-blue-200 text-[#0B63E5] shadow-xs"
              : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
          title="Toggle Bounding Box"
        >
          {showBox ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
          Bounding Box
        </button>

        <button
          onClick={onToggleLandmarks}
          disabled={!isCameraActive}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98] ${
            showLandmarks
              ? "bg-emerald-50 border-emerald-200 text-emerald-700 shadow-xs"
              : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
          title="Toggle 68 Anatomical Landmarks"
        >
          <Eye className="w-4 h-4" />
          68 Landmarks
        </button>

        <button
          onClick={onToggleMirror}
          disabled={!isCameraActive}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98] ${
            mirrored
              ? "bg-slate-100 border-slate-300 text-slate-800"
              : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
          title="Toggle Mirror View"
        >
          <FlipHorizontal className="w-4 h-4" />
          Mirror Feed
        </button>
      </div>
    </div>
  );
};
