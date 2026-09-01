# PRESENSI GPS LENGKAP

## 1. Website
Buka `index.html`. Untuk GPS pada HP, website harus dijalankan melalui HTTPS (misalnya GitHub Pages, Netlify, Vercel, atau hosting HTTPS).

## 2. Konfigurasi lokasi
Edit bagian CONFIG di index.html:
- officeLat
- officeLng
- radiusMeters
- apiUrl

## 3. Google Sheets sebagai database pusat
1. Buat Google Sheet baru.
2. Buka Extensions > Apps Script.
3. Salin isi `Code.gs`.
4. Ganti `SPREADSHEET_ID`.
5. Jalankan fungsi `setup()` satu kali dan izinkan akses.
6. Deploy > New deployment > Web app.
7. Execute as: Me.
8. Who has access: Anyone.
9. Salin URL Web App.
10. Masukkan URL tersebut ke `apiUrl` di index.html.

Catatan keamanan:
- Contoh ini memakai login demo di sisi browser. Untuk produksi dengan data pegawai sensitif, gunakan autentikasi server-side/Google Identity atau backend.
- GPS browser bukan alat anti-kecurangan sempurna; perangkat/browser dapat memberikan lokasi yang tidak akurat/spoofed.
