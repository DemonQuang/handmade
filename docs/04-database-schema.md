# 04. THIẾT KẾ MÔ HÌNH DỮ LIỆU (DATABASE SCHEMA)
## Dự Án: Luna Handmade — Galaxy Nebula Architecture

---

## 1. SƠ ĐỒ THỰC THỂ QUAN HỆ (ENTITY RELATIONSHIP DIAGRAM)

```mermaid
erDiagram
    ADMIN_USER {
        string id PK "Định danh quản trị viên"
        string email UK "Địa chỉ Gmail Admin"
        string passwordHash "Mật khẩu mã hóa bcrypt"
        string displayName "Tên hiển thị"
        string role "ADMIN"
        datetime createdAt "Thời gian tạo"
        datetime lastLogin "Lần đăng nhập cuối"
    }

    SHOP_PROFILE {
        string id PK "Định danh profile (duy nhất)"
        string name "Tên thương hiệu shop (Luna Handmade)"
        string handle "Username (@luna.handmade)"
        string field "Lĩnh vực chế tác"
        string avatar "URL hoặc file ảnh đại diện"
        boolean verified "Huy hiệu xác minh nghệ nhân"
        string bio "Tuyên ngôn sáng tạo ngắn"
        string aboutStory "Câu chuyện Một chút về mình"
        string contactPhone "Số điện thoại hotline"
        string contactZalo "Link Zalo chat 1:1"
        string location "Địa chỉ / phạm vi giao hàng"
        string platformBadge "Made with Craftfolio ✨"
        string copyright "Thông tin bản quyền"
        datetime updatedAt "Lần cập nhật cuối"
    }

    SOCIAL_LINK {
        string id PK "Mã liên kết (tiktok, fb, ig, custom)"
        boolean isHero "Đánh dấu nút chính Storefront"
        string title "Tiêu đề hiển thị trên nút"
        string subtitle "Dòng phụ chú"
        string url "Đường dẫn đích (URL)"
        string icon "Tên biểu tượng Material Symbols"
        string iconColor "Mã màu icon"
        string iconBorder "Mã viền icon"
        string gradientBorder "Hiệu ứng viền chuyển màu loang"
        string shadow "Bóng đổ phát quang"
        boolean badgePing "Chấm sáng nhấp nháy"
        boolean enabled "Bật / Tắt hiển thị"
        int order "Thứ tự sắp xếp hiển thị"
    }

    PRODUCT {
        string id PK "Mã tác phẩm (UUID / Timestamp)"
        string title "Tên tác phẩm (Rồng Fantasy, Đèn Resin)"
        string price "Mức giá đầy đủ (850.000₫)"
        string priceDisplay "Mức giá compact (850k)"
        int rawPrice "Giá số nguyên phục vụ lọc (850000)"
        string badge "Huy hiệu (Hot, New, Mini, Custom)"
        string badgeGradient "Gradient của badge"
        string image "Đường dẫn ảnh chụp tác phẩm"
        string alt "Mô tả ảnh"
        string cardBorder "Viền phát quang hover"
        string glowShadow "Bóng đổ neon khi rê chuột"
        string priceColor "Màu chữ neon giá bán"
        string category "Danh mục (Polymer Clay, Resin)"
        string stock "Trạng thái kho (Còn 2 chiếc, Nhận order)"
        string description "Mô tả chi tiết tác phẩm"
        json specifications "Mảng thông số: [{label, value}]"
        datetime createdAt "Thời gian tạo"
    }

    SHOP_PROFILE ||--o{ SOCIAL_LINK : "sở hữu"
    SHOP_PROFILE ||--o{ PRODUCT : "trưng bày"
```

---

## 2. CHI TIẾT CÁC BẢNG DỮ LIỆU

### 2.1. Bảng `SHOP_PROFILE` (Thông tin Cửa hàng)
| Trường (Field) | Kiểu Dữ Liệu | Ràng Buộc | Mô Tả |
| :--- | :--- | :--- | :--- |
| `id` | `VARCHAR(36)` | `PRIMARY KEY` | Khóa chính |
| `name` | `VARCHAR(100)` | `NOT NULL` | Tên Shop ("Luna Handmade") |
| `handle` | `VARCHAR(50)` | `NOT NULL` | Tên người dùng ("@luna.handmade") |
| `field` | `VARCHAR(100)` | `NULLABLE` | Lĩnh vực ("Nghệ thuật thủ công & Resin") |
| `avatar` | `TEXT` | `NOT NULL` | Đường dẫn ảnh đại diện hoặc base64 |
| `verified` | `BOOLEAN` | `DEFAULT TRUE` | Trạng thái tích xanh xác minh |
| `bio` | `TEXT` | `NULLABLE` | Khẩu hiệu ngắn dưới tên shop |
| `aboutStory` | `TEXT` | `NULLABLE` | Đoạn văn "Một chút về mình" |
| `contactPhone` | `VARCHAR(20)`| `NULLABLE` | Hotline tư vấn |
| `contactZalo` | `TEXT` | `NULLABLE` | Link nhắn tin Zalo |
| `location` | `VARCHAR(150)`| `NULLABLE` | Khu vực hoạt động |

### 2.2. Bảng `SOCIAL_LINK` (Liên kết Mạng xã hội)
| Trường | Kiểu | Ràng Buộc | Mô Tả |
| :--- | :--- | :--- | :--- |
| `id` | `VARCHAR(50)` | `PRIMARY KEY` | Mã định danh (`tiktok`, `youtube`, ...) |
| `isHero` | `BOOLEAN` | `DEFAULT FALSE`| Nút Storefront nổi bật trên cùng |
| `title` | `VARCHAR(100)` | `NOT NULL` | Tên nút hiển thị |
| `subtitle` | `VARCHAR(150)` | `NULLABLE` | Dòng mô tả nhỏ bên dưới |
| `url` | `TEXT` | `NOT NULL` | Đường dẫn đích đến |
| `icon` | `VARCHAR(50)` | `NOT NULL` | Tên icon Material Symbols |
| `enabled` | `BOOLEAN` | `DEFAULT TRUE` | Có hiển thị trên trang khách hay không |
| `order` | `INT` | `DEFAULT 0` | Số thứ tự sắp xếp |

### 2.3. Bảng `PRODUCT` (Danh mục Tác phẩm)
| Trường | Kiểu | Ràng Buộc | Mô Tả |
| :--- | :--- | :--- | :--- |
| `id` | `VARCHAR(50)` | `PRIMARY KEY` | Mã sản phẩm duy nhất |
| `title` | `VARCHAR(150)` | `NOT NULL` | Tên tác phẩm thủ công |
| `priceDisplay` | `VARCHAR(30)` | `NOT NULL` | Giá hiển thị ngắn gọn (`850k`) |
| `price` | `VARCHAR(50)` | `NULLABLE` | Giá đầy đủ (`850.000₫`) |
| `badge` | `VARCHAR(20)` | `DEFAULT 'New'`| Tag trạng thái (*Hot, New, Mini, Custom*) |
| `image` | `TEXT` | `NOT NULL` | Đường dẫn hình ảnh chất lượng cao |
| `category` | `VARCHAR(50)` | `NULLABLE` | Phân loại thể loại nghệ thuật |
| `stock` | `VARCHAR(50)` | `NULLABLE` | Tình trạng còn hàng / số lượng |
| `description` | `TEXT` | `NULLABLE` | Mô tả quy trình chế tác |
| `specifications`| `JSON` | `NULLABLE` | Mảng thông số `[{ label, value }]` |
