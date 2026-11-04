"use client";

import React, { useState, useRef, useEffect } from "react";
import { useCamera } from "@/hooks/useCamera";
import { useFaceExpressionDetection } from "@/hooks/useFaceExpressionDetection";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { CameraView } from "@/components/detection/CameraView";
import { DetectionControls } from "@/components/detection/DetectionControls";
import { ExpressionResultsPanel } from "@/components/detection/ExpressionResultsPanel";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Info,
  ShieldAlert,
  Cpu,
  Sparkles,
  Camera,
  Download,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Clock,
  Trash2,
  CheckCircle2,
  Sliders
} from "lucide-react";
import type { ExpressionName } from "@/types/expression";

interface SnapshotItem {
  id: string;
  dataUrl: string;
  expression: ExpressionName;
  confidence: number;
  timestamp: string;
}

interface ExpressionLog {
  id: string;
  expression: ExpressionName;
  confidence: number;
  time: string;
}

export default function DashboardClient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLandmarks, setShowLandmarks] = useState(true);
  const [showBox, setShowBox] = useState(true);
  const [mirrored, setMirrored] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Interactive Snapshot gallery
  const [snapshots, setSnapshots] = useState<SnapshotItem[]>([]);
  // Interactive Rolling Timeline
  const [expressionHistory, setExpressionHistory] = useState<ExpressionLog[]>([]);
  const lastLoggedExpRef = useRef<ExpressionName | null>(null);

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

  // Web Audio Synthesizer for high-tech sound feedback
  const playExpressionChime = (expression: ExpressionName) => {
    if (!isAudioEnabled || typeof window === "undefined") return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const freqMap: Record<ExpressionName, number> = {
        happy: 659.25, // E5
        surprised: 783.99, // G5
        neutral: 440.0, // A4
        sad: 349.23, // F4
        angry: 293.66, // D4
        fearful: 523.25, // C5
        disgusted: 369.99, // F#4
      };

      osc.type = "sine";
      osc.frequency.setValueAtTime(freqMap[expression] || 440, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch {
      // Audio autoplay policy fallback
    }
  };

  // Record rolling timeline of changes
  useEffect(() => {
    if (detectionResult?.hasFace && detectionResult.dominantExpression) {
      const exp = detectionResult.dominantExpression;
      if (exp !== lastLoggedExpRef.current) {
        lastLoggedExpRef.current = exp;
        playExpressionChime(exp);

        const newLog: ExpressionLog = {
          id: Math.random().toString(36).substring(7),
          expression: exp,
          confidence: Math.round(detectionResult.dominantConfidence * 100),
          time: new Date().toLocaleTimeString(),
        };

        setExpressionHistory((prev) => [newLog, ...prev.slice(0, 9)]);
      }
    }
  }, [detectionResult, isAudioEnabled]);

  // Interactive Snapshot Capture
  const handleTakeSnapshot = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const overlay = canvasRef.current;

    // Create an offscreen canvas to combine video frame + detection overlay
    const snapCanvas = document.createElement("canvas");
    snapCanvas.width = video.videoWidth || 640;
    snapCanvas.height = video.videoHeight || 480;
    const ctx = snapCanvas.getContext("2d");
    if (!ctx) return;

    if (mirrored) {
      ctx.translate(snapCanvas.width, 0);
      ctx.scale(-1, 1);
    }

    // Draw video
    ctx.drawImage(video, 0, 0, snapCanvas.width, snapCanvas.height);

    // Draw overlay
    ctx.drawImage(overlay, 0, 0, snapCanvas.width, snapCanvas.height);

    const dataUrl = snapCanvas.toDataURL("image/png");
    const newItem: SnapshotItem = {
      id: Date.now().toString(),
      dataUrl,
      expression: detectionResult?.dominantExpression || "neutral",
      confidence: Math.round((detectionResult?.dominantConfidence || 0) * 100),
      timestamp: new Date().toLocaleTimeString(),
    };

    setSnapshots((prev) => [newItem, ...prev.slice(0, 5)]);
  };

  // Toggle Theater / Fullscreen Mode
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EBF0F5] text-slate-900 flex flex-col font-sans">
      <DashboardNav
        isModelLoaded={modelStatus.isLoaded}
        modelLoading={modelStatus.isLoading}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-7 space-y-6">
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

          <div className="flex flex-wrap items-center gap-2">
            {/* Interactive Audio Feedback Toggle */}
            <button
              onClick={() => setIsAudioEnabled(!isAudioEnabled)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                isAudioEnabled
                  ? "bg-blue-50 border-blue-200 text-[#0B63E5]"
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
              title="Toggle audio tone feedback on expression changes"
            >
              {isAudioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{isAudioEnabled ? "Audio Chime ON" : "Audio Muted"}</span>
            </button>

            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-mono text-xs font-semibold">
              <Cpu className="w-4 h-4 text-[#0B63E5]" />
              WebGL Accelerated
            </span>
          </div>
        </div>

        {/* Main Grid: Left = Camera + Controls, Right = Real-Time Analytics Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (7 cols): Camera View, Controls & Interactive Snapshot */}
          <div className="lg:col-span-7 space-y-4" ref={containerRef}>
            {/* Interactive Viewport Action Header */}
            <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-[#0B63E5]" />
                Live Video Feed
              </span>

              <div className="flex items-center gap-2">
                {isCameraActive && (
                  <button
                    onClick={handleTakeSnapshot}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#0B63E5] hover:bg-[#0952C2] text-white text-xs font-bold shadow-xs transition-all active:scale-95"
                    title="Capture current frame with landmark annotations"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Capture Snapshot</span>
                  </button>
                )}

                <button
                  onClick={toggleFullscreen}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  title="Toggle Fullscreen"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

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

            {/* Interactive Snapshot Gallery Drawer */}
            {snapshots.length > 0 && (
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Captured Scans Gallery ({snapshots.length})
                  </span>
                  <button
                    onClick={() => setSnapshots([])}
                    className="text-[11px] font-semibold text-rose-600 hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" /> Clear
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {snapshots.map((item) => (
                    <div
                      key={item.id}
                      className="group relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50"
                    >
                      <img
                        src={item.dataUrl}
                        alt="Captured Face"
                        className="w-full aspect-[4/3] object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-2 text-white">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold capitalize bg-blue-600 px-1.5 py-0.5 rounded">
                            {item.expression} ({item.confidence}%)
                          </span>
                          <a
                            href={item.dataUrl}
                            download={`vesper-${item.expression}-${item.id}.png`}
                            className="p-1 rounded bg-white text-slate-900 hover:bg-slate-100 transition-colors"
                            title="Download PNG"
                          >
                            <Download className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column (5 cols): Expression Results Panel & Interactive Rolling History */}
          <div className="lg:col-span-5 space-y-4">
            <ExpressionResultsPanel
              detectionResult={detectionResult}
              isCameraActive={isCameraActive}
            />

            {/* Interactive Real-Time Expression History Log */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#0B63E5]" />
                  Live Transition History
                </span>
                <span className="text-[10px] font-bold text-slate-400">Rolling Feed</span>
              </div>

              {expressionHistory.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">
                  {isCameraActive
                    ? "Observing expressions..."
                    : "Activate camera to record live transitions"}
                </p>
              ) : (
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {expressionHistory.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-center justify-between text-xs p-2 rounded-xl bg-slate-50 border border-slate-200/60"
                    >
                      <span className="font-semibold text-slate-800 capitalize flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#0B63E5]" />
                        {log.expression}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                          {log.confidence}%
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">{log.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 mt-auto">
        <p>Vesper Vision AI • Enterprise Facial Expression Intelligence</p>
      </footer>
    </div>
  );
}
