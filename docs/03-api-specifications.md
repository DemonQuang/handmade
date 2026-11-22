# 03. ĐẶC TẢ HỆ THỐNG REST API (API SPECIFICATIONS)
## Dự Án: Luna Handmade — Galaxy Nebula Backend Service

- **Base URL:** `http://localhost:5000/api`
- **Định dạng dữ liệu:** `application/json` (trừ endpoint upload dùng `multipart/form-data`)
- **Cơ chế xác thực:** Bearer Token (JWT Header: `Authorization: Bearer <TOKEN>`)

---

## 1. PHÂN HỆ XÁC THỰC (AUTHENTICATION - `/api/auth`)

### 1.1. Đăng nhập Quản trị bằng Gmail
* **Endpoint:** `POST /api/auth/login`
* **Mô tả:** Đăng nhập quản trị bằng tài khoản Gmail hoặc Google 1-chạm.
* **Request Body:**
  ```json
  {
    "email": "admin.luna@gmail.com",
    "password": "LunaCraft2025@",
    "isGoogleAuth": false
  }
  ```
* **Response Thành công (`200 OK`):**
  ```json
  {
    "success": true,
    "message": "Đăng nhập thành công",
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "email": "admin.luna@gmail.com",
        "displayName": "Luna Admin",
        "role": "ADMIN"
      }
    }
  }
  ```
* **Response Thất bại (`401 Unauthorized`):**
  ```json
  {
    "success": false,
    "message": "Email hoặc mật khẩu không chính xác"
  }
  ```

### 1.2. Kiểm tra phiên đăng nhập hiện tại
* **Endpoint:** `GET /api/auth/me`
* **Headers:** `Authorization: Bearer <token>`
* **Response (`200 OK`):**
  ```json
  {
    "success": true,
    "data": {
      "email": "admin.luna@gmail.com",
      "displayName": "Luna Admin",
      "role": "ADMIN"
    }
  }
  ```

---

## 2. PHÂN HỆ HỒ SƠ & THÔNG TIN CỬA HÀNG (PROFILE - `/api/profile`)

### 2.1. Lấy thông tin cửa hàng (Public)
* **Endpoint:** `GET /api/profile`
* **Mô tả:** Lấy thông tin Tên shop, Avatar, Bio, Câu chuyện "Một chút về mình" để hiển thị trên trang Bio.
* **Response (`200 OK`):**
  ```json
  {
    "success": true,
    "data": {
      "name": "Luna Handmade",
      "handle": "@luna.handmade",
      "field": "Nghệ thuật thủ công & Resin",
      "avatar": "/assets/images/avatar.jpg",
      "verified": true,
      "bio": "Biến tưởng tượng thành tác phẩm nghệ thuật thủ công. Mỗi tác phẩm là một dải ngân hà thu nhỏ ✨",
      "aboutStory": "Xin chào! Mình là Luna – người say mê biến đất sét polymer và resin trong suốt thành những câu chuyện vũ trụ lung linh...",
      "contactPhone": "0908 123 456",
      "contactZalo": "https://zalo.me/0908123456",
      "location": "Hồ Chí Minh, Việt Nam • Giao hàng toàn quốc",
      "platformBadge": "Made with Craftfolio ✨",
      "copyright": "© 2025 Luna Handmade • All rights reserved."
    }
  }
  ```

### 2.2. Cập nhật thông tin cửa hàng (Admin Only)
* **Endpoint:** `PUT /api/profile`
* **Headers:** `Authorization: Bearer <token>`
* **Request Body:**
  ```json
  {
    "name": "Luna Handmade Artisan Studio",
    "handle": "@luna.handmade",
    "avatar": "http://localhost:5000/uploads/avatar-12345.jpg",
    "bio": "Mỗi tác phẩm là một dải ngân hà thu nhỏ ✨",
    "aboutStory": "Nội dung cập nhật câu chuyện một chút về mình..."
  }
  ```
* **Response (`200 OK`):**
  ```json
  {
    "success": true,
    "message": "Cập nhật thông tin cửa hàng thành công",
    "data": { ... }
  }
  ```

---

## 3. PHÂN HỆ LIÊN KẾT MẠNG XÃ HỘI (LINKS - `/api/links`)

