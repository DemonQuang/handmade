# 02. ĐẶC TẢ YÊU CẦU CHỨC NĂNG CHI TIẾT (FUNCTIONAL SPECIFICATIONS)
## Dự Án: Luna Handmade — Galaxy Nebula Storefront Platform

---

## 1. DANH MỤC CÁC CHỨC NĂNG HỆ THỐNG

| Mã CN | Tên Chức Năng | Phân Hệ | Mục Tiêu & Mô Tả Tóm Tắt |
| :--- | :--- | :--- | :--- |
| **FR-CLIENT-01** | Hiển thị Trang Bio Di Động | Người dùng | Bố cục Mobile-First với nền Galaxy 6 vùng loang và bụi sao lấp lánh |
| **FR-CLIENT-02** | Avatar Hào Quang Phát Sáng | Người dùng | Vòng hào quang 3 màu loang, chòm sao 4 cánh và huy hiệu xác minh |
| **FR-CLIENT-03** | Khối Nút Liên Kết Dạng Viên Thuốc | Người dùng | Nút Storefront nổi bật có đèn ping nhấp nháy + Nút mạng xã hội |
| **FR-CLIENT-04** | Lưới Sản Phẩm Tiêu Biểu Compact | Người dùng | Bố cục 3 cột tỉ lệ 1:1, badge dạ quang và nhãn giá neon |
| **FR-CLIENT-05** | Modal Chi Tiết Tác Phẩm & Đặt Hàng | Người dùng | Drawer xem ảnh lớn, quy trình chế tác, thông số và nút chốt đơn Zalo |
| **FR-CLIENT-06** | Thẻ Câu Chuyện "Một Chút Về Mình" | Người dùng | Khối mờ kính glassmorphism chia sẻ tâm huyết nghệ nhân |
| **FR-CLIENT-07** | Chia Sẻ & Sao Chép Liên Kết | Người dùng | Web Share API hoặc sao chép link trang kèm Toast thông báo |
| **FR-AUTH-01** | Đăng Nhập Gmail Admin | Quản trị | Xác thực quyền quản trị bằng tài khoản Google / Gmail |
| **FR-AUTH-02** | Bảo Vệ Tuyến Đường (Route Guard) | Quản trị | Chặn truy cập trái phép vào `/admin` khi chưa đăng nhập |
| **FR-AUTH-03** | Đăng Xuất Quản Trị | Quản trị | Hủy phiên làm việc và xóa token bảo mật |
| **FR-ADMIN-01** | Quản Lý Thông Tin Shop & Avatar | Quản trị | Chỉnh sửa Tên shop, Username, Lĩnh vực, Slogan Bio và Tải ảnh avatar |
| **FR-ADMIN-02** | Quản Lý Câu Chuyện "Một Chút Về Mình"| Quản trị | Soạn thảo văn bản giới thiệu, đếm ký tự và xem trước thẻ mờ kính |
| **FR-ADMIN-03** | Quản Lý Link TikTok, YouTube, MXH | Quản trị | Nhập link trực tiếp TikTok, YouTube, FB, IG, Zalo + Cài đặt nút Storefront |
| **FR-ADMIN-04** | Thêm Ảnh Tác Phẩm & Mô Tả Mới | Quản trị | Đăng ảnh sản phẩm mới, nhập giá, chọn badge, viết mô tả và thông số |
| **FR-ADMIN-05** | Chỉnh Sửa & Xóa Tác Phẩm Hiện Có | Quản trị | Thay đổi thông tin, hình ảnh hoặc xóa bỏ sản phẩm khỏi danh mục |
| **FR-ADMIN-06** | Bố Cục Quản Trị Laptop-First | Quản trị | Sidebar bên trái + Vùng làm việc rộng rãi bên phải cho màn hình máy tính |
| **FR-ADMIN-07** | Sao Lưu & Xuất/Nhập JSON | Quản trị | Tải về file cấu hình `.json`, nạp backup hoặc khôi phục dữ liệu ban đầu |

---

## 2. ĐẶC TẢ CHI TIẾT TỪNG CHỨC NĂNG

### FR-AUTH-01: Đăng Nhập Gmail Admin
* **Mô tả:** Cho phép quản trị viên đăng nhập vào hệ thống quản lý bằng tài khoản Gmail.
* **Đầu vào (Input):**
  - Cách 1 (Google 1-Chạm): Bấm nút "Đăng nhập bằng Google / Gmail".
  - Cách 2 (Email & Password): Địa chỉ Gmail (`email`) và Mật khẩu (`password`).
* **Quy tắc kiểm tra (Validation):**
  - `email`: Bắt buộc, đúng định dạng email (phải chứa ký tự `@` và domain hợp lệ, ví dụ `admin.luna@gmail.com`).
  - `password`: Bắt buộc, tối thiểu 6 ký tự.
* **Xử lý hệ thống:**
  - Kiểm tra thông tin đăng nhập tại Backend.
  - Tạo phiên làm việc (Session/JWT Token) chứa thông tin `email`, `role: ADMIN`.
  - Lưu token an toàn vào trình duyệt và chuyển hướng đến trang `/admin`.
* **Đầu ra (Output):** Thông báo đăng nhập thành công, chuyển hướng đến trang quản trị.
* **Ngoại lệ (Exceptions):** Nếu sai email hoặc mật khẩu, hiển thị lỗi đỏ trực quan dưới form.

