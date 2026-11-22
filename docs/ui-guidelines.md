# Hướng Dẫn Áp Dụng Quy Chuẩn UI — Galaxy Nebula Artisan

Tài liệu hướng dẫn lập trình viên phát triển thêm các màn hình và component mới cho dự án **Luna Handmade** hoặc các dự án storefront nghệ nhân tương tự.

---

## 1. Danh Sách Các File Quy Chuẩn
* **Skill định nghĩa tự động:** [`galaxy-ui-skill/SKILL.md`](./galaxy-ui-skill/SKILL.md)
* **Quy chuẩn thiết kế gốc:** [`../DESIGN.md`](../DESIGN.md)
* **Tài liệu sản phẩm:** [`../PRD.md`](../PRD.md)

---

## 2. Checklist Khi Tạo Mới Component

1. [ ] **Màu nền:** Sử dụng nền đen không gian sâu `#05050b` hoặc thẻ mờ kính `bg-[#0e071c]/90` kèm `backdrop-blur-xl`.
2. [ ] **Viền thẻ:** Dùng viền bán trong suốt `border border-white/10` hoặc `border-white/15`.
3. [ ] **Hiệu ứng rê chuột (Hover):** Bo góc mềm `rounded-2xl` hoặc `rounded-full`, đổ bóng phát quang theo mã màu phù hợp:
   - Màu Đỏ rượu: `hover:shadow-[0_0_22px_rgba(201,24,74,0.45)]`
   - Màu Tím neon: `hover:shadow-[0_0_22px_rgba(114,9,183,0.45)]`
   - Màu Xanh đại dương: `hover:shadow-[0_0_22px_rgba(0,180,216,0.45)]`
4. [ ] **Kiểu chữ:**
   - Tiêu đề thương hiệu: Class `font-serif` (Playfair Display)
   - Tiêu đề phụ & nút bấm: Class `font-sans font-bold` (Plus Jakarta Sans)
5. [ ] **Khả năng tương thích:**
   - Với trang khách hàng: Cố định độ rộng tối đa `max-w-[420px]` căn giữa màn hình.
   - Với trang quản trị: Bố cục màn hình laptop mở rộng với Sidebar bên trái (`w-64` / `w-72`) và Canvas làm việc bên phải (`max-w-5xl`).
