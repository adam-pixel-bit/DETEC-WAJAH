"use client";

import { useState, useRef, useCallback, useEffect } from "react";

export type CameraStatus = "idle" | "requesting" | "active" | "denied" | "error";

interface UseCameraReturn {
  videoRef: React.RefObject<HTMLVideoElement>;
  status: CameraStatus;
  errorMessage: string | null;
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  stream: MediaStream | null;
  hasPermission: boolean;
}

export function useCamera(): UseCameraReturn {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [status, setStatus] = useState<CameraStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      setStream(null);
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setStatus("idle");
    setErrorMessage(null);
  }, [stream]);

  const startCamera = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setStatus("error");
      setErrorMessage("MediaDevices API is not supported in this browser environment.");
      return;
    }

    // Stop any existing stream first
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
    }

    setStatus("requesting");
    setErrorMessage(null);

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
          frameRate: { ideal: 30 },
        },
        audio: false,
      });

      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        // Wait for video metadata to load
        await new Promise<void>((resolve) => {
          if (!videoRef.current) return resolve();
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play().then(() => resolve()).catch(() => resolve());
          };
        });
      }

      setStatus("active");
    } catch (err: any) {
      console.error("[Camera Error]", err);
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        setStatus("denied");
        setErrorMessage(
          "Camera access permission was denied. Please allow camera permissions in your browser address bar to use this feature."
        );
      } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        setStatus("error");
        setErrorMessage(
          "No camera hardware detected on this device. Please connect a webcam."
        );
      } else if (err.name === "NotReadableError" || err.name === "TrackStartError") {
        setStatus("error");
        setErrorMessage(
          "Camera is currently being used by another application or tab."
        );
      } else {
        setStatus("error");
        setErrorMessage(err.message || "Failed to initialize camera stream.");
      }
    }
  }, [stream]);

  // Clean up all tracks on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [stream]);

  return {
    videoRef,
    status,
    errorMessage,
    startCamera,
    stopCamera,
    stream,
    hasPermission: status === "active",
  };
}
