"use client";

import dynamic from "next/dynamic";
import { Activity } from "lucide-react";

const DashboardClient = dynamic(
  () => import("@/components/dashboard/DashboardClient"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-[#EBF0F5] flex flex-col items-center justify-center p-6 text-slate-500 space-y-3 font-sans">
        <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#0B63E5] shadow-md animate-pulse">
          <Activity className="w-6 h-6" />
        </div>
        <p className="text-xs font-bold text-slate-700">Loading Vesper Vision Dashboard...</p>
      </div>
    ),
  }
);

export default function DashboardPage() {
  return <DashboardClient />;
}
