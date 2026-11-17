# Website Dyspal

Landing page untuk **Dyspal**, island dinamis untuk Windows. Project ini sepenuhnya milikmu: HTML, CSS, dan JavaScript biasa (dibantu Vite), tanpa obfuscation, tanpa ketergantungan pada Claude atau akun mana pun.

## Struktur project

```
dyspal-website/
├─ index.html                  Kerangka halaman (jarang perlu diubah)
├─ src/
│  ├─ config/site.config.json  PUSAT PENGATURAN: logo, warna, versi, link download, fitur, bahasa
│  ├─ locales/id.json          Semua teks Bahasa Indonesia
│  ├─ locales/en.json          Semua teks English
│  ├─ main.js                  Kode yang menyusun halaman dari config + teks
│  ├─ island.js                Replika interaktif island DYSPAL (state: resting, compact, media, monitor, kalender, settings)
│  ├─ island.css               Tampilan island + aura ungu + scroll reveal
│  └─ styles.css               Tampilan halaman (layout, kartu, tipografi)
├─ public/assets/dyspal-logo.png      Logo
├─ .github/workflows/deploy.yml  Auto-deploy ke GitHub Pages
└─ package.json, vite.config.js
```

## Menjalankan di komputer

1. Pasang **Node.js 20 LTS** dari nodejs.org dan **VS Code** dari code.visualstudio.com.
2. Ekstrak ZIP, lalu di VS Code pilih *File → Open Folder* dan buka folder `dyspal-website`.
3. Buka terminal VS Code (*Terminal → New Terminal*), lalu jalankan:

```
npm install
npm run dev
```

4. Buka alamat yang tampil (biasanya `http://localhost:5173`). Setiap kali kamu menyimpan file, halaman ikut berubah.

## Apa yang diedit di mana

| Yang ingin diubah | File |
|---|---|
| Teks apa pun (judul, fitur, FAQ, footer), ID atau EN | `src/locales/id.json`, `src/locales/en.json` |
| **Link download** | `src/config/site.config.json` → `app.downloadUrl` |
| **Versi** (tampil di bagian download kalau diisi) | `app.version`, contoh `"2.5.2"` |
| Ukuran file | `app.sizeLabel` |
| Nama, nama lengkap, logo | `brand.name`, `brand.fullName`, `brand.logo` |
| Warna terang dan gelap | `colors.light`, `colors.dark` |
| Fitur yang tampil dan urutannya | `features` (teksnya ada di `features.items` pada file locale) |
| Menyembunyikan bagian halaman | `sections` (ubah ke `false`) |
| Lagu, lirik, dan acara contoh di demo island | `demo.tracks`, `demo.events`, `demo.lineSec` |
| **Aura ungu** (aktif/mati, warna, intensitas, kecepatan, blur) | `aura` |
| Kecepatan dan gaya animasi island | pilihan Motion di Control Center demo; nilainya di `MOTION` pada `src/island.js` |
| Bahasa bawaan, atau deteksi bahasa browser | `languages.default`, `languages.autoDetect` |

Di dalam teks, `{name}`, `{version}`, `{sizeLabel}`, `{platform}` dan sejenisnya otomatis diisi dari `site.config.json`, jadi cukup ubah satu tempat.

**Mengganti logo:** timpa `public/assets/dyspal-logo.png` (atau letakkan logo lain di `public/assets/` dan ubah `brand.logo`). Logo bawaan hanyalah placeholder, bukan logo resmi Dyspal.

**Menambah bahasa:** salin `id.json` jadi `xx.json`, terjemahkan, impor di `src/main.js` (daftar `locales`), lalu tambahkan kodenya di `languages.available`.

## Build

```
npm run build
```

Hasilnya ada di folder `dist/`, siap diunggah ke hosting statis mana pun. `npm run preview` untuk mencoba hasil build secara lokal.

## Memublikasikan lewat GitHub Pages (gratis)

1. Buat akun di github.com, lalu *New repository* (misal `dyspal-website`). Kamu otomatis menjadi pemilik dengan hak penuh.
2. Di folder project, jalankan:

```
git init
git add .
git commit -m "Website Dyspal"
git branch -M main
git remote add origin https://github.com/USERNAME/dyspal-website.git
git push -u origin main
```

3. Di GitHub: *Settings → Pages → Build and deployment → Source: GitHub Actions*.
4. Setiap `git push` ke `main` otomatis membangun dan memublikasikan situs di `https://USERNAME.github.io/dyspal-website/`.
5. Domain sendiri: *Settings → Pages → Custom domain*, lalu arahkan DNS sesuai petunjuk GitHub.

Alternatif: unggah folder `dist/` ke Netlify atau Cloudflare Pages (perintah build `npm run build`, folder output `dist`).

## Dependency dan akses pihak ketiga

- **Saat website berjalan: tidak ada.** Tidak ada API, font eksternal, atau analitik. Font memakai font bawaan sistem.
- **Saat development:** Node.js dan paket `vite` dari npm.
- **Saat publikasi:** akun GitHub (atau Netlify/Cloudflare) milikmu. LRCLIB dan Open-Meteo hanya disebut sebagai teks, karena itu layanan yang dipakai aplikasi Dyspal, bukan website ini.

## Catatan isi yang perlu kamu pastikan

Teks website disusun dari hasil membaca `Dyspal.exe` dan `Dyspal_1.exe`, bukan dari dokumentasi resmi. Sebelum publik, cek ulang:

- Nomor versi (di dalam exe ada beberapa angka berbeda, jadi `app.version` sengaja dikosongkan).
- Klaim privasi ("hanya LRCLIB dan Open-Meteo") dan angka di bagian "Ringan" (4 warna aksen, 4 ukuran, 3 posisi).
- Cuaca: koordinat di aplikasi tampak terkunci ke Jakarta Barat, jadi website tidak menyebut cuaca berdasarkan lokasi.
- Syarat versi Windows, harga/lisensi, dan peringatan SmartScreen belum dicantumkan karena tidak terbaca dari exe.

## Demo island (V3)

Island di hero adalah **simulasi**: tidak membaca volume, performa, atau data komputer pengunjung. Acara yang ditambahkan hanya disimpan di browser pengunjung (`localStorage`) dan tidak terhubung ke aplikasi Dyspal.

- Alur: Resting Mini → klik → Compact (jam) → klik → Calendar. Tab di bawah island membuka Media, Lyrics, Volume, Calendar, Monitor, dan Settings. Klik di luar island atau tekan Esc untuk menciutkan. Klik kanan island untuk menu Settings.
- Teks di dalam island sengaja berbahasa Indonesia, mengikuti aplikasinya. Tab, badge, dan catatan ikut ID/EN.
- Lagu dan lirik demo adalah teks buatan sendiri, bukan lagu atau lirik komersial. Artwork digambar dengan CSS.

### Yang belum terverifikasi atau belum direplikasi

- ZIP screenshot yang dikirim kosong. Seluruh visual diambil dari **frame video** (resolusi 1274×1074), jadi ukuran px adalah perkiraan, bukan pengukuran dari screenshot.
- **Compact Media** (kapsul judul lagu), panel **Volume**, dan halaman Control Center selain General tidak terlihat jelas di video. Panel Volume dibuat mengikuti deskripsi, bukan replika terverifikasi.
- Bentuk wajah kucing pada Resting Mini adalah pendekatan sederhana.
- Perbandingan visual berdampingan dengan screenshot belum dilakukan.
