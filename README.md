# 🌌 Luna Handmade — Galaxy Nebula Link-in-Bio & Creator Storefront Platform

[![Node.js](https://img.shields.io/badge/Node.js-v20+-green.svg)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8.svg)](https://tailwindcss.com)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ed.svg)](https://www.docker.com)
[![License](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)

> Nền tảng hiển thị liên kết nghệ sĩ thủ công (Link-in-Bio) kết hợp cửa hàng trưng bày tác phẩm (Storefront) phong cách **Galaxy Nebula (Dải ngân hà huyền ảo)**, tích hợp cổng quản trị **Admin Creator Studio** đa năng, kiến trúc 3 lớp chuẩn bằng **TypeScript** và hỗ trợ cơ chế lưu trữ **Offline-First**.

---

## 🌟 TÍNH NĂNG NỔI BẬT

### 📱 1. Giao Diện Người Dùng (Mobile-First Public Storefront)
* **Phong cách Thiết kế Galaxy Nebula:** Nền lưới phát quang đa sắc (Cyan `#00b4d8`, Tím `#7209b7`, Hồng neon `#ff4d6d`), điểm xuyết ánh sao lấp lánh (Diamond Stardust) và hào quang xoay quanh Avatar.
* **Bộ Viên Nhộng Liên Kết (Capsule Link Stack):**
  * Nút Hero chính: Trưng bày tác phẩm độc bản với hiệu ứng nhấp nháy (Ping beacon).
  * 5 kênh kết nối chính thức: **TikTok, Facebook, Instagram, YouTube, Zalo**.
* **Tủ Kính Trưng Bày Tác Phẩm (Compact 3-Column Showcase):**
  * Hiển thị lưới 3 cột tối ưu cho màn hình điện thoại di động.
  * Thẻ tác phẩm nạm viền dạ quang, huy hiệu Hot/New, hiển thị giá rõ ràng.
* **Ngăn Kéo Chi Tiết Sản Phẩm (Interactive Drawer Modal):**
  * Xem ảnh phóng to, mô tả chất liệu, kích thước và thời gian chế tác.
  * Nút **"Đặt Mua Trực Tiếp (Zalo 1:1)"** tự động tạo tin nhắn Zalo kèm tên món đồ và giá tiền.
* **Thẻ Tự Sự "Một Chút Về Mình":** Giới thiệu câu chuyện cá nhân của nghệ nhân và quy trình đóng gói tỉ mỉ.

---

### 💻 2. Cổng Quản Trị Cửa Hàng (Laptop-First Admin Creator Studio)
* **Đăng Nhập Bảo Mật Bằng Gmail (Admin Whitelist Guard):**
  * Chỉ tài khoản trong danh sách Admin mới được cấp quyền truy cập.
  * Hỗ trợ đăng nhập nhanh **1-Chạm bằng Google / Gmail** hoặc nhập email & mật khẩu.
  * Chặn đứng mọi truy cập trái phép bằng chữ ký số bảo mật **JWT (JSON Web Token)**.
* **Bảng Điều Khiển Quản Lý Đa Năng:**
  * 🏪 **Tên Shop & Avatar:** Sửa tên cửa hàng, username `@handle`, bio, số điện thoại, tải ảnh đại diện lên máy chủ.
  * 🔗 **Liên Kết Mạng Xã Hội:** Cập nhật nhanh URL của 5 mạng xã hội trong 1 lần lưu duy nhất.
  * 📦 **Sản Phẩm & Mô Tả:** Thêm món mới, tải ảnh sản phẩm, sửa giá bán, danh mục, cập nhật mô tả và xóa sản phẩm.
  * 📖 **Câu Chuyện Về Mình:** Biên tập đoạn giới thiệu tự sự kèm bộ đếm ký tự thời gian thực.
* **Huy Hiệu Trạng Thái Kết Nối (Live Sync Status):**
  * 🟢 **Server API: Online (Port 5000)** khi Backend đang hoạt động.
  * 🟡 **Chế độ Cục bộ (Trình duyệt)** tự động kích hoạt khi offline.

---

## 🏛️ KIẾN TRÚC HỆ THỐNG (SYSTEM ARCHITECTURE)

Dự án áp dụng mô hình kiến trúc 3 lớp chuẩn mực (**3-Tier Layered Architecture**):

```
Client (FE React 19 / Mobile & Laptop)
        │
        ▼ (HTTP REST API / Bearer JWT)
[ Layer 1: Routes & Controllers ]  ──► Tiếp nhận request, xác thực dữ liệu
        │
        ▼
[ Layer 2: Service Layer ]         ──► Logic nghiệp vụ, cấp JWT, upload ảnh
        │
        ▼
[ Layer 3: Repository Layer ]      ──► Quản lý truy xuất & ghi dữ liệu
        │
        ▼
[ Persistent JSON Storage Engine ] ──► Lưu vĩnh viễn vào BE/data/*.json
```

---

## 📁 CẤU TRÚC THƯ MỤC DỰ ÁN

```
Handmade/
├── BE/                         # BACKEND API (Express + TypeScript)
│   ├── data/                   # Nơi lưu trữ dữ liệu JSON (products, links, profile)
│   ├── src/
│   │   ├── config/             # Cấu hình biến môi trường
│   │   ├── controllers/        # Tầng Controller (Auth, Link, Product, Profile, Upload)
│   │   ├── middlewares/        # Middlewares (Auth JWT, Upload Multer, Error, Logger)
│   │   ├── repositories/       # Tầng Repository truy xuất dữ liệu
│   │   ├── routes/             # Bộ định tuyến Express Router (/api/*)
│   │   ├── services/           # Tầng Service xử lý nghiệp vụ
│   │   ├── types/              # Type definitions & DTOs
│   │   ├── app.ts              # Express App Configuration
│   │   └── server.ts           # Điểm khởi động HTTP Server (Port 5000)
│   ├── uploads/                # Thư mục lưu ảnh avatar & sản phẩm do Admin tải lên
│   ├── Dockerfile              # Dockerfile đa tầng cho Backend
│   ├── ecosystem.config.js     # Cấu hình PM2 Cluster Mode cho VPS
│   └── test-api.cjs            # Bộ kiểm thử tích hợp tự động (20 test cases)
├── FE/                         # FRONTEND (React 19 + Vite + Tailwind CSS v4)
│   ├── src/
│   │   ├── components/         # Components giao diện (Header, Profile, Links, Showcase, Admin)
│   │   ├── context/            # AuthContext & DataContext (Offline-First State Engine)
│   │   ├── pages/              # PublicView.jsx, LoginPage.jsx, AdminPortal.jsx
│   │   ├── services/           # apiService.js, storageService.js
│   │   └── styles/             # Tailwind CSS & Galaxy Nebula animations
│   ├── nginx.conf              # Cấu hình Nginx phục vụ SPA & Reverse Proxy
│   ├── vercel.json             # Cấu hình điều hướng cho Vercel Cloud
│   └── Dockerfile              # Dockerfile Nginx phục vụ Frontend
├── docs/                       # Tài liệu đặc tả hệ thống & UI Guidelines
├── docker-compose.yml          # Điều phối toàn bộ cụm container (FE + BE + Volumes)
├── DEPLOYMENT.md               # Sổ tay hướng dẫn triển khai Production
├── package.json                # Monorepo Scripts quản lý chung
└── README.md                   # Tài liệu giới thiệu dự án
```

---

## 🔑 THÔNG TIN TÀI KHOẢN ADMIN MẶC ĐỊNH

Khi truy cập vào đường dẫn quản trị: `http://localhost:3000/admin` (hoặc `/login`):

| Thuộc tính | Giá trị đăng nhập |
|---|---|
| **Địa chỉ Gmail Admin** | `admin.luna@gmail.com` |
| **Mật khẩu quản trị** | `LunaCraft2025@` |
| **Đăng nhập 1-Chạm** | Bấm nút **`[G] Đăng nhập bằng Google / Gmail`** để vào thẳng Studio |

> [!NOTE]
> Để thêm Gmail cá nhân của bạn vào danh sách quản trị viên, mở file `BE/.env` và thêm email vào dòng:
> `ADMIN_GMAIL=admin.luna@gmail.com,emailcuaban@gmail.com`

---

## 🚀 HƯỚNG DẪN KHỞI CHẠY CỤC BỘ (LOCAL SETUP)

### 1. Cài đặt thư viện
Tại thư mục gốc:
```bash
npm run install:all
```

### 2. Khởi chạy chế độ phát triển (Development)
Mở 2 cửa sổ Terminal:

**Terminal 1 — Khởi động Backend (Port 5000):**
```bash
npm run dev:be
```

**Terminal 2 — Khởi động Frontend (Port 3000):**
```bash
npm run dev:fe
```

* Trang người dùng: `http://localhost:3000`
* Trang quản trị: `http://localhost:3000/admin`
* API Base: `http://localhost:5000/api`
* Kiểm tra sức khỏe hệ thống: `http://localhost:5000/api/health`

### 3. Chạy kiểm thử tự động (Integration Tests)
```bash
npm run test:be
```
*(Chạy bộ 20 ca kiểm thử tự động kiểm tra toàn bộ luồng Auth, Profile, Link, Product, Upload).*

---

## 🐳 TRIỂN KHAI NHANH BẰNG DOCKER COMPOSE

Dành cho máy chủ VPS hoặc máy tính đã cài đặt Docker:
```bash
# Build và khởi chạy ngầm toàn bộ hệ thống
docker compose up -d --build
```
Dữ liệu sản phẩm và ảnh tải lên sẽ được tự động ánh xạ bền vững tại thư mục `./BE/data` và `./BE/uploads`.

---

## ☁️ TRIỂN KHAI MIỄN PHÍ LÊN CLOUD (VERCEL + RENDER)

Xem hướng dẫn chi tiết từng bước tại: 👉 **[DEPLOYMENT.md](file:///c:/DoAnCacMon/Handmade/DEPLOYMENT.md)**
* **Backend:** Deploy lên [Render.com](https://render.com) (Node.js Web Service).
* **Frontend:** Deploy lên [Vercel.com](https://vercel.com) (Vite React App).

---

## 👤 Tác Giả & Bản Quyền
* **Dự án:** Luna Handmade — Craftfolio Creator Storefront Platform
* **GitHub Repository:** [https://github.com/DemonQuang/handmade.git](https://github.com/DemonQuang/handmade.git)
* **Bản quyền:** © 2026 Luna Handmade. All rights reserved.
