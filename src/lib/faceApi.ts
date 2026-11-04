import type { FacialDetectionResult, ExpressionName } from '@/types/expression';

let faceapi: any = null;
let modelsLoaded = false;
let modelLoadingPromise: Promise<void> | null = null;

async function getFaceApi() {
  if (typeof window === 'undefined') return null;
  if (!faceapi) {
    faceapi = await import('@vladmandic/face-api');
  }
  return faceapi;
}

/**
 * Loads TinyFaceDetector, FaceLandmark68, and FaceExpressionNet from local /models directory.
 */
export async function loadFaceApiModels(): Promise<void> {
  if (typeof window === 'undefined') return;
  if (modelsLoaded) return;
  if (modelLoadingPromise) return modelLoadingPromise;

  modelLoadingPromise = (async () => {
    const api = await getFaceApi();
    if (!api) return;

    const MODEL_URL = '/models';

    // Load TinyFaceDetector for fast real-time face detection
    await api.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    // Load 68-point facial landmarks
    await api.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    // Load Face Expression Classifier (7 visual expression categories)
    await api.nets.faceExpressionNet.loadFromUri(MODEL_URL);

    modelsLoaded = true;
  })();

  return modelLoadingPromise;
}

export function areModelsLoaded(): boolean {
  return modelsLoaded;
}

/**
 * Executes face detection, landmark identification, and expression classification on a video frame.
 */
export async function detectFaceExpression(
  videoElement: HTMLVideoElement,
  fps = 0
): Promise<FacialDetectionResult | null> {
  if (typeof window === 'undefined' || !modelsLoaded || !videoElement || videoElement.readyState < 2) {
    return null;
  }

  const api = await getFaceApi();
  if (!api) return null;

  // Use TinyFaceDetector with balanced threshold and input size for smooth 30+ FPS
  const options = new api.TinyFaceDetectorOptions({
    inputSize: 320,
    scoreThreshold: 0.5,
  });

  const detection = await api
    .detectSingleFace(videoElement, options)
    .withFaceLandmarks()
    .withFaceExpressions();

  if (!detection) {
    return {
      hasFace: false,
      box: null,
      landmarks: null,
      dominantExpression: null,
      dominantConfidence: 0,
      allExpressions: {
        neutral: 0,
        happy: 0,
        sad: 0,
        angry: 0,
        fearful: 0,
        disgusted: 0,
        surprised: 0,
      },
      timestamp: Date.now(),
      fps,
    };
  }

  const { detection: faceBox, landmarks, expressions } = detection;

  // Extract raw scores for all 7 expressions
  const allExpressions: Record<ExpressionName, number> = {
    neutral: expressions.neutral || 0,
    happy: expressions.happy || 0,
    sad: expressions.sad || 0,
    angry: expressions.angry || 0,
    fearful: expressions.fearful || 0,
    disgusted: expressions.disgusted || 0,
    surprised: expressions.surprised || 0,
  };

  // Determine dominant expression
  let dominantExpression: ExpressionName = 'neutral';
  let dominantConfidence = 0;

  (Object.keys(allExpressions) as ExpressionName[]).forEach((exp) => {
    if (allExpressions[exp] > dominantConfidence) {
      dominantConfidence = allExpressions[exp];
      dominantExpression = exp;
    }
  });

  // Extract landmarks as simple point array
  const landmarkPoints = landmarks.positions.map((pt: any) => ({
    x: pt.x,
    y: pt.y,
  }));

  return {
    hasFace: true,
    box: {
      x: faceBox.box.x,
      y: faceBox.box.y,
      width: faceBox.box.width,
      height: faceBox.box.height,
    },
    landmarks: landmarkPoints,
    dominantExpression,
    dominantConfidence,
    allExpressions,
    timestamp: Date.now(),
    fps,
  };
}

/**
 * Draws visual bounding box, label, and landmark points directly onto an overlay canvas.
 */
export function drawDetectionOverlay(
  canvas: HTMLCanvasElement,
  video: HTMLVideoElement,
  result: FacialDetectionResult | null,
  options: { showLandmarks: boolean; showBox: boolean; mirrored: boolean }
) {
  if (typeof window === 'undefined') return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = video.videoWidth || 640;
  canvas.height = video.videoHeight || 480;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!result || !result.hasFace || !result.box) return;

  ctx.save();

  const { box, landmarks, dominantExpression, dominantConfidence } = result;

  // 1. Draw Bounding Box
  if (options.showBox) {
    ctx.strokeStyle = '#3b82f6'; // Clean blue
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.strokeRect(box.x, box.y, box.width, box.height);

    // Bounding Box Label Tag
    if (dominantExpression) {
      const label = `${dominantExpression.toUpperCase()} (${Math.round(dominantConfidence * 100)}%)`;
      ctx.font = '600 12px Plus Jakarta Sans, system-ui, sans-serif';
      const textWidth = ctx.measureText(label).width;
      
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(box.x, Math.max(0, box.y - 24), textWidth + 12, 22);

      ctx.fillStyle = '#ffffff';
      ctx.fillText(label, box.x + 6, Math.max(16, box.y - 8));
    }
  }

  // 2. Draw Facial Landmarks (68 points)
  if (options.showLandmarks && landmarks) {
    ctx.fillStyle = '#10b981'; // Emerald
    landmarks.forEach((pt) => {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 2, 0, 2 * Math.PI);
      ctx.fill();
    });
  }

  ctx.restore();
}
