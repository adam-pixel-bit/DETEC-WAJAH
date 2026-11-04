# 👁️ Real-Time Facial Expression Detection Web Application

Aplikasi web full-stack modern berbasis **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, dan **Supabase Auth & Database**, dilengkapi dengan fitur deteksi wajah dan estimasi ekspresi visual secara *real-time* menggunakan model *computer vision* di peramban pengguna.

---

## 🌟 Fitur Utama

- **Authentication Flow Sempurna**:
  - Halaman pertama website adalah `/login`.
  - Mendukung login dengan **Google OAuth** dan **Email & Password** via Supabase Auth.
  - Server-Side Route Protection menggunakan Next.js `middleware.ts`. Pengguna tanpa sesi dilarang mengakses `/dashboard`.
- **Real-Time Facial Expression Detection**:
  - Akses kamera peramban menggunakan Web MediaDevices API.
  - Model AI lokal berbasis WebGL TensorFlow.js: `TinyFaceDetector`, `FaceLandmark68Net`, dan `FaceExpressionNet`.
  - Klasifikasi 7 kategori ekspresi visual yang valid: **Happy, Sad, Angry, Surprised, Fearful, Disgusted, Neutral**.
  - Visualisasi dinamis: Bounding Box biru, 68 titik landmark hijau, dan tag probabilitas langsung di atas video kanvas.
- **Privacy-First & Zero Biometric Storage**:
  - Pemrosesan video berjalan 100% di memori lokal peramban (*client-side*).
  - Tidak ada rekaman video, tangkapan foto wajah, atau data biometrik yang disimpan atau dikirim ke server.
  - Database Supabase PostgreSQL hanya menyimpan profil akun dan preferensi tampilan yang dilindungi oleh **Row Level Security (RLS)**.
- **Desain Modern & Bebas "AI Slop"**:
  - Antarmuka rapi, minimalis, dan fungsional tanpa gradien berlebihan atau dekorasi semu yang tidak fungsional.
  - Pemberitahuan etika eksplisit mengenai interpretasi confidence score model.

---

## 📁 Struktur Direktori

```text
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   └── login/page.tsx        # Halaman Login (Halaman Pertama)
│   │   ├── auth/callback/route.ts    # Route Handler Pertukaran Kode OAuth
│   │   ├── dashboard/page.tsx        # Protected Dashboard Facial Vision
│   │   ├── globals.css               # Desain Sistem & Variabel CSS Tailwind
│   │   ├── layout.tsx                # Root Shell Layout
│   │   └── page.tsx                  # Server Redirect (/ -> /login atau /dashboard)
│   │
│   ├── components/
│   │   ├── auth/                     # LoginForm & GoogleAuthButton
│   │   ├── dashboard/                # DashboardNav & System Status
│   │   ├── detection/                # CameraView, DetectionControls, ExpressionResultsPanel
│   │   └── ui/                       # Reusable UI (Button, Card, Badge, Progress, Alert)
│   │
│   ├── hooks/
│   │   ├── useCamera.ts              # Manajemen Siklus Hidup Stream Kamera
│   │   └── useFaceExpressionDetection.ts # Frame Loop Inferensi Model AI
│   │
│   ├── lib/
│   │   ├── supabase/                 # Client, Server, & Middleware Supabase Helpers
│   │   ├── faceApi.ts                # Inisialisasi Model & Canvas Overlay Painter
│   │   └── utils.ts                  # Helper Tailwind Class Merging (cn)
│   │
│   ├── types/                        # Definisi Tipe Data TypeScript
│   └── middleware.ts                 # Next.js Server-Side Route Guard
│
├── public/
│   └── models/                       # Bobot Model Neural Network Lokal
│       ├── tiny_face_detector_model.*
│       ├── face_landmark_68_model.*
│       └── face_expression_model.*
│
├── supabase/
│   ├── config.toml                   # Konfigurasi Supabase
│   └── migrations/                   # Skrip SQL Schema & RLS Policies
│
├── docs/                             # 📚 Dokumentasi Lengkap Proyek
│   ├── architecture.md               # Arsitektur Sistem & Core User Flow
│   ├── database-schema.md            # Skema Database & Kebijakan Privasi
│   ├── setup-guide.md                # Panduan Instalasi Lokal
│   ├── api-reference.md              # Spesifikasi Model AI & 7 Kategori Ekspresi
│   └── deployment.md                 # Panduan Rilis ke Vercel & Supabase
│
├── .env.example                      # Template Variabel Lingkungan
├── next.config.mjs                   # Konfigurasi Next.js
├── tailwind.config.ts                # Konfigurasi Tailwind CSS
└── package.json                      # Dependensi Proyek
```

---

## 🚀 Panduan Memulai Cepat (Quickstart)

### 1. Salin Variabel Lingkungan
```bash
cp .env.example .env.local
```

### 2. Pasang Dependensi
```bash
npm install
```

### 3. Jalankan Aplikasi
```bash
npm run dev
```
Akses aplikasi melalui peramban di [http://localhost:3000](http://localhost:3000).

---

## 📖 Dokumentasi Lengkap

- [Dokumentasi Arsitektur & Core User Flow](./docs/architecture.md)
- [Skema Database, RLS & Kebijakan Privasi](./docs/database-schema.md)
- [Panduan Instalasi & Konfigurasi Supabase](./docs/setup-guide.md)
- [Spesifikasi Model AI & 7 Kategori Ekspresi](./docs/api-reference.md)
- [Panduan Deployment ke Vercel & Supabase](./docs/deployment.md)

---

## 📜 Lisensi
MIT License © 2026.
