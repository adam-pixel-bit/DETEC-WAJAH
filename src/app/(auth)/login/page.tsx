"use client";

import React, { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { LoginVisualHero } from "@/components/auth/LoginVisualHero";
import { Sparkles, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [mobileTab, setMobileTab] = useState<"login" | "preview">("login");

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-3 sm:p-5 md:p-6 lg:p-8 bg-[#EBF0F5] font-sans">
      {/* Centered Large Card Container */}
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-[0_25px_70px_-15px_rgba(15,23,42,0.08)] border border-slate-200/80 p-3 sm:p-5 md:p-5 lg:p-6 flex flex-col md:grid md:grid-cols-12 gap-5 items-stretch overflow-hidden transition-all">
        
        {/* Mobile Switcher (Visible only on small screens < 768px) */}
        <div className="flex md:hidden items-center justify-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 mb-2">
          <button
            type="button"
            onClick={() => setMobileTab("login")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              mobileTab === "login"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Sign In Account
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("preview")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              mobileTab === "preview"
                ? "bg-[#0B63E5] text-white shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Vision 3D
          </button>
        </div>

        {/* Left Side: Login Form (visible always on md+, conditionally on mobile) */}
        <div
          className={`md:col-span-6 lg:col-span-6 flex flex-col justify-center px-3 sm:px-6 md:px-5 lg:px-8 py-2 sm:py-4 ${
            mobileTab === "preview" ? "hidden md:flex" : "flex"
          }`}
        >
          <LoginForm />
        </div>

        {/* Right Side: Royal Blue Hero Showcase with Interactive 3D Mockup (Visible on md+ 768px+, and when preview tab active on mobile) */}
        <div
          className={`md:col-span-6 lg:col-span-6 ${
            mobileTab === "login" ? "hidden md:flex" : "flex"
          }`}
        >
          <LoginVisualHero />
        </div>
      </div>
    </main>
  );
}
