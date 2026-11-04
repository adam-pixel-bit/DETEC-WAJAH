"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  loadFaceApiModels,
  detectFaceExpression,
  drawDetectionOverlay,
} from "@/lib/faceApi";
import type { FacialDetectionResult, ModelStatus } from "@/types/expression";

interface UseDetectionProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isCameraActive: boolean;
  showLandmarks?: boolean;
  showBox?: boolean;
  mirrored?: boolean;
}

export function useFaceExpressionDetection({
  videoRef,
  canvasRef,
  isCameraActive,
  showLandmarks = true,
  showBox = true,
  mirrored = true,
}: UseDetectionProps) {
  const [modelStatus, setModelStatus] = useState<ModelStatus>({
    isLoaded: false,
    isLoading: false,
    error: null,
    progressMessage: "Ready to load models",
  });

  const [detectionResult, setDetectionResult] = useState<FacialDetectionResult | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const frameCountRef = useRef<number>(0);
  const currentFpsRef = useRef<number>(0);

  // 1. Load models
  const initModels = useCallback(async () => {
    setModelStatus((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
      progressMessage: "Loading facial vision neural networks from local storage...",
    }));

    try {
      await loadFaceApiModels();
      setModelStatus({
        isLoaded: true,
        isLoading: false,
        error: null,
        progressMessage: "AI Models loaded successfully",
      });
    } catch (err: any) {
      console.error("[Model Load Error]", err);
      setModelStatus({
        isLoaded: false,
        isLoading: false,
        error: err.message || "Failed to load neural network weights",
        progressMessage: "Model load failed",
      });
    }
  }, []);

  // 2. Detection loop
  const runDetection = useCallback(async () => {
    if (!videoRef.current || !isCameraActive) {
      return;
    }

    const now = performance.now();
    frameCountRef.current++;

    if (now - lastTimeRef.current >= 1000) {
      currentFpsRef.current = frameCountRef.current;
      frameCountRef.current = 0;
      lastTimeRef.current = now;
    }

    try {
      const result = await detectFaceExpression(videoRef.current, currentFpsRef.current);
      setDetectionResult(result);

      if (canvasRef.current && videoRef.current) {
        drawDetectionOverlay(canvasRef.current, videoRef.current, result, {
          showLandmarks,
          showBox,
          mirrored,
        });
      }
    } catch (err) {
      console.error("[Detection Loop Error]", err);
    }

    if (isCameraActive) {
      requestRef.current = requestAnimationFrame(runDetection);
    }
  }, [isCameraActive, videoRef, canvasRef, showLandmarks, showBox, mirrored]);

  // Start / stop detection loop based on camera & model state
  useEffect(() => {
    if (isCameraActive && modelStatus.isLoaded) {
      setIsDetecting(true);
      requestRef.current = requestAnimationFrame(runDetection);
    } else {
      setIsDetecting(false);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
      // Clear canvas when camera stops
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
      }
      setDetectionResult(null);
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
    };
  }, [isCameraActive, modelStatus.isLoaded, runDetection, canvasRef]);

  // Load models on initial mount
  useEffect(() => {
    initModels();
  }, [initModels]);

  return {
    modelStatus,
    detectionResult,
    isDetecting,
    initModels,
  };
}
