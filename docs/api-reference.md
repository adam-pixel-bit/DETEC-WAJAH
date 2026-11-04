# 🧠 Spesifikasi Model AI, Kategori Ekspresi & MediaDevices

Dokumen ini menjelaskan model machine learning yang digunakan, kategori ekspresi visual yang didukung, serta rincian teknis integrasi kamera.

---

## 🔬 Spesifikasi Model Komputer Vision

Aplikasi ini menggunakan arsitektur neural network berbasis TensorFlow.js WebGL yang berjalan 100% di browser:

1. **Face Detector (`TinyFaceDetector`)**:
   - Model deteksi wajah berbasis MobileNetV1-SSD yang dioptimalkan untuk perangkat mobile dan web.
   - Ukuran bobot: ~190 KB.
   - Latensi: ~15-25ms per frame pada GPU modern.
   - Output: Koordinat Bounding Box `(x, y, width, height)`.

2. **Facial Landmark Detector (`FaceLandmark68Net`)**:
   - Mengekstraksi 68 titik koordinat anatomi wajah (mata, alis, hidung, garis rahang, dan kontur bibir).
   - Ukuran bobot: ~350 KB.

3. **Facial Expression Classifier (`FaceExpressionNet`)**:
   - Mengklasifikasikan geometri ekspresi visual ke dalam 7 kategori output probabilitas (total 100%).
   - Ukuran bobot: ~330 KB.

Semua file bobot model tersimpan secara lokal di direktori `public/models/` aplikasi, sehingga tidak bergantung pada koneksi internet pihak ketiga saat inferensi berjalan.

---

## 🎭 7 Kategori Ekspresi Visual yang Didukung

Model secara langsung menghasilkan nilai estimasi untuk 7 kategori visual berikut:

| Kategori | Pola Geometri Visual Utama | Warna Indikator |
| :--- | :--- | :--- |
| **Happy** | Sudut bibir terangkat ke atas (*zygomatic major*), penyempitan mata. | Emerald (`#10b981`) |
| **Sad** | Sudut bibir menurun, sudut dalam alis terangkat ke tengah. | Indigo (`#6366f1`) |
| **Angry** | Alis merapat ke bawah (*corrugator*), bibir menegang atau terbuka rapat. | Rose (`#f43f5e`) |
| **Surprised** | Alis terangkat tinggi, mata membesar, rahang/mulut terbuka. | Amber (`#f59e0b`) |
| **Fearful** | Alis terangkat dan merapat, kelopak mata atas terbuka lebar. | Purple (`#a855f7`) |
| **Disgusted** | Hidung mengerut, bibir atas terangkat. | Teal/Dark Emerald (`#059669`) |
| **Neutral** | Otot-otot wajah dalam kondisi rileks tanpa kontraksi aktif. | Blue (`#3b82f6`) |

---

## 📹 Integrasi Kamera (MediaDevices API)

Kamera diakses melalui standar W3C `navigator.mediaDevices.getUserMedia`:

```typescript
const mediaStream = await navigator.mediaDevices.getUserMedia({
  video: {
    width: { ideal: 640 },
    height: { ideal: 480 },
    facingMode: "user",
    frameRate: { ideal: 30 },
  },
  audio: false,
});
```

### Penanganan Siklus Hidup Stream (Memory Leak Prevention)
Setiap kali tombol **"Stop Camera"** ditekan atau pengguna beralih halaman, seluruh track kamera dihentikan secara mutlak:

```typescript
stream.getTracks().forEach((track) => track.stop());
```
Dan loop pemrosesan `requestAnimationFrame` dibatalkan seketika (`cancelAnimationFrame`).

---

## ⚠️ Pemberitahuan Etis (Ethical Disclaimer)

Confidence score dari model **tidak boleh** ditafsirkan sebagai kepastian psikologis atas emosi atau isi hati seseorang. Model ini semata-mata mengukur kesesuaian pola geometri visual permukaan wajah terhadap kumpulan data pelatihan.
