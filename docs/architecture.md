# 🏛️ Arsitektur Sistem & Core User Flow

Dokumen ini menjelaskan arsitektur teknis, pemisahan modul, dan alur autentikasi serta pemrosesan Computer Vision aplikasi.

---

## 🗺️ Diagram Alur Pengguna (Core User Flow)

```mermaid
sequenceDiagram
    autonumber
    actor User as Pengguna
    participant MW as Next.js Middleware (SSR)
    participant Auth as Supabase Auth & DB
    participant Dash as Dashboard (/dashboard)
    participant Cam as Browser MediaDevices API
    participant AI as Local TFJS Neural Networks

    User->>MW: Mengakses web (URL "/")
    alt Belum Login
        MW-->>User: Redirect ke "/login"
        User->>Auth: Login via Google OAuth atau Email & Password
        Auth-->>User: Verifikasi & Pasang HTTP-Only Cookie
        User->>MW: Redirect ke "/dashboard"
    end
    MW-->>Dash: Akses diizinkan (Session Valid)
    Dash-->>User: Tampilkan Dashboard & Informasi Pengguna
    
    User->>Dash: Klik "Start Camera"
    Dash->>Cam: navigator.mediaDevices.getUserMedia()
    alt Izin Diberikan
        Cam-->>Dash: Live Video Stream (<video>)
        Dash->>AI: Inisialisasi Model dari /models
        loop Setiap Frame Animasi (~30-60 FPS)
            AI->>Cam: Ambil frame video
            AI->>AI: Deteksi wajah & 68 landmarks
            AI->>AI: Klasifikasi 7 kategori ekspresi visual
            AI-->>Dash: Hasil koordinat & confidence score
            Dash-->>User: Render Bounding Box Canvas & Progress Bar
        end
    else Izin Ditolak
        Cam-->>Dash: PermissionDeniedError
        Dash-->>User: Tampilkan pesan bantuan perizinan kamera
    end

    User->>Dash: Klik "Stop Camera" atau "Sign Out"
    Dash->>Cam: Hentikan seluruh media stream tracks
    Dash->>AI: Hentikan loop requestAnimationFrame
```

---

## 📁 Pemisahan Modul Aplikasi (Modular Architecture)

Aplikasi dibangun dengan prinsip pemisahan tanggung jawab yang ketat:

1. **Authentication Module (`src/components/auth/`, `src/lib/supabase/`)**:
   - Menangani Google OAuth, Email/Password login, registrasi, pertukaran callback token, dan manajemen sesi cookie.
2. **Dashboard Module (`src/app/dashboard/`, `src/components/dashboard/`)**:
   - Menampilkan layout dashboard, identitas pengguna, status sistem AI, dan tombol sign-out.
3. **Camera Module (`src/hooks/useCamera.ts`, `src/components/detection/CameraView.tsx`)**:
   - Menangani siklus hidup stream kamera, izin peramban, pemilihan resolusi, dan pembersihan memori (*cleanup*).
4. **Face Detection & Expression Module (`src/lib/faceApi.ts`, `src/hooks/useFaceExpressionDetection.ts`, `src/components/detection/ExpressionResultsPanel.tsx`)**:
   - Memuat bobot neural network dari `/models`, menjalankan inferensi per frame, menggambar kanvas visual, dan menampilkan distribusi probabilitas ekspresi.
5. **Shared UI Components (`src/components/ui/`)**:
   - Tombol, kartu, badge, progress bar, dan dialog yang konsisten tanpa "AI slop".
