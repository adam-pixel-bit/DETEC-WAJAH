"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Info, Sparkles, Smile, Frown, Meh, AlertCircle, HelpCircle } from "lucide-react";
import type { FacialDetectionResult, ExpressionName } from "@/types/expression";

interface ExpressionResultsPanelProps {
  detectionResult: FacialDetectionResult | null;
  isCameraActive: boolean;
}

const EXPRESSION_CONFIG: Record<
  ExpressionName,
  { label: string; textColor: string; icon: any; barColor: string; bgBadge: string }
> = {
  happy: { label: "Happy", textColor: "text-emerald-700", icon: Smile, barColor: "bg-emerald-500", bgBadge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  sad: { label: "Sad", textColor: "text-indigo-700", icon: Frown, barColor: "bg-indigo-500", bgBadge: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  angry: { label: "Angry", textColor: "text-rose-700", icon: AlertCircle, barColor: "bg-rose-500", bgBadge: "bg-rose-50 text-rose-700 border-rose-200" },
  surprised: { label: "Surprised", textColor: "text-amber-700", icon: Sparkles, barColor: "bg-amber-500", bgBadge: "bg-amber-50 text-amber-800 border-amber-200" },
  fearful: { label: "Fearful", textColor: "text-purple-700", icon: AlertCircle, barColor: "bg-purple-500", bgBadge: "bg-purple-50 text-purple-700 border-purple-200" },
  disgusted: { label: "Disgusted", textColor: "text-teal-700", icon: Meh, barColor: "bg-teal-600", bgBadge: "bg-teal-50 text-teal-700 border-teal-200" },
  neutral: { label: "Neutral", textColor: "text-[#0B63E5]", icon: Meh, barColor: "bg-[#0B63E5]", bgBadge: "bg-blue-50 text-[#0B63E5] border-blue-200" },
};

export const ExpressionResultsPanel: React.FC<ExpressionResultsPanelProps> = ({
  detectionResult,
  isCameraActive,
}) => {
  const hasFace = detectionResult?.hasFace ?? false;
  const dominant = detectionResult?.dominantExpression;
  const dominantConfig = dominant ? EXPRESSION_CONFIG[dominant] : null;
  const dominantPercentage = detectionResult?.dominantConfidence
    ? Math.round(detectionResult.dominantConfidence * 100)
    : 0;

  return (
    <div className="space-y-4">
      {/* Primary Dominant Expression Card */}
      <Card className="border-slate-200/80 bg-white shadow-sm">
        <CardHeader className="pb-3 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0B63E5]" />
              Visual Classification Metrics
            </CardTitle>
            <Badge variant={isCameraActive && hasFace ? "success" : "secondary"}>
              {!isCameraActive
                ? "Camera Offline"
                : hasFace
                ? "Active Inference"
                : "Awaiting Face"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-5 pt-4">
          {isCameraActive && hasFace && dominantConfig ? (
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Dominant Pattern
                </span>
                <div className="flex items-center gap-2.5">
                  <h3 className={`text-2xl font-black tracking-tight ${dominantConfig.textColor}`}>
                    {dominantConfig.label}
                  </h3>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${dominantConfig.bgBadge}`}>
                    {dominantPercentage}% Match
                  </span>
                </div>
              </div>

              <div className={`p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm ${dominantConfig.textColor}`}>
                <dominantConfig.icon className="w-7 h-7" />
              </div>
            </div>
          ) : (
            <div className="p-7 rounded-2xl bg-slate-50/70 border border-dashed border-slate-200 text-center space-y-1.5">
              <HelpCircle className="w-7 h-7 text-slate-400 mx-auto mb-1" />
              <p className="text-xs font-bold text-slate-700">
                {!isCameraActive
                  ? "Start the camera to begin expression estimation"
                  : "Position your face in front of the camera"}
              </p>
              <p className="text-[11px] text-slate-500">
                Ensure adequate lighting for optimal detection accuracy
              </p>
            </div>
          )}

          {/* Probability Breakdown for all 7 Categories */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between text-xs text-slate-600 font-bold">
              <span>Expression Distribution</span>
              <span className="text-[11px] text-slate-400 font-normal">7-Class Estimator</span>
            </div>

            <div className="space-y-2.5">
              {(Object.keys(EXPRESSION_CONFIG) as ExpressionName[]).map((exp) => {
                const conf = EXPRESSION_CONFIG[exp];
                const score = detectionResult?.allExpressions[exp] ?? 0;
                const percentage = Math.round(score * 100);

                return (
                  <div key={exp} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-700 font-medium capitalize flex items-center gap-1.5">
                        <conf.icon className={`w-3.5 h-3.5 ${conf.textColor}`} />
                        {conf.label}
                      </span>
                      <span className="font-mono text-[11px] font-bold text-slate-600">
                        {percentage}%
                      </span>
                    </div>
                    <Progress
                      value={percentage}
                      indicatorColor={conf.barColor}
                      className="h-2 bg-slate-100"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ethical & Methodological Disclaimer */}
      <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/60 text-xs text-slate-700 flex items-start gap-3 leading-relaxed shadow-xs">
        <Info className="w-4 h-4 text-[#0B63E5] shrink-0 mt-0.5" />
        <p>
          <strong className="text-slate-900 font-bold">Clinical & Ethical Notice:</strong> Estimates
          reflect geometric visual surface contours, not subjective internal emotion, psychological truth,
          or diagnostic medical certainty.
        </p>
      </div>
    </div>
  );
};
