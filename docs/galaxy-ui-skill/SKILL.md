---
name: galaxy-nebula-artisan-ui
description: Quy chuẩn thiết kế giao diện Galaxy Nebula Artisan (Nghệ nhân Vũ trụ & Thủ công độc bản) cho Mobile-First Link-in-Bio và Laptop Admin Studio. Tái sử dụng bảng màu loang tinh vân, vòng hào quang halo, nút dạng viên thuốc pill-capsule, lưới tác phẩm 3 cột và sao kim cương lấp lánh.
---

# Galaxy Nebula Artisan — UI Design System & Component Guidelines

Skill này cung cấp toàn bộ quy tắc, tokens thiết kế và các mẫu component chuẩn được chuẩn hóa từ giao diện **Luna Handmade — Galaxy Nebula Link-in-Bio & Creator Studio**. Kích hoạt skill này mỗi khi thiết kế hoặc mở rộng giao diện web thủ công nghệ thuật, storefront nghệ nhân, link-in-bio phát quang hoặc trang quản trị creator studio.

---

## 1. Triết Lý Thiết Kế Cốt Lõi (Core Philosophy)

* **Mystical Cosmic Elegance:** Kết hợp không gian vũ trụ sâu thẳm (*Deep Space*) với sự ấm áp, tinh tế và tỉ mỉ của nghệ thuật thủ công (*Polymer Clay & Epoxy Resin Craft*).
* **High Contrast Glowing Mesh:** Nền đen tuyệt đối (`#05050b`) làm bệ đỡ cho 6 dải tinh vân đa sắc phát quang tự nhiên mà không gây chói mắt (Đỏ rượu vang, Tím thiên hà, Xanh sapphire, Xanh neon).
* **Pill-Capsule Compact Layout:** Nút bấm bo tròn đối xứng dạng viên thuốc (`rounded-full`), lớp kính tối mờ glassmorphism (`backdrop-blur-xl`), tối ưu thao tác một tay trên di động.
* **Bling Bling Diamond Stardust:** Hệ thống chòm sao kim cương 4 cánh đối xứng (Diamond Sparkles SVG) và bụi sao vi mô chuyển động nhịp thở sống động.
* **Laptop-First Admin Dashboard:** Bảng điều khiển quản trị chia tách rõ ràng: Sidebar bên trái + Vùng làm việc rộng rãi bên phải, bố cục trực quan, dễ thao tác.

---

## 2. Bảng Màu & Design Tokens (Color Tokens)

### 2.1. Nền Không Gian Sâu (Deep Space Base)
```css
--color-space-black:   #05050b; /* Nền đen sâu thẳm toàn trang */
--color-space-dark:    #0c0717; /* Nền sidebar và header */
--color-surface-card:  rgba(14, 7, 28, 0.90); /* Nền thẻ glassmorphism */
--color-surface-border: rgba(255, 255, 255, 0.12); /* Viền kính tinh tế */
```

### 2.2. Dải Màu Loang Tinh Vân Vũ Trụ (Galaxy Nebula Palette)
```css
--color-wine-red:       #72092c; /* Đỏ rượu vang sâu (Burgundy) */
--color-crimson-glow:   #c9184a; /* Đỏ hồng dạ quang nổi bật */
--color-crimson-bright: #ff4d6d; /* Đỏ neon điểm nhấn rực rỡ */
--color-nebula-purple:  #4a0e4e; /* Tím thiên hà huyền bí */
--color-ultraviolet:    #7209b7; /* Tím neon quang phổ */
--color-cosmic-blue:    #0077b6; /* Xanh dương đại dương sâu thẳm */
--color-electric-cyan:  #00b4d8; /* Xanh cyan tinh tú phát sáng */
--color-stardust-gold:  #ffe066; /* Vàng kim tinh tú lấp lánh */
```

