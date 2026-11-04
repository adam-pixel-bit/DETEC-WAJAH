"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { VesperLogo } from "@/components/ui/VesperLogo";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GoogleAuthButton } from "./GoogleAuthButton";
import { Mail, Lock, AlertCircle, CreditCard, Sparkles } from "lucide-react";

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

      // Handle demo mode if Supabase environment variables are missing
      if (!supabaseUrl || supabaseUrl.includes("placeholder")) {
        document.cookie = `demo_user_active=true; path=/; max-age=${rememberMe ? 2592000 : 86400}`;
        localStorage.setItem(
          "demo_user",
          JSON.stringify({
            id: "demo-user-12345",
            email: email || "researcher@laboratory.org",
            user_metadata: { full_name: fullName || "Dr. Alex Rivera" },
          })
        );
        router.push("/dashboard");
        router.refresh();
        return;
      }

      if (isSignUp) {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
            emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
          },
        });

        if (signUpError) throw signUpError;
        setSuccessMsg(
          "Registration initiated. Check your email for confirmation link or sign in."
        );
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed. Please verify credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = () => {
    document.cookie = `demo_user_active=true; path=/; max-age=${rememberMe ? 2592000 : 86400}`;
    localStorage.setItem(
      "demo_user",
      JSON.stringify({
        id: "demo-user-12345",
        email: "researcher@vespervision.org",
        user_metadata: { full_name: "Research Team User" },
      })
    );
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="w-full max-w-[400px] flex flex-col justify-between py-2 sm:py-4">
      {/* Brand Header with Vesper Geometric Logo */}
      <div className="mb-8">
        <VesperLogo className="mb-8" />
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          {isSignUp ? "Create your account" : "Log in to your account"}
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          {isSignUp
            ? "Enter your details to create a vision intelligence account"
            : "Please enter your details"}
        </p>
      </div>

      {/* Notifications */}
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="w-4 h-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {successMsg && (
        <Alert variant="info" className="mb-4">
          <AlertCircle className="w-4 h-4" />
          <AlertDescription>{successMsg}</AlertDescription>
        </Alert>
      )}

      {/* Main Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignUp && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Dr. Alex Rivera"
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0B63E5] focus:ring-1 focus:ring-[#0B63E5] transition-all"
            />
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Email
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0B63E5] focus:ring-1 focus:ring-[#0B63E5] transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0B63E5] focus:ring-1 focus:ring-[#0B63E5] transition-all font-mono tracking-wider"
            />
          </div>
        </div>

        {/* Remember me & Forgot Password Row */}
        <div className="flex items-center justify-between text-xs pt-0.5">
          <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 font-medium">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-[#0B63E5] focus:ring-[#0B63E5]"
            />
            <span>Remember for 30 days</span>
          </label>

          <button
            type="button"
            onClick={() => alert("Please contact system administrator to reset password.")}
            className="text-xs font-semibold text-[#0B63E5] hover:text-[#0952C2] hover:underline"
          >
            Forgot password
          </button>
        </div>

        {/* Primary Action Button (Matching the blue button from image) */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 rounded-xl bg-[#0B63E5] hover:bg-[#0952C2] active:bg-[#0744A3] text-white font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? "Authenticating..." : isSignUp ? "Sign up" : "Log in"}
        </button>

        {/* OR Divider */}
        <div className="relative flex items-center justify-center my-4">
          <div className="w-full border-t border-slate-200" />
          <span className="bg-white px-3 text-[11px] font-semibold uppercase text-slate-400">
            OR
          </span>
        </div>

        {/* Secondary Buttons: SmartCard / Quick Demo & Google */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={handleQuickDemo}
            className="w-full h-11 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <CreditCard className="w-4 h-4 text-slate-600" />
            <span>Log in with SmartCard / Instant Demo</span>
          </button>

          <GoogleAuthButton onError={(msg) => setError(msg)} />
        </div>
      </form>

      {/* Sign In / Sign Up Mode Switcher */}
      <div className="mt-5 text-center">
        <p className="text-xs text-slate-500">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(null);
              setSuccessMsg(null);
            }}
            className="text-xs font-semibold text-[#0B63E5] hover:underline"
          >
            {isSignUp ? "Log in" : "Sign up"}
          </button>
        </p>
      </div>

      {/* Footer Legal Link (Matching image bottom text) */}
      <div className="mt-8 pt-4 border-t border-slate-100 text-center">
        <p className="text-[11px] text-slate-400">
          By creating an account, you agree to our{" "}
          <span className="underline cursor-pointer hover:text-slate-600">Terms of Use</span>
        </p>
      </div>
    </div>
  );
};
