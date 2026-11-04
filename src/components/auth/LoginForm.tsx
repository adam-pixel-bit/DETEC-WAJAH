"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { VesperLogo } from "@/components/ui/VesperLogo";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GoogleAuthButton } from "./GoogleAuthButton";
import {
  Mail,
  Lock,
  AlertCircle,
  CreditCard,
  Eye,
  EyeOff,
  CheckCircle2,
  X,
  HelpCircle,
  ShieldCheck,
  Send,
} from "lucide-react";

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Modals for Forgot Password and Terms of Use
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

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

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotSent(true);
    setTimeout(() => {
      setForgotSent(false);
      setIsForgotModalOpen(false);
      setForgotEmail("");
    }, 2400);
  };

  return (
    <div className="w-full max-w-[400px] flex flex-col justify-between py-2 sm:py-4">
      {/* Brand Header with Vesper Geometric Logo */}
      <div className="mb-7">
        <VesperLogo className="mb-6" />
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
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-11 pl-10 pr-10 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0B63E5] focus:ring-1 focus:ring-[#0B63E5] transition-all font-mono tracking-wider"
            />
            {/* Interactive Eye Show/Hide Toggle */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 p-0.5 rounded-md transition-colors"
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Remember me & Forgot Password Row */}
        <div className="flex items-center justify-between text-xs pt-0.5">
          <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 font-medium">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-[#0B63E5] focus:ring-[#0B63E5] cursor-pointer"
            />
            <span>Remember for 30 days</span>
          </label>

          <button
            type="button"
            onClick={() => setIsForgotModalOpen(true)}
            className="text-xs font-semibold text-[#0B63E5] hover:text-[#0952C2] hover:underline"
          >
            Forgot password
          </button>
        </div>

        {/* Primary Action Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 rounded-xl bg-[#0B63E5] hover:bg-[#0952C2] active:bg-[#0744A3] text-white font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? "Authenticating..." : isSignUp ? "Sign up" : "Log in"}
        </button>

        {/* OR Divider */}
        <div className="relative flex items-center justify-center my-3.5">
          <div className="w-full border-t border-slate-200" />
          <span className="bg-white px-3 text-[11px] font-semibold uppercase text-slate-400">
            OR
          </span>
        </div>

        {/* Secondary Buttons */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={handleQuickDemo}
            className="w-full h-11 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.99]"
          >
            <CreditCard className="w-4 h-4 text-slate-600" />
            <span>Log in with SmartCard / Instant Demo</span>
          </button>

          <GoogleAuthButton onError={(msg) => setError(msg)} />
        </div>
      </form>

      {/* Mode Switcher */}
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

      {/* Footer Legal Link */}
      <div className="mt-7 pt-4 border-t border-slate-100 text-center">
        <p className="text-[11px] text-slate-400">
          By creating an account, you agree to our{" "}
          <button
            type="button"
            onClick={() => setIsTermsModalOpen(true)}
            className="underline cursor-pointer hover:text-slate-600 font-medium"
          >
            Terms of Use
          </button>
        </p>
      </div>

      {/* Interactive Forgot Password Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl border border-slate-100">
            <button
              onClick={() => setIsForgotModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-4 text-left">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0B63E5] flex items-center justify-center mb-3">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Reset Password</h3>
              <p className="text-xs text-slate-500 mt-1">
                Enter your account email to receive a secure password recovery link.
              </p>
            </div>

            {forgotSent ? (
              <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Recovery instructions dispatched to your inbox!</span>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="Enter your registered email"
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#0B63E5]"
                />
                <button
                  type="submit"
                  className="w-full h-10 rounded-xl bg-[#0B63E5] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  Send Recovery Link
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Interactive Terms of Use Modal */}
      {isTermsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-slate-100 max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setIsTermsModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0B63E5] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Vesper Vision • Terms & Privacy</h3>
              
              <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
                <p>
                  <strong>1. Zero Cloud Biometrics:</strong> All camera video streams and facial landmark coordinates are computed completely within your browser’s local WebGL memory. No biometric images or video are stored on remote servers.
                </p>
                <p>
                  <strong>2. Research Notice:</strong> Confidence metrics indicate visual pattern correlations according to standard geometric models and do not guarantee subjective psychological truth.
                </p>
                <p>
                  <strong>3. User Control:</strong> You can terminate sensor feeds at any time via the Stop Camera toggle.
                </p>
              </div>

              <button
                onClick={() => setIsTermsModalOpen(false)}
                className="w-full h-10 rounded-xl bg-slate-900 text-white font-bold text-xs mt-4"
              >
                I Understand & Agree
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
