# 📚 Dokumentasi Proyek: Real-Time Facial Expression Detection Web App

Selamat datang di dokumentasi resmi aplikasi web **Real-Time Facial Expression Detection**. Aplikasi ini mengintegrasikan Next.js 14 App Router, Supabase Auth & PostgreSQL dengan Row Level Security (RLS), dan model kecerdasan buatan (Computer Vision) berbasis browser untuk klasifikasi ekspresi visual wajah secara langsung.

---

## 📑 Daftar Isi Dokumentasi

| Dokumen | Deskripsi |
| :--- | :--- |
| [**1. Architecture Guide**](./architecture.md) | Diagram arsitektur sistem, alur pengguna (*core user flow*), dan pemisahan modul. |
| [**2. Database Schema & Privacy**](./database-schema.md) | Rancangan tabel PostgreSQL (`profiles`, `user_preferences`), RLS policies, dan prinsip perlindungan privasi biometrik. |
| [**3. Setup & Installation**](./setup-guide.md) | Panduan instalasi langkah-demi-langkah, konfigurasi environment variables, dan menjalankan aplikasi secara lokal. |
| [**4. Computer Vision & Model Specs**](./api-reference.md) | Spesifikasi teknis model AI, 7 kategori ekspresi visual, dan integrasi kamera MediaDevices. |
| [**5. Deployment Guide**](./deployment.md) | Petunjuk deployment ke Vercel (Next.js) dan Supabase Cloud. |

---

## ⚡ Fitur Utama

1. **Halaman Pertama Login**:
   - Pengguna diarahkan ke `/login` sebagai halaman pertama.
   - Mendukung Google OAuth dan Email & Password melalui Supabase Auth.
2. **Protected Route Dashboard**:
   - Rute `/dashboard` dilindungi oleh server-side Next.js middleware. Pengguna yang belum terautentikasi otomatis diarahkan kembali ke login.
3. **Deteksi Ekspresi Wajah Real-Time**:
   - Integrasi kamera via browser `navigator.mediaDevices.getUserMedia`.
   - Model neural network berbasis WebGL (`TinyFaceDetector`, `FaceLandmark68Net`, `FaceExpressionNet`).
   - Estimasi 7 kategori ekspresi visual: **Happy, Sad, Angry, Surprised, Fearful, Disgusted, Neutral**.
   - Bounding box dinamis dan 68 titik landmark wajah.
4. **Keamanan & Privasi Maksimal**:
   - Pemrosesan video 100% terjadi di memori browser pengguna; tidak ada video, gambar wajah, atau data biometrik yang disimpan atau dikirim ke server.
   - Database Supabase hanya menyimpan profil akun dan preferensi tampilan dengan proteksi Row Level Security (RLS).
