# 🚀 Panduan Instalasi & Menjalankan Aplikasi (Setup Guide)

Ikuti petunjuk di bawah ini untuk menginstal dependensi, mengonfigurasi variabel lingkungan, dan menjalankan aplikasi di komputer lokal Anda.

---

## 📋 Prasyarat Sistem

- **Node.js**: versi `>= 18.0.0` (Direkomendasikan Node.js 20 atau 24).
- **NPM**: versi `>= 9.0.0`.
- **Peramban Web Modern**: Google Chrome, Mozilla Firefox, Microsoft Edge, atau Safari dengan dukungan WebGL dan MediaDevices API (Kamera).
- **Akun Supabase**: Gratis di [supabase.com](https://supabase.com).

---

## 1️⃣ Instalasi Dependensi

Jalankan perintah berikut di direktori proyek:

```bash
npm install
```

---

## 2️⃣ Konfigurasi Variabel Lingkungan (.env.local)

Salin template variabel lingkungan:

```bash
cp .env.example .env.local
```

Buka `.env.local` dan lengkapi kredensial Supabase Anda:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-public-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-secret-key>

# Application Base URL (Digunakan untuk callback OAuth)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> [!NOTE]
> Jika Anda belum memiliki project Supabase saat ini, aplikasi tetap dapat diakses menggunakan **"Instant Demo Access"** pada halaman login untuk langsung menguji fitur kamera dan deteksi AI.

---

## 3️⃣ Eksekusi Skrip Database di Supabase

1. Buka [Supabase Dashboard](https://supabase.com/dashboard) dan pilih proyek Anda.
2. Buka menu **SQL Editor**.
3. Buka file `supabase/migrations/20261104000000_facial_app_schema.sql`, salin seluruh isinya, lalu jalankan (**Run**).
4. Di menu **Authentication > URL Configuration**:
   - Atur **Site URL** ke `http://localhost:3000` (atau domain produksi Anda).
   - Tambahkan Redirect URL: `http://localhost:3000/auth/callback`.

---

## 4️⃣ Menjalankan Aplikasi Development

```bash
npm run dev
```

Buka peramban Anda di [http://localhost:3000](http://localhost:3000).

1. Sistem akan secara otomatis mengarahkan Anda ke halaman **Login**.
2. Masuk menggunakan Email & Password, Google OAuth, atau tombol Demo.
3. Berikan izin akses kamera saat diminta browser.
4. Nikmati deteksi wajah dan estimasi ekspresi secara real-time.

---

## 5️⃣ Build untuk Produksi

Untuk memverifikasi bahwa aplikasi siap dideploy:

```bash
npm run build
npm run start
```
