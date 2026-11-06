# 👁️ Real-Time Facial Expression Detection Web Application

🌐 **Live Production URL**: [https://detec-wajah.vercel.app](https://detec-wajah.vercel.app)

Aplikasi web full-stack modern berbasis **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, dan **Supabase Auth & Database**, dilengkapi dengan fitur deteksi wajah dan estimasi ekspresi visual secara *real-time* menggunakan model *computer vision* (TensorFlow.js / Face-API) yang berjalan langsung di peramban pengguna (*client-side*).

---

## 🛠️ Teknologi & Framework yang Digunakan

Aplikasi ini dibangun menggunakan arsitektur teknologi modern yang teruji di lingkungan produksi:

| Kategori | Teknologi / Framework | Versi | Peran & Fungsi dalam Aplikasi |
| :--- | :--- | :--- | :--- |
| **Full-Stack Framework** | [Next.js (App Router)](https://nextjs.org/) | `14.2.15` | Framework utama untuk React Server Components (RSC), SSR, Route Handlers (`/auth/callback`), dan Middleware perlindungan rute privat. |
| **Frontend Library** | [React](https://react.dev/) | `18.3.1` | Pustaka antarmuka pengguna berbasis komponen deklaratif, hooks reaktif, dan lifecycle manajemen kanvas. |
| **Bahasa Pemrograman** | [TypeScript](https://www.typescriptlang.org/) | `5.4.5` | Memberikan *type-safety* statis untuk model data ekspresi, profil pengguna, dan interaksi Supabase. |
| **CSS & Desain Sistem** | [Tailwind CSS](https://tailwindcss.com/) | `3.4.13` | Utility-first CSS framework untuk membangun desain antarmuka bergaya klinis modern (Vesper Aesthetic) yang bersih, responsif, dan elegan. |
| **CSS Tooling** | PostCSS & Autoprefixer | `8.4.x` / `10.4.x` | Pemrosesan CSS dan injeksi vendor prefix otomatis untuk kompatibilitas lintas peramban. |
| **Komponen UI & Ikon** | [Lucide React](https://lucide.dev/) | `0.453.0` | Kumpulan ikon vektor modern, ringan, dan konsisten di seluruh aplikasi. |
| **Styling Utilities** | `clsx` & `tailwind-merge` | `2.1.x` / `2.5.x` | Penggabungan kelas CSS secara kondisional tanpa konflik spesifisitas. |
| **Computer Vision & AI** | [@vladmandic/face-api](https://github.com/vladmandic/face-api) | `1.7.14` | Library neural network berbasis **TensorFlow.js** untuk eksekusi model AI lokal di peramban (TinyFaceDetector, 68 Landmark, & 7-Class Expression Classifier). |
| **Browser Hardware API** | HTML5 MediaDevices API | Native W3C | Mengakses stream kamera video webcam (`navigator.mediaDevices.getUserMedia`) secara real-time. |
| **Sintesis Audio** | Web Audio API | Native W3C | Menghasilkan umpan balik suara (*audio chime synthesizer*) saat terjadi transisi perubahan ekspresi wajah. |
| **BaaS & Database** | [Supabase](https://supabase.com/) | `2.45.4` | Backend-as-a-Service untuk manajemen pengguna, PostgreSQL database, dan PostgreSQL Triggers. |
| **Autentikasi & SSR** | [@supabase/ssr](https://supabase.com/docs/guides/auth/server-side/nextjs) | `0.5.1` | Penanganan sesi autentikasi berbasis cookie HTTP-Only yang aman dan sinkron antara client, server, dan middleware. |
| **Database Engine** | PostgreSQL (Supabase) | `15.x` | Basis data relasional dengan proteksi data ketat menggunakan **Row Level Security (RLS)**. |
| **Cloud Deployment** | [Vercel](https://vercel.com/) | Cloud | Platform hosting produksi untuk aplikasi Next.js dengan pipeline CI/CD otomatis. |

---

## 🌟 Fitur Utama

- **Authentication Flow Sempurna**:
  - Halaman pertama website otomatis diarahkan ke `/login`.
  - Mendukung login dengan **Google OAuth** dan **Email & Password** via Supabase Auth.
  - Opsi **Instant Demo Access** untuk eksplorasi instan tanpa konfigurasi akun.
  - Server-Side Route Protection menggunakan Next.js `middleware.ts`. Pengguna tanpa sesi dilarang mengakses `/dashboard`.
- **Real-Time Facial Expression Detection**:
  - Akses kamera peramban menggunakan Web MediaDevices API.
  - Model AI lokal berbasis WebGL TensorFlow.js: `TinyFaceDetector`, `FaceLandmark68Net`, dan `FaceExpressionNet`.
  - Klasifikasi 7 kategori ekspresi visual yang valid: **Happy, Sad, Angry, Surprised, Fearful, Disgusted, Neutral**.
  - Visualisasi dinamis: Bounding Box biru, 68 titik landmark hijau, dan tag probabilitas langsung di atas video kanvas.
- **Interaktivitas Tingkat Lanjut**:
  - **Interactive 3D Tablet Mockup**: Mockup tablet miring 3D dengan efek parallax mouse dan simulator ekspresi yang dapat diklik langsung di halaman login.
  - **Snapshot & Capture Tool**: Pengguna dapat mengambil tangkapan layar langsung lengkap dengan anotasi landmark dan mengunduhnya sebagai berkas PNG.
  - **Live Transition History**: Log riwayat perubahan ekspresi wajah real-time beserta stempel waktu.
  - **Synthesizer Suara (Audio Chime)**: Umpan balik suara sintetis yang berbunyi halus setiap kali ekspresi wajah berubah.
  - **Theater / Fullscreen Viewport**: Mode tampilan penuh untuk pengamatan visual tanpa distraksi.
- **Privacy-First & Zero Biometric Storage**:
  - Pemrosesan video berjalan 100% di memori lokal peramban (*client-side*).
  - Tidak ada rekaman video, tangkapan foto wajah, atau data biometrik yang disimpan atau dikirim ke server.
  - Database Supabase PostgreSQL hanya menyimpan profil akun dan preferensi tampilan yang dilindungi oleh **Row Level Security (RLS)**.
- **Desain Modern Bebas "AI Slop"**:
  - Antarmuka mengadopsi standar Vesper Clinical Design System yang bersih, kontras tinggi, fungsional, dan ramah pengguna.
  - Pemberitahuan etika eksplisit (*Ethical AI Notice*) mengenai interpretasi confidence score model.

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
│   │   ├── auth/                     # LoginForm, GoogleAuthButton, & LoginVisualHero
│   │   ├── dashboard/                # DashboardNav, DashboardClient, & Status Badges
│   │   ├── detection/                # CameraView, DetectionControls, ExpressionResultsPanel
│   │   └── ui/                       # Reusable UI (Button, Card, Badge, Progress, Alert, VesperLogo)
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

### 1. Kloning Repositori & Salin Variabel Lingkungan
```bash
git clone https://github.com/adam-pixel-bit/DETEC-WAJAH.git
cd DETEC-WAJAH
cp .env.example .env.local
```

### 2. Pasang Dependensi
```bash
npm install
```

### 3. Jalankan Server Pengembangan
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
MIT License © 2026 Adam (`adamsmkmarhas@gmail.com`).
