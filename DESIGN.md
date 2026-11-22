web application/stitch/projects/3778243203603223809/screens/f9fa42b809f1407cab46719ca91bb780
# DESIGN.md — Galaxy Nebula Artisan (Luna Handmade)

> **Hệ thống Quy chuẩn Thiết kế (Design System & Guidelines)** được trích xuất và chuẩn hóa trực tiếp từ giao diện **Luna Handmade — Galaxy Nebula Link-in-Bio**.

---

## 1. Triết lý Thiết kế (Design Philosophy)

* **Mystical Cosmic Elegance:** Kết hợp giữa không gian dải ngân hà huyền bí (*nebula, cosmic dust, deep space*) với sự ấm áp, tinh tế và tỉ mỉ của nghệ thuật chế tác thủ công (*artisan & resin craft*).
* **High Contrast & Glowing Aesthetics:** Nền đen vũ trụ sâu thẳm đóng vai trò tương phản cao, làm bệ đỡ cho các dải tinh vân đa sắc màu phát quang tự nhiên mà không gây chói mắt.
* **Compact Pill-Capsule Layout:** Cấu trúc nút bấm dạng viên thuốc bo tròn đối xứng (*pill-shaped*), tối ưu thao tác một tay trên thiết bị di động, hiện đại và tinh gọn.
* **Enchanting Stardust:** Hệ thống sao kim cương 4 cánh (*diamond sparkles*) và bụi sao vi mô rải rác mang lại cảm giác sống động, lung linh và thu hút ánh nhìn.

---

## 2. Bảng Màu & Tokens (Color Tokens)

### 2.1. Nền Không Gian Sâu (Deep Space Foundations)
| Token | Giá trị HEX | Mô tả & Ứng dụng |
| :--- | :--- | :--- |
| `--color-space-black` | `#05050b` | Nền đen sâu thẳm tuyệt đối |
| `--color-space-base` | `#0a0815` | Nền cơ sở toàn trang |
| `--color-surface-card` | `rgba(18, 14, 30, 0.75)` | Nền thẻ glassmorphism mờ |
| `--color-surface-border`| `rgba(255, 255, 255, 0.12)`| Viền kính mỏng tinh tế |

### 2.2. Dải Màu Loang Tinh Vân (Galaxy Nebula Palette)
| Token | Giá trị HEX | Mô tả & Ứng dụng |
| :--- | :--- | :--- |
| `--color-wine-red` | `#72092c` | Đỏ rượu vang sâu (Burgundy Nebula) |
| `--color-crimson-glow` | `#c9184a` | Đỏ hồng dạ quang nổi bật nút & điểm nhấn |
| `--color-nebula-purple` | `#4a0e4e` | Tím thiên hà huyền bí, chuyển tiếp màu |
| `--color-ultraviolet` | `#7b2cbf` | Tím neon quang phổ vũ trụ |
| `--color-cosmic-blue` | `#0d1b4a` | Xanh dương sâu thẳm (Deep Sapphire) |
| `--color-electric-cyan`| `#00b4d8` | Xanh cyan phát sáng điểm hạt tinh tú |

### 2.3. Ánh Sáng Tinh Tú & Chữ (Stardust & Typography)
| Token | Giá trị | Ứng dụng |
| :--- | :--- | :--- |
| `--color-stardust-gold` | `#ffe066` | Sao kim cương lấp lánh & icon nổi bật |
| `--color-stardust-white`| `#ffffff` | Sao lấp lánh, tiêu đề chính |
| `--color-text-primary` | `#f8f9fa` | Nội dung văn bản chính, chữ trên nút |
| `--color-text-secondary`| `rgba(248, 249, 250, 0.72)`| Phụ đề, mô tả tài khoản |
| `--color-text-tertiary` | `rgba(248, 249, 250, 0.45)`| Bản quyền footer, ghi chú nhỏ |

---

## 3. Hệ Thống Gradient & Hiệu Ứng Loang (Gradients & Glows)

### 3.1. Background Nebula Mesh (Loang 3 Tông)
```css
/* Phối màu loang tinh vân vũ trụ */
background: 
  radial-gradient(ellipse at 15% 10%, rgba(168, 18, 66, 0.45) 0%, transparent 55%),
  radial-gradient(ellipse at 85% 15%, rgba(13, 27, 74, 0.55) 0%, transparent 60%),
  radial-gradient(ellipse at 50% 45%, rgba(74, 14, 78, 0.50) 0%, transparent 65%),
  radial-gradient(ellipse at 85% 75%, rgba(114, 9, 44, 0.40) 0%, transparent 55%),
  radial-gradient(ellipse at 20% 85%, rgba(26, 58, 143, 0.45) 0%, transparent 60%),
  #06050e;
```

