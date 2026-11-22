# 🌌 Luna Handmade — Backend API (TypeScript 3-Layer Architecture)

Hệ thống Backend RESTful API hoàn chỉnh dành cho Luna Handmade (Craftfolio Creator Storefront Platform), được xây dựng chuẩn kiến trúc 3 lớp (**3-Layer Architecture**) bằng **TypeScript** và **Express.js**, tích hợp cơ chế lưu trữ JSON bền vững (File-based JSON Storage Engine) sẵn sàng chạy ngay lập tức mà không cần cài đặt thêm cơ sở dữ liệu bên ngoài.

---

## 🏛️ Kiến Trúc Hệ Thống (3-Tier Layered Architecture)

Dự án tuân thủ nghiêm ngặt nguyên lý tách biệt trách nhiệm (Separation of Concerns):

```
Client / Frontend (React / Postman)
        │
        ▼ (HTTP Request)
┌────────────────────────────────────────────────────────┐
│  Routes & Middlewares (Auth, Error, Upload, Logger)    │
└───────────────────────┬────────────────────────────────┘
                        │
                        ▼ (Clean DTO / Request data)
┌────────────────────────────────────────────────────────┐
│  Controllers (Request handling, Validation, Response)  │
└───────────────────────┬────────────────────────────────┘
                        │
                        ▼ (Business calls)
┌────────────────────────────────────────────────────────┐
│  Services (Business logic, JWT Token, Seed fallback)   │
└───────────────────────┬────────────────────────────────┘
                        │
                        ▼ (Entity CRUD)
┌────────────────────────────────────────────────────────┐
│  Repositories (Atomic JSON File Persistence Engine)    │
└───────────────────────┬────────────────────────────────┘
                        │
                        ▼ (Data files)
           data/*.json (profile, links, products)
```

1. **Routing Layer (`src/routes/`)**: Định tuyến URL, gắn kết middlewares (JWT Auth, Multer upload).
2. **Controller Layer (`src/controllers/`)**: Tiếp nhận `req`, trích xuất params/body, gọi Service và chuẩn hóa đầu ra qua `ApiResponse`.
3. **Service Layer (`src/services/`)**: Xử lý logic nghiệp vụ, tính toán, cấp phát JWT token, mã hóa/xác thực.
4. **Repository Layer (`src/repositories/`)**: Trừu tượng hóa việc truy vấn và ghi dữ liệu vào các file JSON tại thư mục `data/` với cơ chế auto-seed khi khởi động lần đầu.

---

## 📁 Cấu Trúc Thư Mục Chuẩn

```
BE/
├── data/                       # Lưu trữ dữ liệu JSON (tự động khởi tạo và seed nếu chưa có)
│   ├── links.json
│   ├── products.json
│   └── profile.json
├── dist/                       # Mã nguồn sau khi biên dịch TypeScript (tsc)
├── uploads/                    # Thư mục chứa ảnh avatar và sản phẩm được tải lên
├── src/
│   ├── config/                 # Cấu hình biến môi trường và constants
│   │   └── env.ts
│   ├── constants/              # HTTP Status codes, constants dùng chung
│   │   └── httpStatus.ts
│   ├── controllers/            # Controller xử lý HTTP Request/Response
│   │   ├── auth.controller.ts
│   │   ├── link.controller.ts
│   │   ├── product.controller.ts
│   │   ├── profile.controller.ts
│   │   └── upload.controller.ts
│   ├── middlewares/            # Middlewares: Auth (JWT), Upload (Multer), Logger, Error Handler
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   ├── logger.middleware.ts
│   │   └── upload.middleware.ts
│   ├── repositories/           # Tầng tương tác dữ liệu (Persistence Layer)
│   │   ├── link.repository.ts
│   │   ├── product.repository.ts
│   │   └── profile.repository.ts
│   ├── routes/                 # Express Router cho từng module
│   │   ├── auth.routes.ts
│   │   ├── index.ts            # Gom toàn bộ route vào tiền tố /api
│   │   ├── link.routes.ts
│   │   ├── product.routes.ts
│   │   ├── profile.routes.ts
│   │   └── upload.routes.ts
│   ├── services/               # Nghiệp vụ nghiệp vụ chính (Business Logic)
│   │   ├── auth.service.ts
│   │   ├── link.service.ts
│   │   ├── product.service.ts
│   │   └── profile.service.ts
│   ├── types/                  # Type definitions & DTOs
│   │   ├── auth.types.ts
│   │   ├── link.types.ts
│   │   ├── product.types.ts
│   │   └── profile.types.ts
│   ├── utils/                  # Tiện ích chung & Dữ liệu hạt giống mặc định
│   │   ├── apiResponse.ts      # Envelope format chuẩn cho JSON response
│   │   └── seedData.ts         # Dữ liệu chuẩn cho Luna Handmade
│   ├── app.ts                  # Cấu hình ứng dụng Express (Factory Pattern `createApp`)
│   └── server.ts               # Điểm khởi động HTTP Server lắng nghe Port
├── .env                        # File cấu hình môi trường
├── .env.example                # File mẫu biến môi trường
├── package.json                # Dependencies & scripts
└── tsconfig.json               # Cấu hình TypeScript Compiler
```

