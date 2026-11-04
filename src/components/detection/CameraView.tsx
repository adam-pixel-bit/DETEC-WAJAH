"use client";

import React from "react";
import { Camera, AlertCircle, Eye, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { CameraStatus } from "@/hooks/useCamera";
import type { FacialDetectionResult } from "@/types/expression";

interface CameraViewProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  cameraStatus: CameraStatus;
  errorMessage: string | null;
  detectionResult: FacialDetectionResult | null;
  mirrored?: boolean;
  onStartCamera: () => void;
}

export const CameraView: React.FC<CameraViewProps> = ({
  videoRef,
  canvasRef,
  cameraStatus,
  errorMessage,
  detectionResult,
  mirrored = true,
  onStartCamera,
}) => {
  const isCameraActive = cameraStatus === "active";
  const hasFace = detectionResult?.hasFace ?? false;

  return (
    <div className="relative w-full aspect-[4/3] max-w-2xl mx-auto rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/90 shadow-lg flex items-center justify-center transition-all">
      {/* Video Stream Element */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`w-full h-full object-cover transition-transform duration-200 ${
          mirrored ? "-scale-x-100" : ""
        } ${isCameraActive ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      {/* Canvas Overlay for Bounding Box and Landmarks */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-200 ${
          mirrored ? "-scale-x-100" : ""
        } ${isCameraActive ? "opacity-100" : "opacity-0"}`}
      />

      {/* Status Overlays */}
      {isCameraActive && (
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/90 text-slate-800 shadow-md backdrop-blur-md border border-white/40">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Sensor Feed
            </span>

            {detectionResult?.fps ? (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-slate-900/80 text-white border border-slate-700 backdrop-blur-md">
                {detectionResult.fps} FPS
              </span>
            ) : null}
          </div>

          <span
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-md backdrop-blur-md border ${
              hasFace
                ? "bg-blue-600 text-white border-blue-500"
                : "bg-white/90 text-slate-700 border-white/40"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            {hasFace ? "Target Acquired" : "Scanning..."}
          </span>
        </div>
      )}

      {/* Empty State / Inactive Camera Prompt */}
      {!isCameraActive && cameraStatus !== "requesting" && cameraStatus !== "denied" && cameraStatus !== "error" && (
        <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0B63E5] shadow-sm">
            <Camera className="w-8 h-8" />
          </div>
          <div className="max-w-xs space-y-1">
            <h4 className="text-base font-bold text-slate-900">Camera Feed Inactive</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Activate local sensor to begin geometric facial landmarks and expression tracking.
            </p>
          </div>
          <Button
            onClick={onStartCamera}
            className="h-11 px-6 text-xs font-semibold gap-2 shadow-sm"
          >
            <Camera className="w-4 h-4" />
            Start Real-Time Detection
          </Button>
        </div>
      )}

      {/* Loading Permission State */}
      {cameraStatus === "requesting" && (
        <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center p-6 text-center space-y-3 z-20">
          <RefreshCw className="w-8 h-8 text-[#0B63E5] animate-spin" />
          <h4 className="text-sm font-bold text-slate-900">Requesting Camera Access</h4>
          <p className="text-xs text-slate-500 max-w-xs">
            Please approve the camera permission dialog in your browser.
          </p>
        </div>
      )}

      {/* Permission Denied or Error State */}
      {(cameraStatus === "denied" || cameraStatus === "error") && (
        <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-6 text-center space-y-3 z-20">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
            <AlertCircle className="w-7 h-7" />
          </div>
          <div className="max-w-sm space-y-1">
            <h4 className="text-sm font-bold text-slate-900">
              {cameraStatus === "denied" ? "Camera Access Denied" : "Device Input Error"}
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              {errorMessage || "Unable to acquire video stream from your device."}
            </p>
          </div>
          <Button
            onClick={onStartCamera}
            variant="outline"
            className="text-xs h-10 gap-2 mt-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
};
