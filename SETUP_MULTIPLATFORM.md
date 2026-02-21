# Multi-OS Setup Guide

এই গাইড ব্যাখ্যা করে কিভাবে সোশ্যাল মিডিয়া অ্যাপ্লিকেশন Windows, macOS এবং Linux এ সেটআপ এবং চালাতে হয়।

## প্রি-প্রয়োজনীয়তা (সমস্ত OS)

1. **Node.js ইনস্টল করুন** (সংস্করণ 14.0 বা তার উপরে)
   - ডাউনলোড: https://nodejs.org/
   - ভেরিফাই করুন: `node --version` এবং `npm --version`

2. **অ্যাপ্লিকেশন ফাইল ডাউনলোড করুন**
   - সমস্ত ফাইল একটি ফোল্ডারে রাখুন

```
project-folder/
├── index.html
├── files_and_description.html
├── login.html
├── register.html
├── zarre.html
├── config.js
├── server.js
├── package.json
└── posts.json (তৈরি হবে স্বয়ংক্রিয়ভাবে)
```

---

## Windows সেটআপ

### ধাপ 1: প্রাথমিক সেটআপ

```powershell
# প্রজেক্ট ফোল্ডারে যান
cd C:\path\to\project-folder

# নির্ভরতা ইনস্টল করুন
npm install
```

### ধাপ 2: সার্ভার চালান

**পদ্ধতি A: কমান্ড লাইন দিয়ে**
```powershell
npm start
```

**পদ্ধতি B: স্বয়ংক্রিয় স্টার্টআপ স্ক্রিপ্ট (নিচে তৈরি করুন)**

`start-server.bat` ফাইল তৈরি করুন:
```batch
@echo off
title Social Media Server
cd /d "%~dp0"
npm start
pause
```

তারপর এটি চালান: ডবল-ক্লিক করুন `start-server.bat`

### ধাপ 3: ব্রাউজারে অ্যাক্সেস করুন

**এই মেশিন থেকে:**
- `http://localhost:3000/index.html`
- `http://127.0.0.1:3000/index.html`

**অন্য ডিভাইস থেকে (একই নেটওয়ার্কে):**
- সার্ভার স্টার্ট হওয়ার সময় IP address দেখুন
- ব্রাউজারে ব্যবহার করুন: `http://<SERVER_IP>:3000/index.html`
  - উদাহরণ: `http://192.168.1.100:3000/index.html`

---

## macOS সেটআপ

### ধাপ 1: প্রাথমিক সেটআপ (टার্মিনাল ব্যবহার করে)

```bash
# Terminal.app খুলুন (Applications > Utilities > Terminal)

# প্রজেক্ট ফোল্ডারে যান
cd /path/to/project-folder

# নির্ভরতা ইনস্টল করুন
npm install
```

### ধাপ 2: সার্ভার চালান

```bash
npm start
```

### ধাপ 3: ব্রাউজারে অ্যাক্সেস করুন

**এই মেশিন থেকে:**
- আপনার ডিফল্ট ব্রাউজার খুলুন
- ঠিকানা বার এ যান: `http://localhost:3000/index.html`

**অন্য ডিভাইস থেকে:**
- টার্মিনাল আউটপুটে নেটওয়ার্ক IP খুঁজুন
- ব্যবহার করুন: `http://<YOUR_MAC_IP>:3000/index.html`

### স্টার্টআপ স্ক্রিপ্ট তৈরি করুন (ঐচ্ছিক)

`start-server.sh` তৈরি করুন:
```bash
#!/bin/bash
cd "$(dirname "$0")"
npm start
```

টার্মিনালে এটি এক্সিকিউটেবল করুন:
```bash
chmod +x start-server.sh
```

তারপর চালান:
```bash
./start-server.sh
```

---

## Linux সেটআপ

### ধাপ 1: প্রাথমিক সেটআপ (টার্মিনাল ব্যবহার করে)

```bash
# Terminal খুলুন

# প্রজেক্ট ফোল্ডারে যান
cd /path/to/project-folder

# নির্ভরতা ইনস্টল করুন
npm install
```

### ধাপ 2: সার্ভার চালান

```bash
npm start
```

### ধাপ 3: ব্রাউজারে অ্যাক্সেস করুন

**এই মেশিন থেকে:**
- আপনার ব্রাউজার খুলুন (Firefox, Chrome, etc.)
- ঠিকানা: `http://localhost:3000/index.html`

**অন্য ডিভাইস থেকে:**
- টার্মিনাল আউটপুট দেখুন এবং IP খুঁজুন
- ব্যবহার করুন: `http://<YOUR_LINUX_IP>:3000/index.html`

### ব্যাকগ্রাউন্ডে চালান (ঐচ্ছিক)