### 2.3. Quy Chuẩn Kiểu Chữ (Typography)
* **Tiêu đề thương hiệu (Brand Headings):** Font Serif thanh lịch `Playfair Display`, `Cormorant Garamond`, serif. Style: Bold, sang trọng, mang nét chế tác thủ công cao cấp.
* **Nội dung & Nút bấm (Body & UI Buttons):** Font Sans-serif hiện đại `Plus Jakarta Sans`, `Inter`, `Be Vietnam Pro`, sans-serif. Trọng số 400 (Regular), 600 (Semi-bold), 700 (Bold).

---

## 3. Quy Chuẩn Thành Phần Giao Diện (Components Standards)

### 3.1. Hào Quang Nghệ Nhân (Halo Avatar)
* **Kích thước:** `w-24 h-24` (96px) trên Mobile; `w-28 h-28` (112px) trên Laptop.
* **Cấu trúc 3 lớp:**
  1. *Lớp ngoài cùng:* Vòng tỏa sáng phát quang 3 màu loang chuyển tiếp (`from-[#ff4d6d] via-[#7209b7] to-[#00b4d8]`, blur-xl, shadow phát sáng mạnh).
  2. *Lớp giữa:* Khung viền gradient tròn 2.5px bảo vệ ảnh.
  3. *Huy hiệu bảo chứng:* Nằm tại góc 5 giờ, nền gradient đỏ-tím kèm biểu tượng `verified` màu trắng và viền ngoài màu nền `#05050b`.
* **Sao vệ tinh:** 3-4 ngôi sao kim cương 4 cánh SVG xoay quanh avatar với nhịp thở lệch pha (`animation: pulse`).

### 3.2. Nút Liên Kết Dạng Viên Thuốc (Pill-Capsule Buttons)
* **Chiều cao & Bo góc:** `h-[62px]` đối với nút thường, `h-[68px]` đối với nút Hero Storefront; `rounded-full`.
* **Nền Kính Tối (Glassmorphism):** Nền `rgba(11, 7, 22, 0.90)`, `backdrop-blur-xl`, viền sáng mảnh chuyển màu gradient loang.
* **Cấu trúc 3 vùng:**
  1. *Trái:* Icon tròn đại diện thương hiệu hoặc dịch vụ (`w-11 h-11 rounded-full`).
  2. *Giữa:* Tiêu đề liên kết (`text-[14px] font-semibold text-white truncate block`).
  3. *Phải:* Icon điều hướng 3 chấm (`more_vert`) hoặc mũi tên chỉ đường (`chevron_right`).
* **Hiệu ứng Hero Storefront CTA:**
  ```css
  /* Nút Cửa Hàng Nổi Bật Đầu Trang */
  background: linear-gradient(to right, #ff4d6d, #7209b7, #0077b6, #00b4d8);
  box-shadow: 0 4px 30px rgba(201, 24, 74, 0.5), 0 0 30px rgba(0, 119, 182, 0.4);
  ```

### 3.3. Lưới Sản Phẩm Tiêu Biểu Compact (Compact Showcase)
* **Bố cục di động:** Hàng ngang 3 cột compact (`grid grid-cols-3 gap-2.5`).
* **Thẻ hình:** Tỉ lệ vuông `1:1`, góc bo mềm mại `rounded-2xl`, nền mờ kính `#0d0718/90`.
* **Hệ thống Badge Dạ Quang:**
  - `Hot`: Gradient Đỏ rượu - Tím (`from-[#c9184a] to-[#7209b7]`).
  - `New`: Gradient Xanh dương - Cyan (`from-[#0077b6] to-[#00b4d8]`).
  - `Mini`: Gradient Tím neon - Hồng (`from-[#7209b7] to-[#b5179e]`).
  - `Custom`: Gradient Vàng kim - Cam (`from-[#eab308] to-[#f97316]`).
* **Giá bán:** Màu chữ dạ quang tương phản cao đi kèm hiệu ứng đổ bóng phát quang (`drop-shadow(0 0 6px currentColor)`).

