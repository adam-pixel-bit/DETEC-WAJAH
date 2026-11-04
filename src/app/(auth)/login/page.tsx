import { LoginForm } from "@/components/auth/LoginForm";
import { LoginVisualHero } from "@/components/auth/LoginVisualHero";

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#EBF0F5]">
      {/* Centered Large Card Container (Exact match to reference image layout) */}
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-[0_25px_70px_-15px_rgba(15,23,42,0.08)] border border-slate-200/80 p-4 sm:p-6 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch overflow-hidden transition-all">
        {/* Left Side: Login Form */}
        <div className="lg:col-span-6 flex flex-col justify-center px-3 sm:px-8 py-4">
          <LoginForm />
        </div>

        {/* Right Side: Royal Blue Hero Showcase with 3D Mockup */}
        <div className="lg:col-span-6 hidden lg:flex">
          <LoginVisualHero />
        </div>
      </div>
    </main>
  );
}
