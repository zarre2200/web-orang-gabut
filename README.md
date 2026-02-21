# Social Media Posts App

Aplikasi web untuk membuat dan berbagi posts dengan foto/video dan deskripsi. Posts disimpan di server dan dapat diakses dari semua device di seluruh dunia!

## Fitur

- ✓ Posting foto dan video
- ✓ Deskripsi hingga 300 kata per post
- ✓ Edit dan delete posts
- ✓ Timestamp untuk setiap post
- ✓ Responsive di semua devices (mobile, tablet, desktop)
- ✓ Multi-user di semua perangkat (smartphone, komputer, tablet)
- ✓ **Akses dari jauh** - Akses dari perangkat apa pun dengan internet
- ✓ **Cross-platform** - Works on Windows, macOS, Linux

## 🚀 Startup Cepat

### Opsi 1: Script Otomatis (Recommended)

**Windows:**
- Double-click `start-server.bat`

**macOS/Linux:**
- Terminal: `chmod +x start-server.sh && ./start-server.sh`

### Opsi 2: Command Manual

```bash
# Navigate ke folder d:\visual\
cd d:\visual\

# Install dependencies
npm install

# Start server
npm start
```

Server akan menampilkan semua IP addresses yang bisa digunakan untuk connect!

## Setup Lengkap (Semua OS)

### 1. Install Node.js
- Download dari https://nodejs.org/
- Atau gunakan package manager:
  - **Windows:** `choco install nodejs`
  - **macOS:** `brew install node`
  - **Linux:** `sudo apt-get install nodejs npm` (Ubuntu/Debian)

### 2. Install Dependencies
```bash
cd d:\visual\
npm install
```

### 3. Jalankan Server

**Windows:**
```powershell
npm start
# atau
.\start-server.bat
# atau
powershell -ExecutionPolicy Bypass -File start-server.ps1
```

**macOS/Linux:**
```bash
npm start
# atau
./start-server.sh
# Background: npm start &
```

## Cara Menggunakan

### Membuat Post
1. Klik "Files and Description"
2. Pilih photo/video (opsional)
3. Tulis deskripsi (max 300 kata)
4. Klik "Preview" untuk melihat hasilnya
5. Klik "Post" untuk memposting

### Edit Post
1. Di halaman Home, klik 3 titik (⋯) di bawah post
2. Klik "Edit"
3. Ubah konten sesuai keinginan
4. Klik "Update Post"

### Delete Post
1. Di halaman Home, klik 3 titik (⋯) di bawah post
2. Klik "Delete"
3. Konfirmasi penghapusan

## 🌍 Akses Dari Device Lain

Setelah server start, Anda akan melihat output seperti:

```
========================================
[✓] SERVER STARTED
========================================
[✓] Local access (this machine):
    http://localhost:3000/index.html
    http://127.0.0.1:3000/index.html
[✓] Network access (other devices):
    http://192.168.1.100:3000/index.html
    http://192.168.0.50:3000/index.html
========================================
```

**Untuk smartphone/tablet/komputer lain:**
- Pastikan device tersebut terhubung ke WiFi yang sama
- Buka browser dan akses: `http://<SERVER_IP>:3000/index.html`
- Contoh: `http://192.168.1.100:3000/index.html`

## Struktur File

```
d:\visual\
├── server.js              # Backend Express server
├── config.js              # Configuration untuk multi-device
├── package.json          # Node.js dependencies
├── posts.json            # File penyimpanan posts (auto-generated)
├── start-server.bat      # Windows startup script
├── start-server.sh       # macOS/Linux startup script
├── start-server.ps1      # PowerShell startup script
├── index.html            # Home page (feed)
├── files_and_description.html  # Halaman posting
├── login.html            # Login page
├── register.html         # Register page
├── zarre.html            # Secondary page
├── README.md             # File ini
├── DEBUGGING.md          # Debugging guide
└── SETUP_MULTIPLATFORM.md # Setup guide untuk semua OS
```

## API Endpoints

- `GET /api/posts` - Ambil semua posts
- `GET /api/health` - Server health check
- `POST /api/posts` - Buat post baru
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Hapus post

## Configuration

Aplikasi menggunakan `config.js` untuk deteksi server URL otomatis:
- Jika page dibuka dari server, gunakan same-origin
- Jika dibuka sebagai file, gunakan `http://localhost:3000`
- Dapat dikustomisasi di `config.js`

## Troubleshooting

**Error: "Connection error"**
- Pastikan server berjalan: `npm start`
- Pastikan akses ke http://localhost:3000
- Lihat `DEBUGGING.md` untuk detail lebih lanjut

**Error: "Cannot connect from other device"**
- Pastikan device lain terhubung ke WiFi yang sama
- Gunakan IP address yang ditampilkan server startup
- Check firewall port 3000

**Error: "Post not found" saat edit**
- Reload halaman Home dan coba edit lagi

**Server tidak start**
- Pastikan Node.js terinstall: `node -v`
- Pastikan dependencies terinstall: `npm install`
- Cek port 3000 tidak digunakan aplikasi lain: `PORT=4000 npm start`

**npm command not found**
- Restart terminal/command prompt setelah install Node.js
- Atau restart komputer

## Custom Port

```bash
# Windows PowerShell
$env:PORT=4000; npm start

# macOS/Linux
PORT=4000 npm start

# Kemudian akses: http://localhost:4000/index.html
```

## Dokumentasi Lengkap

- **SETUP_MULTIPLATFORM.md** - Panduan setup detail untuk Windows/macOS/Linux
- **DEBUGGING.md** - Debugging guide dengan server/client logs

## Build Information

- **Backend:** Node.js + Express.js
- **Frontend:** HTML5 + CSS3 + Vanilla JavaScript
- **Storage:** Local filesystem (posts.json)
- **Networking:** CORS enabled untuk cross-origin
- **Platform:** Windows, macOS, Linux