---

### FR-ADMIN-01: Chỉnh Sửa Tên Shop & Ảnh Đại Diện
* **Mô tả:** Cập nhật các thông tin định danh cốt lõi của cửa hàng thủ công.
* **Đầu vào (Input):**
  - Tên cửa hàng (`name`): Chuỗi ký tự (VD: "Luna Handmade").
  - Username (`handle`): Chuỗi ký tự (VD: "@luna.handmade").
  - Lĩnh vực (`field`): Chuỗi ký tự (VD: "Nghệ thuật thủ công & Resin").
  - Ảnh đại diện (`avatar`): URL ảnh hoặc File ảnh chọn từ máy tính.
  - Tuyên ngôn Bio (`bio`): Chuỗi ký tự ngắn.
  - Số điện thoại / Zalo (`contactPhone`).
* **Quy tắc xử lý:**
  - Nếu người dùng tải file từ máy tính: Trình duyệt chuyển đổi qua Base64 DataURL hoặc gửi multipart/form-data lên Backend Endpoint `/api/upload` để lấy URL lưu trữ.
  - Hiển thị ngay ảnh tròn với vòng hào quang phát sáng 3 màu bên cạnh để xem trước.
  - Khi bấm nút **"Lưu Toàn Bộ Thông Tin Shop"**, gửi request cập nhật lên Backend `/api/profile`.
* **Đầu ra:** Toast thông báo *"Đã lưu thông tin Shop & Giới thiệu thành công! ✨"*.

---

### FR-ADMIN-03: Chỉnh Sửa Liên Kết Mạng Xã Hội (TikTok, YouTube, FB, IG, Zalo)
* **Mô tả:** Cung cấp các ô nhập nhanh trực diện cho 5 kênh truyền thông trọng yếu của nghệ nhân.
* **Đầu vào:**
  - `tiktok`: URL kênh TikTok (VD: `https://tiktok.com/@luna.craft`).
  - `youtube`: URL kênh YouTube (VD: `https://youtube.com/@lunahandmade`).
  - `instagram`: URL Instagram (VD: `https://instagram.com/luna_crafts`).
  - `facebook`: URL Fanpage (VD: `https://facebook.com/lunahandmade`).
  - `zalo`: Link Zalo hoặc số điện thoại tư vấn (VD: `https://zalo.me/0908123456`).
* **Quy tắc xử lý:**
  - Nếu ô URL có giá trị: Tự động bật hiển thị nút trên trang Bio với biểu tượng chuẩn và màu sắc gradient tương ứng.
  - Nếu ô URL để trống: Nút của kênh đó tự động ẩn khỏi trang khách hàng.
  - Hỗ trợ lưu trữ bền vững vào cơ sở dữ liệu qua endpoint `/api/links`.
* **Đầu ra:** Toast thông báo *"Đã lưu toàn bộ liên kết mạng xã hội thành công! ✨"*.

---

### FR-ADMIN-04: Thêm Ảnh Sản Phẩm & Mô Tả Mới
* **Mô tả:** Đăng tải một tác phẩm thủ công mới lên danh mục sản phẩm nổi bật.
* **Đầu vào:**
  - Tên sản phẩm (`title`): Chuỗi ký tự (VD: "Rồng Fantasy Dạ Quang").
  - Giá hiển thị (`priceDisplay`): Chuỗi ký tự (VD: "850k" hoặc "850.000₫").
  - Ảnh sản phẩm (`image`): URL ảnh hoặc file ảnh tải lên từ máy tính.
  - Mô tả sản phẩm (`description`): Nội dung chi tiết về chất liệu và kỹ thuật chế tác.
* **Quy tắc xử lý:**
  - Kiểm tra tên và giá không được để trống.
  - Gán ID duy nhất (`prod_${Date.now()}`).
  - Tự động gán cấu hình thẩm mỹ mặc định (viền phát quang dạ quang, bóng đổ glow).
  - Thêm sản phẩm lên đầu danh sách sản phẩm nổi bật.
* **Đầu ra:** Sản phẩm mới xuất hiện ngay trên danh sách và có mặt ngay trên lưới sản phẩm của khách hàng.

---

### FR-CLIENT-05: Drawer Chi Tiết Tác Phẩm & Đặt Mua Qua Zalo
* **Mô tả:** Khi khách hàng bấm vào một thẻ sản phẩm trên trang di động, hệ thống hiển thị Drawer vuốt từ đáy màn hình.
* **Dữ liệu hiển thị:**
  - Ảnh chụp chất lượng cao của tác phẩm.
  - Tên tác phẩm, nhãn badge phát quang, danh mục chế tác.
  - Mức giá dạ quang tương phản cao và tình trạng số lượng trong kho.
  - Đoạn mô tả chi tiết quy trình nặn đất sét hoặc đổ resin.
  - Bảng thông số kích thước, chất liệu và quy cách đóng gói hộp quà.
* **Hành động (Action):**
  - Nút **"Đặt Mua Trực Tiếp (Zalo 1:1)"**: Mở ứng dụng Zalo với URL định dạng:
    `https://zalo.me/{contactPhone}?text={Nội dung yêu cầu đặt tác phẩm + Giá}`
  - Nút "Tiếp tục xem trang cá nhân" để đóng Drawer.
