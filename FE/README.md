# Luna Handmade — Galaxy Nebula Link-in-Bio & Creator Studio (React Mobile-First)

Hệ sinh thái giao diện số dành cho thương hiệu nghệ nhân thủ công **Luna Handmade**:
- **Trang Người Dùng (Mobile-First Storefront):** Đường dẫn `/`
- **Trang Đăng Nhập Quản Trị (Admin Gmail Login):** Đường dẫn `/login`
- **Trang Quản Trị Nghệ Nhân (Admin Portal / Creator Studio):** Đường dẫn `/admin` *(Bảo vệ bởi tài khoản Gmail Admin)*

Được phát triển dựa trên tài liệu [PRD.md](../PRD.md), [DESIGN.md](../DESIGN.md) và thiết kế gốc từ dự án Stitch (ID: `3778243203603223809`, Screen: `df3360eece71429cb503ebd0586ab5fc`).

---

## 🔐 Đăng Nhập Quản Trị Bằng Gmail (`/login`)

- **Đăng nhập Google / Gmail 1 Chạm:** Bấm nút **"Đăng nhập bằng Google / Gmail"** để vào ngay Studio.
- **Đăng nhập qua Gmail & Mật khẩu:** Hỗ trợ nhập địa chỉ Gmail Admin (ví dụ: `admin.luna@gmail.com`). Có sẵn nút *"Điền tài khoản Admin mẫu"* để thử nghiệm nhanh.
- **Bảo Vệ Tuyệt Đối (Protected Route):** Mọi truy cập vào `/admin` khi chưa đăng nhập sẽ tự động chuyển hướng về trang `/login`.
- **Quản lý phiên đăng nhập:** Hiển thị địa chỉ Gmail của admin trên Header và nút **"Đăng xuất"**.

---

## 🌟 Các Phân Hệ Quản Trị Được Chia Rõ Ràng (`/admin`)

Giao diện Studio được chia thành các tab chuyên biệt theo đúng yêu cầu:

1. **🛍️ Tên Shop & Ảnh Đại Diện (Shop & Avatar):**
   - **Sửa Tên Shop:** Tên thương hiệu hiển thị nổi bật trên đầu trang (ví dụ `Luna Handmade`).
   - **Sửa Ảnh Đại Diện (Avatar):** Tải ảnh trực tiếp từ máy tính hoặc dán URL ảnh, có xem trước vòng hào quang phát quang 3 màu loang tinh vân.
   - **Sửa Username/Handle, Lĩnh Vực & Tuyên Ngôn Bio.**
   - Bật/tắt huy hiệu xác minh nghệ nhân (*Verified Badge*).

2. **🔗 Liên Kết Mạng Xã Hội (Link TikTok, YouTube, FB, Zalo...):**
   - **Các trường nhập nhanh trực tiếp:**
     - 🎬 **TikTok:** URL kênh TikTok (`@luna.craft`)
     - 📺 **YouTube:** URL kênh YouTube Studio
     - 📸 **Instagram:** URL profile Instagram (`@luna_crafts`)
     - 👥 **Facebook:** URL Fanpage Facebook
     - 💬 **Zalo:** Số điện thoại / Link Zalo tư vấn 1:1
     - ✈️ **Telegram:** Kênh thông báo VIP
   - **Nút Cửa Hàng Nổi Bật (Hero Storefront CTA):** Sửa tiêu đề, dòng nhắc ưu đãi, hiệu ứng chấm sáng live ping.
   - **Quản lý danh sách liên kết mở rộng:** Thêm nút mới (Shopee, Website riêng...), bật/tắt hiển thị (Show/Hide), đổi thứ tự bằng nút mũi tên ▲/▼.

3. **🎨 Thêm Ảnh Tác Phẩm & Quản Lý Bộ Sưu Tập (Artworks):**
   - Nút nổi bật **"+ Thêm Ảnh Tác Phẩm Mới"**: Mở modal tải ảnh từ máy tính hoặc dán URL ảnh.
   - Đặt tên tác phẩm, chọn danh mục, đặt giá compact (`850k`) và giá đầy đủ (`850.000₫`).
   - Chọn Badge trạng thái dạ quang: *Hot 🔥, New ✨, Mini 🦊, Custom 🎨, Limited 💎*.
   - Nhập mô tả tác phẩm và bảng thông số kỹ thuật (chất liệu, kích thước).
   - Bộ sưu tập dạng lưới trực quan: dễ dàng xem ảnh lớn, sửa thông tin hoặc xóa tác phẩm.

4. **📖 Một Chút Về Mình (About Story):**
   - Chuyên trang biên tập câu chuyện thương hiệu nghệ nhân.
   - Bộ đếm ký tự thời gian thực.
   - **Xem trước trực quan Thẻ Mờ Kính (Glassmorphism Card):** Hiển thị đúng giao diện thẻ mà khách hàng nhìn thấy.
   - Gợi ý sẵn 3 mẫu câu chuyện nghệ nhân để tham khảo và áp dụng nhanh 1 chạm.

5. **⚙️ Sao Lưu & Cài Đặt (Backup & Restore):**
   - Xuất dữ liệu cấu hình ra file `.json` để lưu trữ an toàn.
   - Nạp lại dữ liệu từ file backup.
   - Khôi phục về dữ liệu mẫu gốc ban đầu của Luna Handmade.

---

## 📱 Khung Xem Trước Thời Gian Thực (Live Phone Simulator)

- Trên màn hình Desktop, bên phải luôn có một khung điện thoại iPhone mô phỏng (360x740px).
- Bất kỳ thay đổi nào (sửa tên shop, đổi avatar, sửa link TikTok/YouTube, thêm ảnh tác phẩm, sửa câu chuyện) đều **cập nhật ngay lập tức** trên màn hình điện thoại bên cạnh.

---

## 🚀 Hướng Dẫn Khởi Chạy

```bash
cd FE
npm run dev
```

1. Mở trang người dùng (khách xem): `http://localhost:3000/`
2. Để vào trang quản trị: Nhập trực tiếp đường dẫn `http://localhost:3000/admin` trên thanh địa chỉ trình duyệt.
3. Trang sẽ yêu cầu đăng nhập tại `http://localhost:3000/login` -> Bấm **"Đăng nhập bằng Google / Gmail"** để vào ngay trang quản trị.
