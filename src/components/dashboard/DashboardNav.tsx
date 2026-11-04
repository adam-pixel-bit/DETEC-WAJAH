"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { VesperLogo } from "@/components/ui/VesperLogo";
import { Badge } from "@/components/ui/badge";
import { LogOut, User, ShieldCheck } from "lucide-react";

interface DashboardNavProps {
  isModelLoaded: boolean;
  modelLoading: boolean;
}

export const DashboardNav: React.FC<DashboardNavProps> = ({
  isModelLoaded,
  modelLoading,
}) => {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string>("user@vespervision.org");
  const [userName, setUserName] = useState<string>("Dr. Alex Rivera");
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserEmail(user.email || "user@vespervision.org");
        setUserName(user.user_metadata?.full_name || user.email?.split("@")[0] || "Researcher");
      } else {
        const demo = localStorage.getItem("demo_user");
        if (demo) {
          try {
            const parsed = JSON.parse(demo);
            setUserEmail(parsed.email || "demo@vespervision.org");
            setUserName(parsed.user_metadata?.full_name || "Dr. Alex Rivera");
            setIsDemo(true);
          } catch {
            // ignore
          }
        }
      }
    });
  }, []);

  const handleSignOut = async () => {
    document.cookie = "demo_user_active=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    localStorage.removeItem("demo_user");

    const supabase = createClient();
    await supabase.auth.signOut();

    router.push("/login");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-4">
          <VesperLogo />
          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-slate-200">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Vision Intelligence
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              Clinical OS
            </span>
          </div>
        </div>

        {/* Center Status Indicators */}
        <div className="hidden md:flex items-center gap-3">
          <Badge
            variant={isModelLoaded ? "success" : "secondary"}
            className="text-xs gap-1.5 px-3 py-1 font-semibold"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isModelLoaded
                  ? "bg-emerald-500"
                  : modelLoading
                  ? "bg-amber-500 animate-pulse"
                  : "bg-slate-400"
              }`}
            />
            {isModelLoaded ? "AI Neural Networks Ready" : modelLoading ? "Loading Weights..." : "Models Offline"}
          </Badge>

          <Badge variant="outline" className="text-xs gap-1.5 px-3 py-1 text-slate-600 border-slate-200">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            Zero Cloud Biometrics
          </Badge>
        </div>

        {/* User Info & Logout */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 pl-2 pr-3 py-1 rounded-full bg-slate-50 border border-slate-200">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
              {userName.charAt(0).toUpperCase() || <User className="w-4 h-4" />}
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold text-slate-800 leading-none">{userName}</p>
              <p className="text-[10px] text-slate-500 truncate max-w-[150px] leading-tight">
                {userEmail} {isDemo && "(Demo)"}
              </p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all border border-transparent hover:border-rose-100"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
