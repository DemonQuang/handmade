import React, { useState } from 'react';
import { useData } from '../../context/DataContext';

/**
 * Tab 1: Quản lý Tên Shop & Ảnh Đại Diện (Shop Name & Avatar)
 */
export const ShopInfoEditor = () => {
  const { profile, updateProfile } = useData();
  const [formData, setFormData] = useState({ ...profile });
  const [toastMessage, setToastMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    const next = { ...formData, [name]: val };
    setFormData(next);
    updateProfile({ [name]: val });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Url = reader.result;
        setFormData((prev) => ({ ...prev, avatar: base64Url }));
        updateProfile({ avatar: base64Url });
        showToast('Đã tải ảnh đại diện mới thành công! ✨');
      };
      reader.readAsDataURL(file);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 right-6 z-50 bg-[#160d2e] border border-[#00b4d8]/60 text-white px-4 py-2.5 rounded-2xl shadow-[0_0_20px_rgba(0,180,216,0.4)] text-xs font-semibold flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[18px] text-[#00b4d8]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Shop Avatar Box */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#120a22]/80 border border-white/10 backdrop-blur-xl shadow-lg">
        <h3 className="text-sm font-bold uppercase tracking-wider text-purple-200 mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px] text-[#ff4d6d]">account_circle</span>
          <span>Ảnh Đại Diện Cửa Hàng (Shop Avatar)</span>
        </h3>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar Preview with Halo */}
          <div className="relative shrink-0">
            <div className="w-28 h-28 rounded-full p-[3px] bg-gradient-to-tr from-[#ff4d6d] via-[#7209b7] to-[#00b4d8] shadow-[0_0_35px_rgba(201,24,74,0.6)] animate-pulse">
              <img
                src={formData.avatar}
                alt="Avatar preview"
                className="w-full h-full rounded-full object-cover shadow-inner"
              />
              {formData.verified && (
                <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-gradient-to-r from-[#c9184a] to-[#7209b7] flex items-center justify-center text-white shadow-md border-2 border-[#05050b]">
                  <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    verified
                  </span>
                </div>
              )}
            </div>
            <span className="text-[10px] text-slate-400 block text-center mt-2 font-medium">
              Vòng phát quang 3 màu
            </span>
          </div>

          {/* Avatar Controls */}
          <div className="flex-1 space-y-3.5 w-full">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Đường dẫn hình ảnh (URL)
              </label>
              <input
                type="text"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                placeholder="https://... hoặc /assets/images/avatar.jpg"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#080512] border border-white/15 text-white text-xs focus:outline-none focus:border-[#ff4d6d] transition-colors"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#c9184a] to-[#7209b7] hover:opacity-95 text-white text-xs font-bold shadow-md shadow-[#c9184a]/30 transition-all active:scale-95">
                <span className="material-symbols-outlined text-[17px]">upload</span>
                <span>Tải ảnh từ máy tính</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-purple-200 bg-[#080512] px-3.5 py-2 rounded-xl border border-white/10">
                <input
                  type="checkbox"
                  name="verified"
                  checked={formData.verified}
                  onChange={handleChange}
                  className="w-4 h-4 rounded text-[#ff4d6d] bg-black border-white/20 focus:ring-0"
                />
                <span>Huy hiệu xác minh (Verified)</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Shop Name & Basic Info */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#120a22]/80 border border-white/10 backdrop-blur-xl shadow-lg space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-purple-200 mb-1 flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px] text-[#00b4d8]">storefront</span>
          <span>Tên Cửa Hàng & Định Danh Thương Hiệu</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Tên Shop / Thương hiệu nghệ nhân *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="VD: Luna Handmade"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#080512] border border-white/15 text-white text-xs font-semibold focus:outline-none focus:border-[#ff4d6d]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Username / Handle Shop *
            </label>
            <input
              type="text"
              name="handle"
              value={formData.handle}
              onChange={handleChange}
              placeholder="VD: @luna.handmade"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#080512] border border-white/15 text-white text-xs focus:outline-none focus:border-[#ff4d6d]"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">
            Lĩnh vực chế tác thủ công
          </label>
          <input
            type="text"
            name="field"
            value={formData.field}
            onChange={handleChange}
            placeholder="VD: Nghệ thuật thủ công & Resin"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#080512] border border-white/15 text-white text-xs focus:outline-none focus:border-[#ff4d6d]"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">
            Bio ngắn & Tuyên ngôn sáng tạo
          </label>
          <textarea
            name="bio"
            rows="2"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Biến tưởng tượng thành tác phẩm nghệ thuật thủ công. Mỗi tác phẩm là một dải ngân hà thu nhỏ ✨"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#080512] border border-white/15 text-white text-xs focus:outline-none focus:border-[#ff4d6d] resize-none leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Số điện thoại tư vấn
            </label>
            <input
              type="text"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              placeholder="VD: 0908 123 456"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#080512] border border-white/15 text-white text-xs focus:outline-none focus:border-[#ff4d6d]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Địa chỉ / Khu vực giao hàng
            </label>
            <input
              type="text"
              name="location"
              value={formData.location || ''}
              onChange={handleChange}
              placeholder="VD: Hồ Chí Minh • Giao hàng toàn quốc"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#080512] border border-white/15 text-white text-xs focus:outline-none focus:border-[#ff4d6d]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
