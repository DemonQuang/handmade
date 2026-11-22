import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/apiService';
import { CosmicNebula } from '../components/background/CosmicNebula';

export const AdminPortal = () => {
  const {
    profile,
    updateProfile,
    links,
    updateLink,
    addLink,
    updateSocials,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    syncStatus,
    refreshData,
  } = useData();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Active section: 'shop' | 'socials' | 'products'
  const [activeTab, setActiveTab] = useState('shop');
  const [toast, setToast] = useState('');
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isUploadingProductImg, setIsUploadingProductImg] = useState(false);

  // 1. Local state for Shop info
  const [shopForm, setShopForm] = useState({
    name: profile.name || '',
    handle: profile.handle || '',
    field: profile.field || '',
    avatar: profile.avatar || '',
    bio: profile.bio || '',
    aboutStory: profile.aboutStory || '',
    contactPhone: profile.contactPhone || '',
    contactZalo: profile.contactZalo || '',
  });

  // 2. Local state for Social links
  const getUrl = (keyword) => {
    const found = links.find((l) => l.id.toLowerCase().includes(keyword) || l.title.toLowerCase().includes(keyword));
    return found ? found.url : '';
  };

  const [socialsForm, setSocialsForm] = useState({
    tiktok: getUrl('tiktok'),
    facebook: getUrl('facebook'),
    instagram: getUrl('instagram'),
    youtube: getUrl('youtube'),
    zalo: getUrl('zalo'),
  });

  // Keep shopForm synchronized when profile updates from Backend sync
  useEffect(() => {
    if (profile) {
      setShopForm((prev) => ({
        ...prev,
        name: profile.name ?? prev.name,
        handle: profile.handle ?? prev.handle,
        field: profile.field ?? prev.field,
        avatar: profile.avatar ?? prev.avatar,
        bio: profile.bio ?? prev.bio,
        aboutStory: profile.aboutStory ?? prev.aboutStory,
        contactPhone: profile.contactPhone ?? prev.contactPhone,
        contactZalo: profile.contactZalo ?? prev.contactZalo,
      }));
    }
  }, [profile]);

  // Keep socialsForm synchronized when links update from Backend sync
  useEffect(() => {
    if (links && links.length > 0) {
      setSocialsForm({
        tiktok: getUrl('tiktok'),
        facebook: getUrl('facebook'),
        instagram: getUrl('instagram'),
        youtube: getUrl('youtube'),
        zalo: getUrl('zalo'),
      });
    }
  }, [links]);

  // 3. Modal state for Adding/Editing product
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    title: '',
    priceDisplay: '',
    image: '',
    description: '',
  });

  const showNotification = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  // Handle Save Shop Info
  const handleSaveShop = async (e) => {
    e.preventDefault();
    await updateProfile(shopForm);
    showNotification('Đã lưu thông tin Shop & Giới thiệu thành công! ✨');
  };

  // Handle Avatar upload with direct Backend API upload
  const handleAvatarFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('Kích thước ảnh tối đa là 10MB');
      return;
    }

    const auth = JSON.parse(localStorage.getItem('LUNA_ADMIN_AUTH') || '{}');
    if (auth?.token && auth.token !== 'local_jwt_token_fallback') {
      try {
        setIsUploadingAvatar(true);
        showNotification('Đang tải ảnh đại diện lên máy chủ... ☁️');
        const res = await apiService.uploadImage(file, auth.token);
        if (res?.data?.url) {
          setShopForm((prev) => ({ ...prev, avatar: res.data.url }));
          await updateProfile({ avatar: res.data.url });
          showNotification('Đã tải ảnh đại diện lên máy chủ thành công! ✨');
          setIsUploadingAvatar(false);
          return;
        }
      } catch (err) {
        console.warn('Lỗi tải ảnh lên backend, dùng base64 cục bộ:', err);
      } finally {
        setIsUploadingAvatar(false);
      }
    }

    // Fallback: Local Base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setShopForm((prev) => ({ ...prev, avatar: base64 }));
      updateProfile({ avatar: base64 });
      showNotification('Đã lưu ảnh đại diện cục bộ! ✨');
    };
    reader.readAsDataURL(file);
  };

  // Handle Save Social Links
  const handleSaveSocials = async (e) => {
    e.preventDefault();

    // 1. Batch sync to Backend
    await updateSocials(socialsForm);

    // 2. Also ensure local link structure
    const updateOrAdd = (keyword, title, url, icon, color, border, gradient) => {
      const existing = links.find((l) => l.id.toLowerCase().includes(keyword) || l.title.toLowerCase().includes(keyword));
      if (existing) {
        updateLink(existing.id, { url: url.trim(), enabled: Boolean(url.trim()) });
      } else if (url.trim()) {
        addLink({
          id: keyword,
          title,
          url: url.trim(),
          icon,
          iconColor: color,
          iconBorder: border,
          gradientBorder: gradient,
          shadow: 'shadow-[0_0_20px_rgba(201,24,74,0.25)]',
          enabled: true,
          isHero: false,
        });
      }
    };

    updateOrAdd('tiktok', 'TikTok @luna.craft', socialsForm.tiktok, 'play_circle', 'text-[#ff4d6d]', 'border-[#ff4d6d]/50', 'from-[#c9184a]/60 via-[#7209b7]/40 to-[#0077b6]/60 hover:from-[#ff4d6d] hover:to-[#00b4d8]');
    updateOrAdd('facebook', 'Facebook Fanpage', socialsForm.facebook, 'thumb_up', 'text-[#60a5fa]', 'border-[#0077b6]/50', 'from-[#1d3557]/60 via-[#0077b6]/50 to-[#7209b7]/60 hover:from-[#0077b6] hover:to-[#560bad]');
    updateOrAdd('instagram', 'Instagram @luna_crafts', socialsForm.instagram, 'photo_camera', 'text-[#f472b6]', 'border-[#b5179e]/50', 'from-[#7209b7]/60 via-[#b5179e]/40 to-[#c9184a]/60 hover:from-[#b5179e] hover:to-[#ff4d6d]');
    updateOrAdd('youtube', 'Kênh YouTube Studio', socialsForm.youtube, 'videocam', 'text-[#ef4444]', 'border-[#ef4444]/50', 'from-[#b91c1c]/60 via-[#c9184a]/50 to-[#7209b7]/60 hover:from-[#ef4444] hover:to-[#ff4d6d]');
    updateOrAdd('zalo', 'Zalo Tư Vấn 1:1', socialsForm.zalo, 'chat', 'text-[#38bdf8]', 'border-[#00b4d8]/50', 'from-[#00b4d8]/50 via-[#7209b7]/50 to-[#c9184a]/50 hover:from-[#00b4d8] hover:to-[#ff4d6d]');

    showNotification('Đã lưu toàn bộ liên kết mạng xã hội thành công! ✨');
  };

  // Handle Product Management
  const openAddProductModal = () => {
    setEditingProduct(null);
    setProductForm({
      title: '',
      priceDisplay: '',
      image: '/assets/images/product-dragon.jpg',
      description: '',
    });
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (prod) => {
    setEditingProduct(prod);
    setProductForm({
      title: prod.title || '',
      priceDisplay: prod.priceDisplay || prod.price || '',
      image: prod.image || '',
      description: prod.description || '',
    });
    setIsProductModalOpen(true);
  };

  const handleProductImageFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('Kích thước ảnh tối đa là 10MB');
      return;
    }

    const auth = JSON.parse(localStorage.getItem('LUNA_ADMIN_AUTH') || '{}');
    if (auth?.token && auth.token !== 'local_jwt_token_fallback') {
      try {
        setIsUploadingProductImg(true);
        showNotification('Đang tải ảnh sản phẩm lên máy chủ... ☁️');
        const res = await apiService.uploadImage(file, auth.token);
        if (res?.data?.url) {
          setProductForm((prev) => ({ ...prev, image: res.data.url }));
          showNotification('Đã tải ảnh lên máy chủ thành công! ✨');
          setIsUploadingProductImg(false);
          return;
        }
      } catch (err) {
        console.warn('Lỗi tải ảnh lên backend, dùng base64 cục bộ:', err);
      } finally {
        setIsUploadingProductImg(false);
      }
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setProductForm((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!productForm.title.trim() || !productForm.priceDisplay.trim()) return;

    const payload = {
      title: productForm.title,
      priceDisplay: productForm.priceDisplay,
      price: productForm.priceDisplay.includes('₫') ? productForm.priceDisplay : `${productForm.priceDisplay} VNĐ`,
      image: productForm.image || '/assets/images/product-dragon.jpg',
      description: productForm.description,
      badge: 'Hot',
      badgeGradient: 'from-[#c9184a] to-[#7209b7]',
      priceColor: 'text-[#ff4d6d]',
      priceGlow: 'drop-shadow(0 0 6px rgba(201, 24, 74, 0.7))',
      cardBorder: 'border-[#c9184a]/40 hover:border-[#ff4d6d]',
      glowShadow: 'hover:shadow-[0_0_22px_rgba(201,24,74,0.45)]',
      category: 'Thủ công Handmade',
      stock: 'Còn hàng',
    };

    if (editingProduct) {
      await updateProduct(editingProduct.id, payload);
      showNotification('Đã cập nhật sản phẩm thành công! ✨');
    } else {
      await addProduct(payload);
      showNotification('Đã thêm sản phẩm mới vào cửa hàng! ✨');
    }

    setIsProductModalOpen(false);
  };

  const handleDeleteProduct = (prod) => {
    if (confirm(`Bạn có chắc muốn xóa sản phẩm "${prod.title}"?`)) {
      deleteProduct(prod.id);
      showNotification(`Đã xóa sản phẩm "${prod.title}"`);
    }
  };

  const handleLogout = () => {
    if (confirm('Bạn có muốn đăng xuất khỏi trang quản trị?')) {
      logout();
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-[#05050b] text-slate-100 font-sans flex flex-col relative selection:bg-[#ff4d6d]/40 selection:text-white">
      {/* Background Glow */}
      <CosmicNebula />

      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-[#160d2e] border border-emerald-400 text-white px-5 py-3 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center gap-2.5 text-xs font-bold animate-bounce">
          <span className="material-symbols-outlined text-[20px] text-emerald-400">check_circle</span>
          <span>{toast}</span>
        </div>
      )}

      {/* Laptop Layout Shell */}
      <div className="flex-1 flex flex-col md:flex-row z-10">
        {/* ================= LEFT SIDEBAR (Laptop-friendly) ================= */}
        <aside className="w-full md:w-64 lg:w-72 bg-[#0c0717]/95 border-b md:border-b-0 md:border-r border-white/10 p-5 flex flex-col justify-between shrink-0 backdrop-blur-xl">
          <div>
            {/* Brand Logo */}
            <div className="flex items-center gap-3 pb-6 border-b border-white/10">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#ff4d6d] via-[#7209b7] to-[#00b4d8] p-[2px] shadow-[0_0_15px_rgba(201,24,74,0.5)]">
                <div className="w-full h-full rounded-full bg-[#06030d] flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-[20px] text-[#ff4d6d]">palette</span>
                </div>
              </div>
              <div>
                <h1 className="text-base font-bold text-white leading-tight">Luna Handmade</h1>
                <span className="text-[11px] text-purple-300 font-medium">Trang Quản Trị Shop</span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="mt-6 space-y-2">
              <button
                type="button"
                onClick={() => setActiveTab('shop')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                  activeTab === 'shop'
                    ? 'bg-gradient-to-r from-[#c9184a] to-[#7209b7] text-white shadow-[0_0_20px_rgba(201,24,74,0.4)] border border-white/20'
                    : 'bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-transparent'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">storefront</span>
                <span>Tên Shop & Avatar</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('socials')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                  activeTab === 'socials'
                    ? 'bg-gradient-to-r from-[#c9184a] to-[#7209b7] text-white shadow-[0_0_20px_rgba(201,24,74,0.4)] border border-white/20'
                    : 'bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-transparent'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">share</span>
                <span>Link Mạng Xã Hội</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('products')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                  activeTab === 'products'
                    ? 'bg-gradient-to-r from-[#c9184a] to-[#7209b7] text-white shadow-[0_0_20px_rgba(201,24,74,0.4)] border border-white/20'
                    : 'bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-transparent'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                <div className="flex-1 flex items-center justify-between">
                  <span>Sản Phẩm & Mô Tả</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/10 text-purple-200">
                    {products.length}
                  </span>
                </div>
              </button>
            </nav>
          </div>

          {/* Sidebar Footer: Server Sync Status, Admin User, View Site & Logout */}
          <div className="pt-6 border-t border-white/10 space-y-3 mt-6 md:mt-0">
            {/* Live Backend Connection Status */}
            <div className="px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                  syncStatus === 'ONLINE'
                    ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-pulse'
                    : syncStatus === 'SYNCING'
                    ? 'bg-blue-400 animate-spin'
                    : 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.7)]'
                }`} />
                <div className="text-[11px] leading-tight truncate">
                  <span className="font-bold text-slate-200 block truncate">
                    {syncStatus === 'ONLINE' ? 'Server API: Online' : syncStatus === 'SYNCING' ? 'Đang đồng bộ...' : 'Chế độ Cục bộ'}
                  </span>
                  <span className="text-[9px] text-slate-400 block truncate">
                    {syncStatus === 'ONLINE' ? 'Port 5000 (Tự động lưu)' : 'Lưu trữ trình duyệt'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={async () => {
                  showNotification('Đang làm mới dữ liệu từ server... 🔄');
                  const ok = await refreshData();
                  showNotification(ok ? 'Đã đồng bộ dữ liệu mới nhất từ Server! ✨' : 'Server ngoại tuyến, dùng bộ nhớ cục bộ');
                }}
                title="Đồng bộ lại từ máy chủ"
                className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors shrink-0"
              >
                <span className="material-symbols-outlined text-[17px]">sync</span>
              </button>
            </div>

            {/* User Gmail */}
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10">
              <span className="material-symbols-outlined text-[20px] text-[#00b4d8]">account_circle</span>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] text-slate-400 block">Đang đăng nhập:</span>
                <span className="text-xs font-semibold text-white truncate block" title={user?.email}>
                  {user?.email || 'admin.luna@gmail.com'}
                </span>
              </div>
            </div>

            {/* View live site button */}
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all"
            >
              <span>Xem Web Thực Tế</span>
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </Link>

            {/* Logout button */}
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-red-900/20 hover:bg-red-900/40 text-red-300 border border-red-500/20 text-xs font-semibold transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
              <span>Đăng Xuất</span>
            </button>
          </div>
        </aside>

        {/* ================= RIGHT MAIN CONTENT (Laptop Spacious) ================= */}
        <main className="flex-1 p-6 md:p-8 lg:p-10 max-w-5xl overflow-y-auto">
          {/* TAB 1: THÔNG TIN SHOP, AVATAR & MỘT CHÚT VỀ MÌNH */}
          {activeTab === 'shop' && (
            <div className="space-y-6">
              {/* Header Title */}
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-2xl text-[#ff4d6d]">storefront</span>
                  <span>Chỉnh Sửa Thông Tin Shop & Ảnh Đại Diện</span>
                </h2>
                <p className="text-xs md:text-sm text-slate-400 mt-1">
                  Cập nhật tên cửa hàng, ảnh đại diện và câu chuyện giới thiệu hiển thị trên trang Bio.
                </p>
              </div>

              <form onSubmit={handleSaveShop} className="space-y-6">
                {/* 1. Avatar Section */}
                <div className="p-6 rounded-2xl bg-[#0e071c]/90 border border-white/10 backdrop-blur-xl">
                  <label className="text-xs font-bold uppercase tracking-wider text-purple-200 block mb-3">
                    Ảnh Đại Diện Cửa Hàng (Avatar)
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    {/* Circle preview */}
                    <div className="w-24 h-24 rounded-full p-[3px] bg-gradient-to-tr from-[#ff4d6d] via-[#7209b7] to-[#00b4d8] shadow-[0_0_25px_rgba(201,24,74,0.5)] shrink-0">
                      <img
                        src={shopForm.avatar}
                        alt="Shop Avatar"
                        className="w-full h-full rounded-full object-cover shadow-inner"
                      />
                    </div>

                    {/* Inputs */}
                    <div className="flex-1 space-y-3 w-full">
                      <div>
                        <label className="text-xs font-medium text-slate-300 block mb-1">
                          Đường dẫn ảnh đại diện (URL)
                        </label>
                        <input
                          type="text"
                          value={shopForm.avatar}
                          onChange={(e) => setShopForm({ ...shopForm, avatar: e.target.value })}
                          placeholder="https://... hoặc /assets/images/avatar.jpg"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#06030d] border border-white/15 text-white text-xs focus:outline-none focus:border-[#ff4d6d]"
                        />
                      </div>

                      <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#c9184a] to-[#7209b7] hover:opacity-95 text-white text-xs font-bold shadow-md transition-all">
                        <span className="material-symbols-outlined text-[17px]">upload</span>
                        <span>Chọn ảnh từ máy tính</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarFile}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* 2. Shop Name & Handle */}
                <div className="p-6 rounded-2xl bg-[#0e071c]/90 border border-white/10 backdrop-blur-xl space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-purple-200">
                    Tên Shop & Định Danh
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Tên Shop / Tên Cửa Hàng *
                      </label>
                      <input
                        type="text"
                        required
                        value={shopForm.name}
                        onChange={(e) => setShopForm({ ...shopForm, name: e.target.value })}
                        placeholder="VD: Luna Handmade"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#06030d] border border-white/15 text-white text-xs focus:outline-none focus:border-[#ff4d6d]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Username / Handle Shop
                      </label>
                      <input
                        type="text"
                        value={shopForm.handle}
                        onChange={(e) => setShopForm({ ...shopForm, handle: e.target.value })}
                        placeholder="VD: @luna.handmade"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#06030d] border border-white/15 text-white text-xs focus:outline-none focus:border-[#ff4d6d]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Mô tả ngắn gọn (Bio dưới tên Shop)
                    </label>
                    <textarea
                      rows="2"
                      value={shopForm.bio}
                      onChange={(e) => setShopForm({ ...shopForm, bio: e.target.value })}
                      placeholder="VD: Biến tưởng tượng thành tác phẩm nghệ thuật thủ công. Mỗi tác phẩm là một dải ngân hà thu nhỏ ✨"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#06030d] border border-white/15 text-white text-xs focus:outline-none focus:border-[#ff4d6d] resize-none leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Số điện thoại liên hệ
                      </label>
                      <input
                        type="text"
                        value={shopForm.contactPhone}
                        onChange={(e) => setShopForm({ ...shopForm, contactPhone: e.target.value })}
                        placeholder="VD: 0908 123 456"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#06030d] border border-white/15 text-white text-xs focus:outline-none focus:border-[#ff4d6d]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Đường dẫn Zalo tư vấn đặt hàng
                      </label>
                      <input
                        type="text"
                        value={shopForm.contactZalo}
                        onChange={(e) => setShopForm({ ...shopForm, contactZalo: e.target.value })}
                        placeholder="VD: https://zalo.me/0908123456"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#06030d] border border-white/15 text-white text-xs focus:outline-none focus:border-[#ff4d6d]"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. About Me Story */}
                <div className="p-6 rounded-2xl bg-[#0e071c]/90 border border-white/10 backdrop-blur-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-purple-200 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px] text-[#ffe066]">auto_awesome</span>
                      <span>Câu Chuyện "Một Chút Về Mình"</span>
                    </h3>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {shopForm.aboutStory.length} ký tự
                    </span>
                  </div>

                  <p className="text-xs text-slate-400">
                    Nội dung chia sẻ tâm huyết, quy trình làm đất sét nung, đổ resin và đóng gói quà tặng tỉ mỉ gửi gắm tới khách hàng.
                  </p>

                  <textarea
                    rows="4"
                    value={shopForm.aboutStory}
                    onChange={(e) => setShopForm({ ...shopForm, aboutStory: e.target.value })}
                    placeholder="Xin chào! Mình là Luna – người say mê biến đất sét polymer và resin trong suốt..."
                    className="w-full px-4 py-3 rounded-xl bg-[#06030d] border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-[#ff4d6d] leading-relaxed resize-y"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff4d6d] via-[#7209b7] to-[#00b4d8] text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(201,24,74,0.4)] hover:opacity-95 active:scale-98 transition-all cursor-pointer flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  <span>Lưu Toàn Bộ Thông Tin Shop</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: LIÊN KẾT MẠNG XÃ HỘI */}
          {activeTab === 'socials' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-2xl text-[#00b4d8]">share</span>
                  <span>Chỉnh Sửa Liên Kết Mạng Xã Hội (TikTok, FB, IG, YouTube, Zalo)</span>
                </h2>
                <p className="text-xs md:text-sm text-slate-400 mt-1">
                  Nhập link trang mạng xã hội của bạn. Các nút liên kết sẽ tự động cập nhật ngay lập tức trên trang Bio.
                </p>
              </div>

              <form onSubmit={handleSaveSocials} className="p-6 rounded-2xl bg-[#0e071c]/90 border border-white/10 backdrop-blur-xl space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* TikTok */}
                  <div className="p-4 rounded-xl bg-[#06030d] border border-white/10 space-y-1.5">
                    <label className="text-xs font-bold text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-[#ff4d6d]">play_circle</span>
                      <span>Link TikTok</span>
                    </label>
                    <input
                      type="url"
                      value={socialsForm.tiktok}
                      onChange={(e) => setSocialsForm({ ...socialsForm, tiktok: e.target.value })}
                      placeholder="https://tiktok.com/@luna.craft"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#120a22] border border-white/15 text-white text-xs focus:outline-none focus:border-[#ff4d6d]"
                    />
                  </div>

                  {/* Facebook */}
                  <div className="p-4 rounded-xl bg-[#06030d] border border-white/10 space-y-1.5">
                    <label className="text-xs font-bold text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-[#60a5fa]">thumb_up</span>
                      <span>Link Facebook</span>
                    </label>
                    <input
                      type="url"
                      value={socialsForm.facebook}
                      onChange={(e) => setSocialsForm({ ...socialsForm, facebook: e.target.value })}
                      placeholder="https://facebook.com/lunahandmade"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#120a22] border border-white/15 text-white text-xs focus:outline-none focus:border-[#60a5fa]"
                    />
                  </div>

                  {/* Instagram */}
                  <div className="p-4 rounded-xl bg-[#06030d] border border-white/10 space-y-1.5">
                    <label className="text-xs font-bold text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-[#f472b6]">photo_camera</span>
                      <span>Link Instagram</span>
                    </label>
                    <input
                      type="url"
                      value={socialsForm.instagram}
                      onChange={(e) => setSocialsForm({ ...socialsForm, instagram: e.target.value })}
                      placeholder="https://instagram.com/luna_crafts"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#120a22] border border-white/15 text-white text-xs focus:outline-none focus:border-[#f472b6]"
                    />
                  </div>

                  {/* YouTube */}
                  <div className="p-4 rounded-xl bg-[#06030d] border border-white/10 space-y-1.5">
                    <label className="text-xs font-bold text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-[#ef4444]">videocam</span>
                      <span>Link YouTube</span>
                    </label>
                    <input
                      type="url"
                      value={socialsForm.youtube}
                      onChange={(e) => setSocialsForm({ ...socialsForm, youtube: e.target.value })}
                      placeholder="https://youtube.com/@lunahandmade"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#120a22] border border-white/15 text-white text-xs focus:outline-none focus:border-[#ef4444]"
                    />
                  </div>

                  {/* Zalo */}
                  <div className="p-4 rounded-xl bg-[#06030d] border border-white/10 space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-[#38bdf8]">chat</span>
                      <span>Link Zalo / Số Điện Thoại Tư Vấn 1:1</span>
                    </label>
                    <input
                      type="text"
                      value={socialsForm.zalo}
                      onChange={(e) => setSocialsForm({ ...socialsForm, zalo: e.target.value })}
                      placeholder="https://zalo.me/0908123456 hoặc 0908 123 456"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#120a22] border border-white/15 text-white text-xs focus:outline-none focus:border-[#38bdf8]"
                    />
                  </div>
                </div>

                {/* Save Socials Button */}
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff4d6d] via-[#7209b7] to-[#00b4d8] text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(201,24,74,0.4)] hover:opacity-95 active:scale-98 transition-all cursor-pointer flex items-center gap-2 mt-4"
                >
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  <span>Lưu Các Liên Kết Mạng Xã Hội</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: THÊM SẢN PHẨM & MÔ TẢ */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              {/* Header + Add Product Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-2xl text-[#ffe066]">shopping_bag</span>
                    <span>Quản Lý Sản Phẩm & Mô Tả ({products.length})</span>
                  </h2>
                  <p className="text-xs md:text-sm text-slate-400 mt-1">
                    Thêm ảnh sản phẩm thủ công, đặt giá và mô tả tác phẩm hiển thị trong mục "Tác Phẩm Nổi Bật".
                  </p>
                </div>

                <button
                  type="button"
                  onClick={openAddProductModal}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#ff4d6d] via-[#7209b7] to-[#00b4d8] text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(201,24,74,0.4)] hover:opacity-95 active:scale-98 transition-all cursor-pointer flex items-center gap-2 shrink-0"
                >
                  <span className="material-symbols-outlined text-[19px]">add_photo_alternate</span>
                  <span>+ Thêm Sản Phẩm Mới</span>
                </button>
              </div>

              {/* Products List (Laptop Table / Cards) */}
              {products.length === 0 ? (
                <div className="p-12 rounded-2xl bg-[#0e071c] border border-white/10 text-center text-slate-400">
                  <span className="material-symbols-outlined text-4xl text-purple-400 mb-2">inventory_2</span>
                  <p className="text-sm font-bold text-white">Chưa có sản phẩm nào</p>
                  <p className="text-xs text-slate-400 mt-1">Bấm nút "+ Thêm Sản Phẩm Mới" để đăng sản phẩm đầu tiên</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {products.map((prod) => (
                    <div
                      key={prod.id}
                      className="p-4 rounded-2xl bg-[#0e071c]/90 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-white/25"
                    >
                      <div className="flex items-center gap-4 min-w-0 flex-1">
                        {/* Thumbnail image */}
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-black/60 border border-white/15 shrink-0">
                          <img
                            src={prod.image}
                            alt={prod.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Title, price, description */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-white truncate">{prod.title}</h4>
                            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#ff4d6d]/20 text-[#ff758f] border border-[#ff4d6d]/30">
                              {prod.priceDisplay || prod.price}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 line-clamp-1 mt-1">
                            {prod.description || 'Chưa có mô tả chi tiết'}
                          </p>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        <button
                          type="button"
                          onClick={() => openEditProductModal(prod)}
                          className="px-3 py-1.5 rounded-lg bg-purple-900/30 hover:bg-purple-900/50 text-purple-200 text-xs font-semibold flex items-center gap-1 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[15px]">edit</span>
                          <span>Sửa</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProduct(prod)}
                          className="px-3 py-1.5 rounded-lg bg-red-900/20 hover:bg-red-900/40 text-red-300 text-xs font-semibold flex items-center gap-1 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[15px]">delete</span>
                          <span>Xóa</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* ================= MODAL: THÊM / SỬA SẢN PHẨM ================= */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#0e071c] border border-white/20 rounded-3xl p-6 text-slate-100 shadow-[0_0_50px_rgba(201,24,74,0.35)]">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ff4d6d]">
                  {editingProduct ? 'edit' : 'add_box'}
                </span>
                <span>{editingProduct ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsProductModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              {/* Product Title */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Tên sản phẩm *
                </label>
                <input
                  type="text"
                  required
                  value={productForm.title}
                  onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                  placeholder="VD: Rồng Fantasy Dạ Quang"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#06030d] border border-white/15 text-white text-xs focus:outline-none focus:border-[#ff4d6d]"
                />
              </div>

              {/* Price */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Giá bán hiển thị *
                </label>
                <input
                  type="text"
                  required
                  value={productForm.priceDisplay}
                  onChange={(e) => setProductForm({ ...productForm, priceDisplay: e.target.value })}
                  placeholder="VD: 850k hoặc 850.000₫"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#06030d] border border-white/15 text-white text-xs focus:outline-none focus:border-[#ff4d6d]"
                />
              </div>

              {/* Product Image */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">
                  Ảnh sản phẩm
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-black/60 border border-white/15 shrink-0">
                    <img
                      src={productForm.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <input
                      type="text"
                      value={productForm.image}
                      onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                      placeholder="https://... hoặc /assets/images/..."
                      className="w-full px-3 py-1.5 rounded-lg bg-[#06030d] border border-white/15 text-white text-xs focus:outline-none focus:border-[#ff4d6d]"
                    />
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-900/40 hover:bg-purple-900/60 border border-purple-500/40 text-purple-200 text-xs font-medium">
                      <span className="material-symbols-outlined text-[15px]">upload</span>
                      <span>Tải ảnh từ máy tính</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProductImageFile}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Mô tả sản phẩm
                </label>
                <textarea
                  rows="3"
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Mô tả chất liệu, quá trình nặn tay, kích thước..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#06030d] border border-white/15 text-white text-xs focus:outline-none focus:border-[#ff4d6d] resize-none leading-relaxed"
                />
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 text-xs font-medium"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#c9184a] via-[#7209b7] to-[#00b4d8] text-white text-xs font-bold shadow-lg"
                >
                  {editingProduct ? 'Lưu Thay Đổi' : 'Thêm Sản Phẩm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
