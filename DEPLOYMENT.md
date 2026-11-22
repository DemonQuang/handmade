# 🚀 HƯỚNG DẪN ĐÓNG GÓI & TRIỂN KHAI HỆ THỐNG LUNA HANDMADE (DEPLOYMENT GUIDE)

Tài liệu này hướng dẫn chi tiết các phương án đóng gói và triển khai hệ thống **Luna Handmade (Storefront & Creator Studio)** lên môi trường Production thực tế.

---

## 📦 1. TỔNG QUAN CÁC THÀNH PHẦN ĐÃ ĐƯỢC ĐÓNG GÓI

Dự án đã được cấu hình sẵn các công cụ đóng gói chuẩn công nghiệp:

| Thành phần | Công cụ đóng gói | Vai trò |
|---|---|---|
| **Backend API** | [BE/Dockerfile](file:///c:/DoAnCacMon/Handmade/BE/Dockerfile) | Node 20 Multi-stage build, biên dịch TypeScript sang JS tối ưu, tích hợp Healthcheck |
| **Frontend SPA** | [FE/Dockerfile](file:///c:/DoAnCacMon/Handmade/FE/Dockerfile) | Multi-stage build (Vite -> Nginx Alpine), phục vụ file tĩnh và nén Gzip |
| **Reverse Proxy** | [FE/nginx.conf](file:///c:/DoAnCacMon/Handmade/FE/nginx.conf) | Cấu hình Nginx điều hướng SPA, reverse proxy `/api/` và `/uploads/` triệt tiêu CORS |
| **Orchestration** | [docker-compose.yml](file:///c:/DoAnCacMon/Handmade/docker-compose.yml) | Khởi động toàn bộ cụm FE + BE + Volumes chỉ với 1 câu lệnh duy nhất |
| **Process Manager**| [BE/ecosystem.config.js](file:///c:/DoAnCacMon/Handmade/BE/ecosystem.config.js) | Cấu hình PM2 Cluster Mode cho VPS truyền thống không dùng Docker |
| **Monorepo Scripts**| [package.json](file:///c:/DoAnCacMon/Handmade/package.json) | Bộ lệnh quản lý nhanh toàn bộ dự án từ thư mục gốc |

---

## 🐳 CÁCH 1: TRIỂN KHAI BẰNG DOCKER COMPOSE (KHUYÊN DÙNG NHẤT)

Đây là phương pháp triển khai hiện đại, chuẩn hóa và nhanh nhất. Có thể chạy trên bất kỳ máy chủ nào (Ubuntu, CentOS, Debian, Windows Server, MacOS) có cài Docker.

### Bước 1: Chuẩn bị máy chủ
Đảm bảo máy chủ đã cài đặt **Docker** và **Docker Compose**:
```bash
docker --version
docker compose version
```

### Bước 2: Khởi động hệ thống
Tại thư mục gốc dự án, chạy lệnh:
```bash
# Tải mã nguồn, build container và chạy ngầm (Detached mode)
docker compose up -d --build
```

### Bước 3: Kiểm tra trạng thái
```bash
# Xem danh sách container đang chạy
docker compose ps

# Xem log hoạt động theo thời gian thực
docker compose logs -f
```

* **Trang chủ người dùng & Admin:** Truy cập `http://<IP_MAY_CHU>` hoặc `http://<IP_MAY_CHU>:3000`
* **API Backend:** Lắng nghe tại `http://<IP_MAY_CHU>:5000/api`

### Bước 4: Quản lý & Tắt hệ thống
```bash
# Tắt hệ thống
docker compose down

# Khởi động lại hệ thống
docker compose restart
```

> [!IMPORTANT]
> Toàn bộ dữ liệu sản phẩm, liên kết và ảnh người dùng tải lên được ánh xạ ra ngoài máy chủ vật lý tại `./BE/data` và `./BE/uploads`, đảm bảo **không bao giờ bị mất dữ liệu** khi cập nhật hoặc restart container.

---

## 🖥️ CÁCH 2: TRIỂN KHAI LÊN VPS TRUYỀN THỐNG (PM2 + NGINX)

Nếu máy chủ của bạn không dùng Docker, bạn có thể triển khai trực tiếp bằng Node.js và PM2:

### Bước 1: Cài đặt môi trường trên VPS
```bash
sudo apt update && sudo apt install -y nodejs npm nginx
sudo npm install -g pm2
```

### Bước 2: Build mã nguồn Backend & Frontend
```bash
# Tại thư mục gốc:
npm run build:all
```
Hoặc vào từng thư mục:
```bash
cd BE && npm install && npm run build
cd ../FE && npm install && npm run build
```

### Bước 3: Khởi chạy Backend bằng PM2
```bash
cd BE
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

### Bước 4: Cấu hình Nginx trên VPS
Tạo file cấu hình Nginx `/etc/nginx/sites-available/luna`:
```nginx
server {
    listen 80;
    server_name yourdomain.com; # hoặc IP máy chủ

    root /path/to/Handmade/FE/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /uploads/ {
        proxy_pass http://localhost:5000/uploads/;
        proxy_set_header Host $host;
    }
}
```
Kích hoạt và khởi động lại Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/luna /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## ☁️ CÁCH 3: TRIỂN KHAI LÊN CLOUD MIỄN PHÍ (VERCEL + RENDER)

Nếu bạn muốn deploy để đưa cho người khác trải nghiệm trực tiếp qua Internet với chi phí **0 đồng**:

### 1. Triển khai Backend (Lên Render.com hoặc Railway.app)
1. Đẩy mã nguồn thư mục `BE` lên GitHub.
2. Truy cập [Render.com](https://render.com) -> Chọn **New Web Service**.
3. Chọn repo GitHub -> Cấu hình:
   * **Root Directory:** `BE`
   * **Build Command:** `npm install && npm run build`
   * **Start Command:** `npm start`
4. Cấu hình biến môi trường (Environment Variables):
   * `NODE_ENV`: `production`
   * `ADMIN_GMAIL`: `admin.luna@gmail.com`
   * `ADMIN_PASSWORD`: `LunaCraft2025@`
   * `JWT_SECRET`: `luna_prod_secret_galaxy_2026`
5. Bấm Deploy -> Lấy đường link backend (ví dụ: `https://luna-be.onrender.com`).

### 2. Triển khai Frontend (Lên Vercel.com)
1. Đẩy mã nguồn thư mục `FE` lên GitHub.
2. Truy cập [Vercel.com](https://vercel.com) -> Import repo -> Chọn thư mục `FE`.
3. Cấu hình Environment Variable:
   * `VITE_API_URL`: Điền URL backend của bạn kèm `/api` (ví dụ: `https://luna-be.onrender.com/api`).
4. Bấm Deploy -> Hoàn tất! Trang web sẽ chạy với domain `.vercel.app`.

---

## 🔒 4. SAO LƯU & BẢO TRÌ DỮ LIỆU (BACKUP & RESTORE)

Dữ liệu của toàn bộ cửa hàng nằm tại:
* 📂 `BE/data/`: Chứa file `products.json`, `links.json`, `profile.json`
* 📂 `BE/uploads/`: Chứa toàn bộ file ảnh do Admin tải lên

**Cách sao lưu nhanh:**
```bash
# Nén dữ liệu định kỳ
tar -czvf luna_backup_$(date +%F).tar.gz BE/data BE/uploads
```
Khi muốn khôi phục dữ liệu ở máy khác, chỉ cần giải nén đè lại vào thư mục tương ứng!