### 3.4. Khung Mờ Kính "Một Chút Về Mình" (About Story Card)
* **Bố cục:** Thẻ bo góc mềm mại `rounded-2xl`, viền mảnh `border-white/10`, nền `rgba(13, 7, 24, 0.85)`.
* **Biểu tượng tiêu đề:** Biểu tượng `auto_awesome` màu đỏ dạ quang `#ff4d6d` phát sáng.

### 3.5. Bố Cục Quản Trị Laptop-First (Laptop Admin Dashboard)
* **Sidebar cố định bên trái (`w-64` hoặc `w-72`):**
  - Logo và tên cửa hàng có viền phát quang.
  - Các nút chuyển mục lớn: *Tên Shop & Avatar*, *Link Mạng Xã Hội*, *Sản Phẩm & Mô Tả*.
  - Khối định danh Gmail Admin và nút Đăng xuất an toàn.
* **Vùng làm việc bên phải (Spacious Canvas):**
  - Tối đa `max-w-5xl`, hiển thị các khối thẻ cài đặt rộng rãi, các ô nhập liệu rõ ràng, nút "Lưu" to có hiệu ứng gradient phát quang nổi bật.

---

## 4. Đoạn Mã Mẫu (Reusable Code Snippets)

### 4.1. Mã Nền 6 Vùng Tinh Vân (CSS Nebula Mesh)
```jsx
export const CosmicBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#05050b]">
    {/* Swirling Nebula 1: Wine Red */}
    <div className="absolute -top-32 -left-24 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-[#ff4d6d]/70 via-[#c9184a]/60 to-[#800f2f]/50 blur-[75px] mix-blend-screen opacity-90 animate-pulse" />
    {/* Swirling Nebula 2: Sapphire & Cyan */}
    <div className="absolute top-10 -right-28 w-[460px] h-[490px] rounded-full bg-gradient-to-bl from-[#00b4d8]/65 via-[#0077b6]/75 to-[#0b1354]/85 blur-[75px] mix-blend-screen opacity-90" />
    {/* Swirling Nebula 3: Galaxy Purple */}
    <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-gradient-to-r from-[#7209b7]/75 via-[#b5179e]/60 to-[#3a0ca3]/75 blur-[80px] mix-blend-screen opacity-85" />
    {/* Swirling Nebula 4: Crimson Mid Section */}
    <div className="absolute top-[44%] -left-28 w-[450px] h-[460px] rounded-full bg-gradient-to-tr from-[#a4133c]/70 via-[#800f2f]/65 to-[#3a0ca3]/60 blur-[80px] mix-blend-screen opacity-80" />
    {/* Swirling Nebula 5: Electric Blue Lower Section */}
    <div className="absolute top-[60%] -right-24 w-[480px] h-[480px] rounded-full bg-gradient-to-tl from-[#0077b6]/70 via-[#560bad]/70 to-[#0b1354]/80 blur-[85px] mix-blend-screen opacity-85" />
    {/* Swirling Nebula 6: Bottom Galaxy Cauldron */}
    <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[520px] h-[480px] rounded-full bg-gradient-to-t from-[#c9184a]/60 via-[#7209b7]/65 to-[#0077b6]/55 blur-[80px] mix-blend-screen opacity-90" />
  </div>
);
```

### 4.2. Mã Chòm Sao Kim Cương 4 Cánh (Diamond Sparkle SVG)
```jsx
export const DiamondStar = ({ size = 20, fill = "#fff5f7", glow = "#ff4d6d" }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <path
      d="M10 0 Q10 10 0 10 Q10 10 10 20 Q10 10 20 10 Q10 10 10 0 Z"
      fill={fill}
      filter={`drop-shadow(0 0 6px ${glow}) drop-shadow(0 0 12px ${glow})`}
    />
  </svg>
);
```