### 3.1. Lấy danh sách liên kết (Public)
* **Endpoint:** `GET /api/links`
* **Query Params (Tùy chọn):** `?activeOnly=true` (chỉ lấy link đang bật)
* **Response (`200 OK`):**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "storefront",
        "isHero": true,
        "title": "CỬA HÀNG THỦ CÔNG LUNA",
        "subtitle": "✨ ORDER TẠI ĐÂY • Ưu đãi độc quyền ✨",
        "url": "#featured-products",
        "icon": "shopping_bag",
        "badgePing": true,
        "enabled": true
      },
      {
        "id": "tiktok",
        "isHero": false,
        "title": "TikTok @luna.craft",
        "url": "https://tiktok.com/@luna.craft",
        "icon": "play_circle",
        "enabled": true
      }
    ]
  }
  ```

### 3.2. Cập nhật nhanh các kênh mạng xã hội (Admin Only)
* **Endpoint:** `PUT /api/links/socials`
* **Headers:** `Authorization: Bearer <token>`
* **Request Body:**
  ```json
  {
    "tiktok": "https://tiktok.com/@luna.craft",
    "youtube": "https://youtube.com/@lunahandmade",
    "facebook": "https://facebook.com/lunahandmade",
    "instagram": "https://instagram.com/luna_crafts",
    "zalo": "https://zalo.me/0908123456"
  }
  ```
* **Response (`200 OK`):**
  ```json
  {
    "success": true,
    "message": "Đã lưu toàn bộ liên kết mạng xã hội",
    "data": [ ... ]
  }
  ```

---

## 4. PHÂN HỆ SẢN PHẨM & TÁC PHẨM (PRODUCTS - `/api/products`)

### 4.1. Lấy danh sách sản phẩm nổi bật (Public)
* **Endpoint:** `GET /api/products`
* **Response (`200 OK`):**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "dragon-fantasy",
        "title": "Rồng Fantasy",
        "price": "850.000₫",
        "priceDisplay": "850k",
        "badge": "Hot",
        "image": "/assets/images/product-dragon.jpg",
        "description": "Tác phẩm điêu khắc đất sét nung Polymer Clay thủ công nguyên khối..."
      }
    ]
  }
  ```

### 4.2. Thêm sản phẩm mới (Admin Only)
* **Endpoint:** `POST /api/products`
* **Headers:** `Authorization: Bearer <token>`
* **Request Body:**
  ```json
  {
    "title": "Rồng Fantasy Dạ Quang",
    "priceDisplay": "850k",
    "price": "850.000₫",
    "image": "http://localhost:5000/uploads/product-1234.jpg",
    "description": "Tác phẩm nặn tay phát quang ban đêm...",
    "badge": "Hot",
    "category": "Polymer Clay Nghệ Thuật"
  }
  ```
* **Response (`201 Created`):**
  ```json
  {
    "success": true,
    "message": "Đã thêm sản phẩm mới thành công",
    "data": { "id": "prod_1700000000", ... }
  }
  ```

### 4.3. Cập nhật sản phẩm (Admin Only)
* **Endpoint:** `PUT /api/products/:id`
* **Headers:** `Authorization: Bearer <token>`

### 4.4. Xóa sản phẩm (Admin Only)
* **Endpoint:** `DELETE /api/products/:id`
* **Headers:** `Authorization: Bearer <token>`
* **Response (`200 OK`):**
  ```json
  {
    "success": true,
    "message": "Đã xóa sản phẩm thành công"
  }
  ```

---

## 5. PHÂN HỆ TẢI LÊN HÌNH ẢNH (UPLOAD - `/api/upload`)

### 5.1. Tải lên tệp ảnh (Admin Only)
* **Endpoint:** `POST /api/upload`
* **Headers:** `Authorization: Bearer <token>`, `Content-Type: multipart/form-data`
* **Form Field:** `file` (Binary image file)
* **Response (`200 OK`):**
  ```json
  {
    "success": true,
    "message": "Tải lên hình ảnh thành công",
    "data": {
      "fileName": "art-1731900000-8392.jpg",
      "url": "http://localhost:5000/uploads/art-1731900000-8392.jpg",
      "size": 184520,
      "mimeType": "image/jpeg"
    }
  }
  ```
