const { createApp } = require('./dist/app');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5055;
const BASE_URL = `http://127.0.0.1:${PORT}`;

async function runTests() {
  console.log('====================================================');
  console.log('🧪 BẮT ĐẦU KIỂM THỬ TỰ ĐỘNG HỆ THỐNG BACKEND LUNA API');
  console.log('====================================================\n');

  const app = createApp();
  const server = http.createServer(app);

  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`[Test Server] Đang lắng nghe tại ${BASE_URL}\n`);

  let passed = 0;
  let failed = 0;
  let adminToken = '';
  let createdProductId = '';
  let createdLinkId = '';

  const assert = (condition, name, details = '') => {
    if (condition) {
      console.log(`  ✅ [PASS] ${name}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${name} ${details ? '— ' + details : ''}`);
      failed++;
    }
  };

  try {
    // 1. Health check
    {
      const res = await fetch(`${BASE_URL}/api/health`);
      const body = await res.json();
      assert(res.status === 200 && body.success === true, '1. GET /api/health trả về status: ok (200)');
    }

    // 2. Root route
    {
      const res = await fetch(`${BASE_URL}/`);
      const body = await res.json();
      assert(res.status === 200 && body.apiVersion === '1.0.0', '2. GET / trả về thông tin chào mừng API (200)');
    }

    // 3. Auth Rejection: invalid email
    {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'notanemail' }),
      });
      const body = await res.json();
      assert(res.status === 400 && body.success === false, '3. POST /api/auth/login từ chối email không hợp lệ (400)');
    }

    // 3b. Auth Rejection: unauthorized stranger email
    {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'stranger@gmail.com',
          password: 'LunaCraft2025@',
        }),
      });
      const body = await res.json();
      assert(res.status === 400 && body.message.includes('không có quyền truy cập'), '3b. POST /api/auth/login chặn email lạ không thuộc whitelist Admin (400)');
    }

    // 4. Auth Login: success with authorized admin email and correct password
    {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'admin.luna@gmail.com',
          password: 'LunaCraft2025@',
        }),
      });
      const body = await res.json();
      adminToken = body.data?.token;
      assert(res.status === 200 && Boolean(adminToken), '4. POST /api/auth/login đăng nhập thành công và cấp JWT token (200)');
    }

    // 5. Auth Google One-Click Login
    {
      const res = await fetch(`${BASE_URL}/api/auth/login-google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin.luna@gmail.com' }),
      });
      const body = await res.json();
      assert(res.status === 200 && Boolean(body.data?.token), '5. POST /api/auth/login-google hỗ trợ đăng nhập 1-chạm (200)');
    }

    // 6. Auth Guard: access /me without token
    {
      const res = await fetch(`${BASE_URL}/api/auth/me`);
      assert(res.status === 401, '6. GET /api/auth/me chặn truy cập khi không có Bearer token (401)');
    }

    // 7. Auth Verify: access /me with token
    {
      const res = await fetch(`${BASE_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      const body = await res.json();
      assert(res.status === 200 && body.data?.role === 'ADMIN', '7. GET /api/auth/me xác thực token hợp lệ của Admin (200)');
    }

    // 8. Public Profile: GET /api/profile
    {
      const res = await fetch(`${BASE_URL}/api/profile`);
      const body = await res.json();
      assert(res.status === 200 && Boolean(body.data?.name), '8. GET /api/profile trả về dữ liệu cửa hàng công khai (200)');
    }

    // 9. Admin Profile Update: PUT /api/profile
    {
      const res = await fetch(`${BASE_URL}/api/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          name: 'Luna Handmade Studio',
          bio: 'Biến đất sét và resin thành dải ngân hà thu nhỏ ✨',
        }),
      });
      const body = await res.json();
      assert(res.status === 200 && body.data?.name === 'Luna Handmade Studio', '9. PUT /api/profile cập nhật thông tin cửa hàng thành công (200)');
    }

    // 10. Admin Story Update: PUT /api/profile/story
    {
      const res = await fetch(`${BASE_URL}/api/profile/story`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          aboutStory: 'Câu chuyện tự sự cập nhật tự động từ test script ✨',
        }),
      });
      const body = await res.json();
      assert(res.status === 200 && body.data?.aboutStory.includes('test script'), '10. PUT /api/profile/story cập nhật mục Một chút về mình (200)');
    }

    // 11. Public Links: GET /api/links
    {
      const res = await fetch(`${BASE_URL}/api/links`);
      const body = await res.json();
      assert(res.status === 200 && Array.isArray(body.data) && body.data.length > 0, '11. GET /api/links trả về danh sách liên kết mạng xã hội (200)');
    }

    // 12. Admin Update Socials: PUT /api/links/socials
    {
      const res = await fetch(`${BASE_URL}/api/links/socials`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          tiktok: 'https://tiktok.com/@luna.craft.test',
          facebook: 'https://facebook.com/luna.handmade.test',
          instagram: 'https://instagram.com/luna.test',
          youtube: 'https://youtube.com/@luna.test',
          zalo: 'https://zalo.me/0908123456',
        }),
      });
      const body = await res.json();
      assert(res.status === 200 && Array.isArray(body.data), '12. PUT /api/links/socials đồng bộ nhanh toàn bộ liên kết (200)');
    }

    // 13. Public Products: GET /api/products
    {
      const res = await fetch(`${BASE_URL}/api/products`);
      const body = await res.json();
      assert(res.status === 200 && Array.isArray(body.data) && body.data.length > 0, '13. GET /api/products trả về danh mục sản phẩm (200)');
    }

    // 14. Admin Create Product: POST /api/products
    {
      const res = await fetch(`${BASE_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          title: 'Dây Chuyền Sao Băng Test',
          priceDisplay: '290.000₫',
          image: '/assets/images/product-dragon.jpg',
          description: 'Sản phẩm thử nghiệm kiểm tra tính toàn vẹn hệ thống',
        }),
      });
      const body = await res.json();
      createdProductId = body.data?.id;
      assert(res.status === 201 && Boolean(createdProductId), '14. POST /api/products thêm sản phẩm mới thành công (201)');
    }

    // 15. Admin Update Product: PUT /api/products/:id
    {
      const res = await fetch(`${BASE_URL}/api/products/${createdProductId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          title: 'Dây Chuyền Sao Băng Test (Đã cập nhật)',
          priceDisplay: '320.000₫',
        }),
      });
      const body = await res.json();
      assert(res.status === 200 && body.data?.title.includes('Đã cập nhật'), '15. PUT /api/products/:id chỉnh sửa sản phẩm thành công (200)');
    }

    // 16. Admin Delete Product: DELETE /api/products/:id
    {
      const res = await fetch(`${BASE_URL}/api/products/${createdProductId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      const body = await res.json();
      assert(res.status === 200 && body.success === true, '16. DELETE /api/products/:id xóa sản phẩm thành công (200)');
    }

    // 17. Admin Upload File (Multipart Form-Data)
    {
      const testBuffer = Buffer.from('GIF89a\x01\x00\x01\x00\x80\x00\x00\xff\xff\xff\x00\x00\x00!\xf9\x04\x01\x00\x00\x00\x00,\x00\x00\x00\x00\x01\x00\x01\x00\x00\x02\x02D\x01\x00;', 'binary');
      const blob = new Blob([testBuffer], { type: 'image/gif' });
      const formData = new FormData();
      formData.append('file', blob, 'test-pixel.gif');

      const res = await fetch(`${BASE_URL}/api/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
        body: formData,
      });
      const body = await res.json();
      assert(res.status === 200 && Boolean(body.data?.url), '17. POST /api/upload tải lên hình ảnh và sinh URL tĩnh (200)');
    }

    // 18. Upload Reject: Unauthenticated
    {
      const res = await fetch(`${BASE_URL}/api/upload`, {
        method: 'POST',
      });
      assert(res.status === 401, '18. POST /api/upload từ chối khi không có token (401)');
    }

    // 19. 404 Route handler
    {
      const res = await fetch(`${BASE_URL}/api/this-does-not-exist`);
      const body = await res.json();
      assert(res.status === 404 && body.success === false, '19. Unknown route trả về 404 với thông báo lỗi chuẩn');
    }

  } catch (err) {
    console.error('Lỗi ngoại lệ trong quá trình chạy kiểm thử:', err);
    failed++;
  } finally {
    server.close();
  }

  console.log('\n====================================================');
  console.log(`📊 KẾT QUẢ KIỂM THỬ: ${passed} PASS, ${failed} FAIL`);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  } else {
    console.log('🎉 TẤT CẢ CÁC ĐIỂM KIỂM THỬ ĐỀU HOÀN TOÀN CHÍNH XÁC!\n');
    process.exit(0);
  }
}

runTests();
