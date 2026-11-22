PRD (Product Requirements Document) — Luna Handmade: Galaxy Nebula Link-in-Bio & Artisan Storefront



1. TỔNG QUAN DỰ ÁN (PROJECT OVERVIEW)

1.1. Bối cảnh & Vấn đề (Context & Problem Statement)





Bối cảnh: Các nghệ nhân sáng tạo nội dung và nghệ nhân thủ công (như đất sét nung Polymer Clay, Resin nghệ thuật) cần một kênh định danh số (Link-in-Bio / Personal Portal) để tập trung toàn bộ liên kết mạng xã hội (TikTok, Instagram, Telegram, Facebook, Zalo) và thúc đẩy đơn hàng trực tiếp.



Vấn đề: Các nền tảng Link-in-Bio phổ thông hiện nay thường đơn điệu, thiếu chiều sâu nghệ thuật và không thể hiện được cá tính độc bản của thương hiệu handmade. Khách hàng bấm vào liên kết thường gặp rào cản chuyển đổi khi muốn mua sắm nhanh các tác phẩm độc bản (one-of-a-kind).

1.2. Mục tiêu Sản phẩm (Product Goals & Objectives)





Tăng tỷ lệ tương tác & chuyển đổi: Đưa khách hàng từ mạng xã hội sang cửa hàng thủ công hoặc cổng tư vấn 1:1 với trải nghiệm trực quan, mượt mà trên thiết bị di động (Mobile-First).



Khắc họa dấu ấn nghệ nhân độc bản: Tái hiện ngôn ngữ thiết kế Galaxy Nebula Dark — kết hợp không gian vũ trụ huyền bí, dải màu loang tinh vân đỏ rượu vang - tím - xanh dương và hiệu ứng lấp lánh (bling bling) để nâng tầm giá trị thương hiệu.



Tích hợp liền mạch hệ sinh thái bán hàng: Kết nối trực tiếp danh mục sản phẩm nổi bật, cổng thanh toán/đặt hàng (Craftfolio Artisan Commerce), và các kênh hỗ trợ khách hàng đa nền tảng.

1.3. Chỉ số Đo lường Thành công (Key Success Metrics / KPIs)





Chỉ số

Mục tiêu (Target)

Phương pháp đo lường



CTR vào Cửa hàng (Primary CTA CTR)

≥ 35%

Lượng click vào nút "CỬA HÀNG THỦ CÔNG LUNA" / Tổng lượt truy cập



Tỷ lệ Thoát trang (Bounce Rate)

< 25%

Khách tương tác với ít nhất 1 liên kết hoặc danh mục sản phẩm



Thời gian trên trang (Time on Page)

> 45 giây

Trải nghiệm khám phá các tác phẩm nổi bật và câu chuyện nghệ nhân



Tốc độ tải trang di động (Mobile LCP)

< 1.8 giây

Tối ưu hóa WebGL / CSS radial-gradient mesh & tài nguyên đồ họa



2. CHÂN DUNG NGƯỜI DÙNG & HÀNH TRÌNH (USER PERSONAS & JOURNEY)

2.1. Đối tượng Người dùng Mục tiêu (Target Personas)





Khách hàng tiềm năng (Art & Craft Enthusiasts):





Tuổi: 18 – 35.



Sở thích: Sưu tầm mô hình fantasy, trang sức/decor resin nghệ thuật độc bản, quà tặng cá nhân hóa.



Nhu cầu: Xem nhanh các liên kết chính thức, bấm vào xem sản phẩm hot, nhắn tin tư vấn trực tiếp 1:1 nhanh chóng không qua trung gian phức tạp.



Nghệ nhân sáng tạo — Luna (Content Creator & Artisan):





Nhu cầu: Một trang cá nhân đại diện đồng bộ nhận diện thương hiệu, dễ dàng chia sẻ trên profile TikTok, Instagram, Youtube. Tối ưu bán hàng không phụ thuộc hoàn toàn vào sàn TMĐT trung gian.

2.2. Luồng Trải nghiệm Người dùng (User Flow)

[User lướt TikTok/Instagram của Luna]
          │
          ▼ Click link trên Bio
[Luna Handmade — Galaxy Nebula Link-in-Bio Screen]
          │
  ┌───────┼────────────────────────────────────────┐
  ▼       ▼                                        ▼
[Khám phá Profile &     [Bấm Nút Chính CTA:      [Xem Sản Phẩm Nổi Bật:
 Chòm sao lấp lánh]      Cửa Hàng Thủ Công Luna]   Rồng Fantasy / Đèn Resin]
          │                       │                        │
          │                       ▼                        ▼
[Chọn MXH: Insta/FB/    [Cửa Hàng Craftfolio —   [Trang Chi Tiết Sản Phẩm &
 Zalo tư vấn 1:1]        Danh Mục & Giỏ Hàng]     Đặt Hàng Theo Yêu Cầu]



3. TÍNH NĂNG VÀ YÊU CẦU CHỨC NĂNG (FUNCTIONAL REQUIREMENTS)

3.1. Phân hệ Header & Định danh Nghệ nhân (Artisan Identity Header)





FR-1.1 Halo Avatar: Hiển thị ảnh đại diện bo tròn đối xứng (rounded-full) kèm vòng hào quang đa sắc phát quang (đỏ rượu vang, tím thiên hà) và huy hiệu xác minh nghệ nhân (Verified Badge).



FR-1.2 Thông tin thương hiệu: 





Tên thương hiệu: Luna Handmade (Font serif thanh lịch Playfair Display).



Username & Lĩnh vực: @luna.handmade • Nghệ thuật thủ công & Resin.