টার্মিনাল বন্ধ করার সময় সার্ভার চলতে থাকার জন্য:

```bash
# tmux দিয়ে
tmux new-session -d -s socialmedia "cd /path/to/project && npm start"

# পরে চেক করতে
tmux attach-session -t socialmedia

# বন্ধ করতে
tmux kill-session -t socialmedia
```

অথবা systemd সার্ভিস হিসেবে:

`/etc/systemd/system/socialmedia.service` তৈরি করুন (sudo):
```ini
[Unit]
Description=Social Media Application
After=network.target

[Service]
Type=simple
User=yourname
WorkingDirectory=/path/to/project
ExecStart=/usr/bin/npm start
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

তারপর:
```bash
sudo systemctl enable socialmedia
sudo systemctl start socialmedia
```

---

## ডিভাইস জুড়ে অ্যাক্সেস কভার করে

### স্মার্টফোন/ট্যাবলেট থেকে

1. নিশ্চিত করুন ফোন এবং কম্পিউটার একই WiFi নেটওয়ার্কে আছে
2. ফোনের ব্রাউজারে যান
3. সার্ভার IP দিয়ে অ্যাক্সেস করুন:
   - `http://192.168.1.100:3000/index.html` (আপনার সার্ভার IP প্রতিস্থাপন করুন)

### উইন্ডোজ/ম্যাক/লিনাক্স থেকে

- যেকোনো ব্রাউজার খুলুন
- সার্ভার IP ঠিকানা দিয়ে অ্যাক্সেস করুন
- উদাহরণ: উইন্ডোজ সার্ভার থেকে macOS ক্লায়েন্টে: `http://<windows-ip>:3000/index.html`

---

## সাধারণ সমস্যাগুলির সমাধান

### সমস্যা: "port 3000 already in use"

**সমাধান:**
```bash
# ডিফল্ট port পরিবর্তন করুন
PORT=4000 npm start
```

তারপর অ্যাক্সেস করুন: `http://localhost:4000/index.html`

### সমস্যা: "Cannot connect to server from other device"

**সমাধান:**
1. ফায়ারওয়াল চেক করুন - port 3000 blockক্রিত হতে পারে
2. `server.js` এ IP addresses দেখুন
3. সঠিক নেটওয়ার্ক IP ব্যবহার করছেন তা যাচাই করুন (localhost নয়)

### সমস্যা: "EACCES: permission denied" (Linux/macOS)

**সমাধান:**
```bash
# node_modules পুনরায় ইনস্টল করুন
rm -rf node_modules package-lock.json
npm install
```

### সমস্যা: npm কমান্ড পাওয়া যাচ্ছে না

**সমাধান:**
- Node.js পুনরায় ইনস্টল করুন
- Windows: সিস্টেম রিবুট করুন
- macOS/Linux: নতুন টার্মিনাল উইন্ডো খুলুন

---

## পোর্ট এবং নেটওয়ার্ক কনফিগারেশন

### কাস্টম পোর্ট সেট করুন

**Windows:**
```powershell
$env:PORT=4000; npm start
```

**macOS/Linux:**
```bash
PORT=4000 npm start
```

### প্রক্সি বা রাউটারের মাধ্যমে এক্সেস

যদি বাইরের নেটওয়ার্ক থেকে অ্যাক্সেস করতে চান:
1. রাউটারে port forwarding সেটআপ করুন
2. `router.local.ip:3000` বা পাবলিক ডডিএনএস ব্যবহার করুন
3. নিরাপত্তা মনে রাখুন - উৎপাদনে এটি সুরক্ষিত করুন

---

## দ্রুত রেফারেন্স

| OS | কমান্ড | ব্রাউজার URL |
|----|--------|------------|
| Windows | `npm start` | `http://localhost:3000/index.html` |
| macOS | `npm start` | `http://localhost:3000/index.html` |
| Linux | `npm start` | `http://localhost:3000/index.html` |
| সকল OS | `PORT=4000 npm start` | `http://localhost:4000/index.html` |
| অন্য ডিভাইস | N/A | `http://<server-ip>:3000/index.html` |

---

## পরবর্তী পদক্ষেপ

1. সার্ভার চালু করুন এবং সফলভাবে সংযোগ হওয়ার যাচাই করুন
2. আপনার নিজের ডিভাইস থেকে অ্যাপ্লিকেশন পরীক্ষা করুন
3. একটি বন্ধুর ফোনে এটি চালান (একই WiFi প্রয়োজন)
4. পোস্ট, সম্পাদনা এবং মুছুন - সব ডিভাইস জুড়ে কাজ করবে!

বিস্তারিত জন্য `DEBUGGING.md` এবং `README.md` দেখুন।
