import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vesper Vision • Real-Time Facial Expression Detection",
  description: "Computer Vision and Real-Time Facial Visual Expression Classification Web Application",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚡</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#EBF0F5] text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
