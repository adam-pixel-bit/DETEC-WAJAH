"use client";

import React, { useState, useRef } from "react";
import { useCamera } from "@/hooks/useCamera";
import { useFaceExpressionDetection } from "@/hooks/useFaceExpressionDetection";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { CameraView } from "@/components/detection/CameraView";
import { DetectionControls } from "@/components/detection/DetectionControls";
import { ExpressionResultsPanel } from "@/components/detection/ExpressionResultsPanel";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, ShieldAlert, Cpu, Sparkles } from "lucide-react";

export default function DashboardClient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showLandmarks, setShowLandmarks] = useState(true);
  const [showBox, setShowBox] = useState(true);
  const [mirrored, setMirrored] = useState(true);

  // 1. Camera Lifecycle Hook
  const {
    videoRef,
    status: cameraStatus,
    errorMessage: cameraError,
    startCamera,
    stopCamera,
  } = useCamera();

  const isCameraActive = cameraStatus === "active";

  // 2. Face Expression Detection Hook
  const {
    modelStatus,
    detectionResult,
  } = useFaceExpressionDetection({
    videoRef,
    canvasRef,
    isCameraActive,
    showLandmarks,
    showBox,
    mirrored,
  });

  return (
    <div className="min-h-screen bg-[#EBF0F5] text-slate-900 flex flex-col font-sans">
      <DashboardNav
        isModelLoaded={modelStatus.isLoaded}
        modelLoading={modelStatus.isLoading}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Model Loading Warning Banner if applicable */}
        {modelStatus.error && (
          <Alert variant="destructive">
            <ShieldAlert className="w-4 h-4" />
            <AlertTitle>Neural Network Initialization Error</AlertTitle>
            <AlertDescription>{modelStatus.error}</AlertDescription>
          </Alert>
        )}

        {/* Top Header / Context Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-blue-50 text-[#0B63E5]">
                <Sparkles className="w-4 h-4" />
              </span>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                Real-Time Facial Expression Laboratory
              </h1>
            </div>
            <p className="text-xs text-slate-500">
              High-accuracy 68-point landmark tracking and 7-class geometric visual expression classification.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-mono text-xs font-semibold">
              <Cpu className="w-4 h-4 text-[#0B63E5]" />
              WebGL Accelerated Engine
            </span>
          </div>
        </div>

        {/* Main Grid: Left = Camera + Controls, Right = Real-Time Analytics Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (7 cols): Camera View & Controls */}
          <div className="lg:col-span-7 space-y-4">
            <CameraView
              videoRef={videoRef}
              canvasRef={canvasRef}
              cameraStatus={cameraStatus}
              errorMessage={cameraError}
              detectionResult={detectionResult}
              mirrored={mirrored}
              onStartCamera={startCamera}
            />

            <DetectionControls
              isCameraActive={isCameraActive}
              onStartCamera={startCamera}
              onStopCamera={stopCamera}
              showLandmarks={showLandmarks}
              onToggleLandmarks={() => setShowLandmarks((prev) => !prev)}
              showBox={showBox}
              onToggleBox={() => setShowBox((prev) => !prev)}
              mirrored={mirrored}
              onToggleMirror={() => setMirrored((prev) => !prev)}
            />

            {/* Quick Tips */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 space-y-2 text-xs shadow-sm">
              <h5 className="font-bold text-slate-900 flex items-center gap-2">
                <Info className="w-4 h-4 text-[#0B63E5]" />
                Optimization Protocol
              </h5>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-500">
                <li>Position face directly toward camera with even facial lighting.</li>
                <li>Avoid occlusions (e.g., hands over mouth, thick dark sunglasses).</li>
                <li>Inference runs entirely in local GPU WebGL memory with zero cloud transmission.</li>
              </ul>
            </div>
          </div>

          {/* Right Column (5 cols): Expression Results Panel */}
          <div className="lg:col-span-5 space-y-4">
            <ExpressionResultsPanel
              detectionResult={detectionResult}
              isCameraActive={isCameraActive}
            />
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 mt-auto">
        <p>Vesper Vision AI • Enterprise Facial Expression Intelligence</p>
      </footer>
    </div>
  );
}
