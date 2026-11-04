# 🚀 Panduan Deployment Produksi (Vercel & Supabase)

Dokumen ini menjelaskan prosedur deployment aplikasi ke platform **Vercel** dan **Supabase Cloud**.

---

## 1️⃣ Persiapan Database Supabase Cloud

1. Buat proyek baru di [Supabase Dashboard](https://supabase.com).
2. Jalankan skrip SQL yang ada di `supabase/migrations/20261104000000_facial_app_schema.sql` melalui **SQL Editor**.
3. Di tab **Authentication > Providers**:
   - Aktifkan **Email** provider.
   - Aktifkan **Google** provider dengan memasukkan Client ID & Client Secret dari Google Cloud Console.
4. Di tab **Authentication > URL Configuration**:
   - Masukkan **Site URL**: domain produksi Anda (contoh: `https://facial-vision.vercel.app`).
   - Masukkan Redirect URL: `https://facial-vision.vercel.app/auth/callback`.

---

## 2️⃣ Deployment ke Vercel

Aplikasi ini menggunakan framework Next.js 14 App Router murni, sehingga proses deploy di Vercel sepenuhnya terintegrasi tanpa konfigurasi tambahan:

1. Push kode ke repositori GitHub Anda:
   ```bash
   git add .
   git commit -m "feat: complete real-time facial expression detection app"
   git push origin main
   ```
2. Buka [Vercel Dashboard](https://vercel.com/new) dan pilih **Import Git Repository**.
3. Framework Preset akan otomatis terdeteksi sebagai **Next.js**.
4. Masukkan **Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`: URL project Supabase.
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Anon public key Supabase.
   - `SUPABASE_SERVICE_ROLE_KEY`: Service role key.
   - `NEXT_PUBLIC_APP_URL`: Domain Vercel Anda (contoh: `https://your-project.vercel.app`).
5. Klik **Deploy**.

---

## 3️⃣ Verifikasi Pasca-Deployment

Lakukan pengujian berikut di lingkungan produksi:
- [ ] Pengguna baru diarahkan ke `/login` saat pertama kali membuka website.
- [ ] Login Google OAuth dan Email/Password berfungsi.
- [ ] Pengguna yang belum login tidak dapat membuka `/dashboard` secara langsung.
- [ ] Kamera dapat diinisialisasi setelah memberikan izin peramban.
- [ ] Bobot model AI termuat dengan lancar dari `/models/`.
- [ ] Deteksi wajah, bounding box, dan skor ekspresi berjalan real-time.
- [ ] Tombol Stop Camera mematikan indikator kamera browser.
- [ ] Tombol Sign Out mengarahkan kembali ke `/login`.
