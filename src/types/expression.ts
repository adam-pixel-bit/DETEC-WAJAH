export type ExpressionName =
  | 'neutral'
  | 'happy'
  | 'sad'
  | 'angry'
  | 'fearful'
  | 'disgusted'
  | 'surprised';

export interface ExpressionScore {
  expression: ExpressionName;
  score: number; // 0.0 to 1.0
  percentage: number; // 0 to 100
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface FacialDetectionResult {
  hasFace: boolean;
  box: BoundingBox | null;
  landmarks: Point[] | null;
  dominantExpression: ExpressionName | null;
  dominantConfidence: number; // 0.0 to 1.0
  allExpressions: Record<ExpressionName, number>;
  timestamp: number;
  fps: number;
}

export interface ModelStatus {
  isLoaded: boolean;
  isLoading: boolean;
  error: string | null;
  progressMessage: string;
}