### 3.2. Hiệu Ứng Phát Sáng Nút CTA (Primary Glowing Pill)
```css
/* Viền sáng loang đa sắc cho Nút Cửa Hàng */
.pill-primary-glow {
  background: linear-gradient(135deg, rgba(201, 24, 74, 0.25), rgba(74, 14, 78, 0.4));
  border: 1.5px solid rgba(255, 77, 109, 0.65);
  box-shadow: 
    0 0 20px rgba(201, 24, 74, 0.45),
    inset 0 0 15px rgba(255, 77, 109, 0.25);
}
```

---

## 4. Typography (Kiểu Chữ)

* **Font Tiêu Đề (Headings / Brand Name):**
  * **Family:** `Playfair Display`, `Cormorant Garamond`, serif
  * **Style:** Bold, thanh lịch, đường nét tinh tế chuẩn thương hiệu thủ công nghệ thuật.
* **Font Nội Dung (Body / UI Elements / Buttons):**
  * **Family:** `Inter`, `Be Vietnam Pro`, `Plus Jakarta Sans`, sans-serif
  * **Style:** Trọng lượng 400 (Regular), 500 (Medium), 600 (Semi-bold), đảm bảo độ tương phản và khả năng đọc cực kỳ sắc nét trên nền tối.

---

## 5. Quy Chuẩn Thành Phần Giao Diện (UI Components)

### 5.1. Avatar Nghệ Nhân (Artisan Halo Avatar)
* **Kích thước:** `w-24 h-24` (96px) hoặc `w-28 h-28`.
* **Hình dạng:** Tròn đối xứng (`rounded-full`).
* **Hiệu ứng:** Vòng hào quang gradient chuyển từ đỏ rượu vang sang tím thiên hà, viền sáng 3px kèm vòng nhẫn tỏa sáng (`box-shadow: 0 0 25px rgba(201, 24, 74, 0.5)`).
* **Huy hiệu bảo chứng:** Huy hiệu xác minh hồng tím dạ quang góc 4-5 giờ.

### 5.2. Thanh Liên Kết Dạng Viên Thuốc (Pill Capsule Buttons)
* **Chiều cao & Bo góc:** `py-3.5 px-5`, `rounded-full`.
* **Nền Kính Tối (Glassmorphism):** `backdrop-blur-md`, nền `rgba(20, 16, 35, 0.65)`, viền sáng mảnh `rgba(255, 255, 255, 0.15)`.
* **Cấu trúc 3 vùng:**
  1. *Trái:* Icon tròn đại diện thương hiệu hoặc dịch vụ (`w-10 h-10`).
  2. *Giữa:* Tên liên kết / Call-to-action (chữ in hoa hoặc viết hoa thanh lịch, căn giữa hoặc căn đều).
  3. *Phải:* Icon điều hướng 3 chấm (`more_vert`) hoặc mũi tên chỉ đường (`chevron_right`).

### 5.3. Khối Sản Phẩm Tiêu Biểu (Compact Showcase Cards)
* **Bố cục:** Hàng ngang 3 cột compact trên thiết bị di động.
* **Thẻ hình:** Tỉ lệ vuông `1:1`, góc bo mềm mại `rounded-2xl`, viền phát quang theo màu sản phẩm (Đỏ, Xanh ngọc, Tím pastel).
* **Badge trạng thái:** Tag bo tròn nhỏ gọn (`Hot`, `New`, `Mini`) góc trên ảnh.
* **Giá bán:** Sắc màu dạ quang tương phản cao (`#ff4d6d`, `#00e5ff`, `#e0aaff`).

### 5.4. Hệ Thống Sao Kim Cương (Bling Bling Starfield)
* **Biểu tượng:** Ngôi sao 4 cánh đối xứng (Diamond Sparkle SVG).
* **Phân bố:** 4–6 ngôi sao lớn xung quanh avatar và rải đều trên không gian nền.
* **Hiệu ứng động:** Nhịp thở lấp lánh nhẹ nhàng (`animation: pulse 2.5s ease-in-out infinite`).