Bio ngắn & Tuyên ngôn sáng tạo: "Biến tưởng tượng thành tác phẩm nghệ thuật thủ công. Mỗi tác phẩm là một dải ngân hà thu nhỏ ✨".



FR-1.3 Nút chia sẻ & Tiện ích: Nút chia sẻ nhanh trang cá nhân lên các nền tảng mạng xã hội hoặc sao chép link liên kết.

3.2. Phân hệ Nút Liên Kết Dạng Viên Thuốc (Pill-Capsule Links)





FR-2.1 Nút Call-To-Action Nổi Bật (Primary Glowing CTA):





Nút "CỬA HÀNG THỦ CÔNG LUNA" với tag trạng thái, lời nhắc ORDER TẠI ĐÂY • Ưu đãi độc quyền và mũi tên điều hướng.



Hiệu ứng viền sáng phát quang kép (Double Neon Glow), chuyển màu loang nổi bật nhất màn hình.



FR-2.2 Hệ thống Liên kết Mạng Xã Hội Đa Kênh:





Kênh TikTok: @luna.craft (Video hậu trường, livestream nặn đất sét).



Kênh Instagram: @luna_crafts (Portfolio ảnh chụp tác phẩm nghệ thuật).



Kênh Telegram Studio: Cập nhật thông báo mở đợt đặt trước (Pre-order drops).



Kênh Facebook Fanpage: Cộng đồng người hâm mộ và khách hàng thân thiết.



Kênh Zalo Tư Vấn 1:1: Hỗ trợ báo giá và thiết kế sản phẩm custom theo yêu cầu cá nhân hóa.

3.3. Phân hệ Trưng Bày Sản Phẩm Nổi Bật (Showcase Spotlight)





FR-3.1 Lưới sản phẩm compact: Bố cục 3 cột tương thích hoàn hảo trên màn hình di động.



FR-3.2 Danh mục tiêu biểu:





Rồng Fantasy (Badge: Hot, giá: 850k) — Tác phẩm đất sét nghệ thuật phiên bản giới hạn.



Đèn Resin Biển (Badge: New, giá: 420k) — Khối resin đại dương phát quang ban đêm.



Hồ Ly Tuyết Mini (Badge: Mini, giá: 95k) — Móc khóa thủ công dễ thương.



FR-3.3 Thao tác click: Bấm vào thẻ sản phẩm chuyển trực tiếp đến trang xem chi tiết và giỏ hàng.

3.4. Phân hệ Câu Chuyện Thương Hiệu & Footer (Story & Footer)





FR-4.1 Thẻ "Một Chút Về Mình": Khối thông tin bo góc mờ kính (glassmorphism card) chia sẻ thông điệp đam mê và quy trình gói hàng tỉ mỉ.



FR-4.2 Huy hiệu nền tảng & Bản quyền: Badge danh dự "Made with Craftfolio ✨" và thông tin bản quyền © 2025 Luna Handmade.



4. YÊU CẦU PHI CHỨC NĂNG & THIẾT KẾ (NON-FUNCTIONAL & DESIGN REQUIREMENTS)

4.1. Quy chuẩn Thẩm mỹ & Đồ họa (Design & Aesthetics — Tham chiếu DESIGN.md)





Bảng màu chủ đạo:





Nền không gian sâu tương phản cao: #05050b (Deep Space Black).



Dải màu loang tinh vân vũ trụ: Đỏ rượu vang (#72092c, #c9184a), Tím thiên hà (#4a0e4e, #7b2cbf), Xanh dương sâu thẳm (#0d1b4a, #00b4d8).



Hiệu ứng Bling Bling: Hệ thống sao 4 cánh đối xứng (Diamond Sparkle SVG) và bụi sao vũ trụ lấp lánh chuyển động nhẹ nhàng.



Cấu trúc nút: Viên thuốc đối xứng (rounded-full), lớp kính tối mờ (backdrop-blur-md), viền sáng quang phổ tinh vân.

4.2. Hiệu năng & Khả năng Tương thích (Performance & Compatibility)





Responsive: Chuẩn Mobile-First (chiều rộng tối ưu 390px - 430px trên iOS & Android) và tự động căn giữa cân đối trên Desktop.



Tối ưu hình ảnh: Toàn bộ avatar và ảnh sản phẩm định dạng WebP nén chất lượng cao, có placeholder trong lúc tải.



Khả năng tiếp cận (Accessibility): Tỷ lệ tương phản chữ đạt chuẩn WCAG AA trên nền tối thông qua các gam màu sáng bạc và vàng kim.



5. KẾ HOẠCH PHÁT TRIỂN & LỘ TRÌNH (ROADMAP)





Giai đoạn

Mục tiêu

Kết quả bàn giao



Giai đoạn 1 (Hiện tại)

Hoàn thiện giao diện Link-in-Bio Galaxy Dark & Quy chuẩn Design System

Màn hình Link-in-Bio hoàn chỉnh, bộ quy chuẩn DESIGN.md, file PRD.md



Giai đoạn 2

Tích hợp luồng Mua sắm & Giỏ hàng

Kết nối trang chi tiết sản phẩm, thanh toán VietQR / COD trên Mobile & Desktop



Giai đoạn 3

Tính năng Đặt hàng Thiết kế 1:1 (Custom Commissions)

Form gửi yêu cầu tạo mô hình riêng, tải ảnh mẫu và đặt cọc trực tuyến



Giai đoạn 4

Phân tích Chuyển đổi & Cá nhân hóa

Bảng theo dõi lượt click từng liên kết, thử nghiệm A/B test hiệu ứng tinh vân