---

## 🚀 Cài Đặt & Khởi Chạy

### 1. Yêu cầu hệ thống
- **Node.js**: v18.0.0 trở lên (đã test tương thích tốt với Node v20/v22)
- **npm**: v9 trở lên

### 2. Cài đặt thư viện
```bash
cd BE
npm install
```

### 3. Cấu hình file `.env`
Sao chép từ `.env.example` hoặc điều chỉnh file `.env`:
```env
PORT=5000
NODE_ENV=development
BASE_URL=http://localhost:5000
CORS_ORIGIN=*

# JWT Configuration
JWT_SECRET=luna_galaxy_nebula_jwt_secret_key_2026_super_safe
JWT_EXPIRES_IN=7d

# File Upload Configuration
UPLOAD_MAX_SIZE=5242880
UPLOAD_DIR=uploads
DATA_DIR=data
```

### 4. Các lệnh thực thi (NPM Scripts)

| Lệnh | Ý nghĩa |
|---|---|
| `npm run dev` | Khởi chạy server ở chế độ Development với **hot-reload** (ts-node-dev) |
| `npm run build` | Dọn dẹp thư mục `dist/` và biên dịch toàn bộ TypeScript sang JavaScript (`tsc`) |
| `npm start` | Khởi chạy server Production từ mã nguồn đã biên dịch (`node dist/server.js`) |
| `npm test` | Chạy bộ kiểm thử tự động toàn diện (Integration Test Suite - 19 ca kiểm thử) |
| `npm run clean` | Xóa thư mục `dist/` |

---

## 📡 Danh Sách API Endpoints

Tất cả các API được bảo vệ yêu cầu gửi Header:
```
Authorization: Bearer <your_jwt_token>
```

Format dữ liệu trả về chuẩn theo envelope:
```json
{
  "success": true,
  "data": { ... },
  "message": "Thông báo nếu có"
}
```

### 1. Hệ thống & Kiểm tra sức khỏe (Health Check)
| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| `GET` | `/` | Public | Thông tin chào mừng của API |
| `GET` | `/api/health` | Public | Kiểm tra trạng thái hoạt động của Server |

### 2. Xác thực Admin (Authentication)
| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| `POST` | `/api/auth/login` | Public | Đăng nhập Admin bằng Gmail & Mật khẩu (Body: `{ "email", "password" }`) |
| `POST` | `/api/auth/login-google` | Public | Đăng nhập Admin qua Google Email 1-chạm (Body: `{ "email", "name", "avatar" }`) |
| `GET` | `/api/auth/me` | Admin | Lấy thông tin tài khoản Admin hiện tại qua Bearer Token |

### 3. Quản lý Hồ sơ & Về mình (Profile & Bio)
| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| `GET` | `/api/profile` | Public | Lấy toàn bộ thông tin Shop (Tên, Handle, Avatar, Bio, Story "Một chút về mình") |
| `PUT` | `/api/profile` | Admin | Cập nhật thông tin Shop |
| `PUT` | `/api/profile/story` | Admin | Cập nhật nhanh đoạn giới thiệu "Một chút về mình" |

### 4. Quản lý Liên kết Mạng xã hội (Social Links)
| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| `GET` | `/api/links` | Public | Lấy danh sách liên kết mạng xã hội (TikTok, FB, IG, YouTube, Zalo) |
| `PUT` | `/api/links` | Admin | Cập nhật hàng loạt danh sách liên kết |
| `PUT` | `/api/links/:id` | Admin | Cập nhật 1 liên kết cụ thể theo ID |

### 5. Quản lý Sản phẩm & Tác phẩm (Products Catalog)
| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| `GET` | `/api/products` | Public | Lấy toàn bộ danh sách sản phẩm hiển thị trên trang chủ |
| `GET` | `/api/products/:id` | Public | Lấy chi tiết 1 sản phẩm |
| `POST` | `/api/products` | Admin | Tạo mới 1 sản phẩm (Body: `{ "title", "price", "image", "description", "category", ... }`) |
| `PUT` | `/api/products/:id` | Admin | Chỉnh sửa thông tin sản phẩm |
| `DELETE` | `/api/products/:id` | Admin | Xóa sản phẩm khỏi hệ thống |

### 6. Tải lên tệp đa phương tiện (Upload File)
| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| `POST` | `/api/upload` | Admin | Tải ảnh lên (form-data: `file`). Trả về đường dẫn tĩnh truy cập `/uploads/<filename>` |

---

## 🔒 Kiểm tra & Bảo mật
- **JWT Protection**: Kiểm tra token chặt chẽ ở mọi endpoint ghi nhận cập nhật / sửa đổi.
- **File Upload Safety**: Giới hạn tối đa 5MB, chỉ chấp nhận định dạng ảnh (`image/jpeg`, `image/png`, `image/webp`, `image/gif`).
- **Atomic Data Persistence**: Đảm bảo an toàn dữ liệu file JSON, không xung đột khi ghi đồng thời.
- **Tương thích toàn diện với Frontend**: Sẵn sàng kết nối trực tiếp với Frontend React tại thư mục `FE/`.
