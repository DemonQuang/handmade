import React, { useState } from 'react';

const BADGE_PRESETS = [
  { id: 'Hot', label: 'Hot 🔥', gradient: 'from-[#c9184a] to-[#7209b7]', priceColor: 'text-[#ff4d6d]', glow: 'drop-shadow(0 0 6px rgba(201, 24, 74, 0.7))', border: 'border-[#c9184a]/40 hover:border-[#ff4d6d]', shadow: 'hover:shadow-[0_0_22px_rgba(201,24,74,0.45)]' },
  { id: 'New', label: 'New ✨', gradient: 'from-[#0077b6] to-[#00b4d8]', priceColor: 'text-[#00b4d8]', glow: 'drop-shadow(0 0 6px rgba(0, 180, 216, 0.7))', border: 'border-[#0077b6]/40 hover:border-[#00b4d8]', shadow: 'hover:shadow-[0_0_22px_rgba(0,180,216,0.45)]' },
  { id: 'Mini', label: 'Mini 🦊', gradient: 'from-[#7209b7] to-[#b5179e]', priceColor: 'text-[#d946ef]', glow: 'drop-shadow(0 0 6px rgba(217, 70, 239, 0.7))', border: 'border-[#7209b7]/40 hover:border-[#b5179e]', shadow: 'hover:shadow-[0_0_22px_rgba(114,9,183,0.45)]' },
  { id: 'Custom', label: 'Custom 🎨', gradient: 'from-[#eab308] to-[#f97316]', priceColor: 'text-[#facc15]', glow: 'drop-shadow(0 0 6px rgba(250, 204, 21, 0.7))', border: 'border-[#eab308]/40 hover:border-[#facc15]', shadow: 'hover:shadow-[0_0_22px_rgba(250,204,21,0.45)]' },
];

/**
 * Product Add / Edit Modal Form
 */
export const ProductFormModal = ({ isOpen, onClose, product, onSave }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    title: product?.title || '',
    price: product?.price || '500.000₫',
    priceDisplay: product?.priceDisplay || '500k',
    rawPrice: product?.rawPrice || 500000,
    badge: product?.badge || 'New',
    badgeGradient: product?.badgeGradient || 'from-[#0077b6] to-[#00b4d8]',
    image: product?.image || '/assets/images/product-dragon.jpg',
    alt: product?.alt || '',
    cardBorder: product?.cardBorder || 'border-[#0077b6]/40 hover:border-[#00b4d8]',
    glowShadow: product?.glowShadow || 'hover:shadow-[0_0_22px_rgba(0,180,216,0.45)]',
    priceColor: product?.priceColor || 'text-[#00b4d8]',
    priceGlow: product?.priceGlow || 'drop-shadow(0 0 6px rgba(0, 180, 216, 0.7))',
    category: product?.category || 'Polymer Clay Nghệ Thuật',
    stock: product?.stock || 'Sẵn hàng giao ngay',
    description: product?.description || '',
    specifications: product?.specifications || [
      { label: 'Chất liệu', value: 'Đất sét Polymer Clay cao cấp' },
      { label: 'Kích thước', value: 'Cao 10cm' },
    ],
  });

  const handleBadgeSelect = (preset) => {
    setFormData((prev) => ({
      ...prev,
      badge: preset.id,
      badgeGradient: preset.gradient,
      priceColor: preset.priceColor,
      priceGlow: preset.glow,
      cardBorder: preset.border,
      glowShadow: preset.shadow,
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSpec = () => {
    setFormData((prev) => ({
      ...prev,
      specifications: [...prev.specifications, { label: '', value: '' }],
    }));
  };

  const handleRemoveSpec = (index) => {
    setFormData((prev) => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index),
    }));
  };

  const handleSpecChange = (index, field, val) => {
    const next = [...formData.specifications];
    next[index][field] = val;
    setFormData((prev) => ({ ...prev, specifications: next }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    onSave({
      ...formData,
      alt: formData.alt || `Tác phẩm ${formData.title} thủ công`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-xl max-h-[92vh] flex flex-col bg-[#0e071c] border border-white/20 rounded-3xl text-slate-100 shadow-[0_0_50px_rgba(201,24,74,0.35)] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 shrink-0">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ff4d6d]">
              {product ? 'edit_note' : 'add_circle'}
            </span>
            <span>{product ? 'Chỉnh sửa tác phẩm' : 'Thêm tác phẩm mới'}</span>
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto flex-1">
          {/* 1. Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Tên tác phẩm *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="VD: Rồng Fantasy Dạ Quang"
                className="w-full px-3.5 py-2 rounded-xl bg-[#080512] border border-white/15 text-white text-xs focus:outline-none focus:border-[#ff4d6d]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Danh mục chế tác
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="VD: Polymer Clay / Resin"
                className="w-full px-3.5 py-2 rounded-xl bg-[#080512] border border-white/15 text-white text-xs focus:outline-none focus:border-[#ff4d6d]"
              />
            </div>
          </div>

          {/* 2. Image Selection & Preview */}
          <div className="p-3.5 rounded-2xl bg-[#080512] border border-white/10 space-y-3">
            <div className="flex items-center gap-4">
              {/* Thumbnail preview */}
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-black/60 border border-white/15 shrink-0 relative">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <span className={`absolute top-0.5 left-0.5 px-1 rounded text-[8px] font-bold bg-gradient-to-r ${formData.badgeGradient} text-white`}>
                  {formData.badge}
                </span>
              </div>

              {/* Upload & URL */}
              <div className="flex-1 space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">
                  Hình ảnh tác phẩm (URL hoặc tải file)
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://... hoặc /assets/images/..."
                  className="w-full px-3 py-1.5 rounded-lg bg-[#120a22] border border-white/15 text-white text-xs focus:outline-none focus:border-[#ff4d6d]"
                />
                <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-900/40 hover:bg-purple-900/60 border border-purple-500/40 text-purple-200 text-xs font-medium transition-all">
                  <span className="material-symbols-outlined text-[15px]">upload</span>
                  <span>Tải ảnh từ máy tính</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
            </div>
          </div>

          {/* 3. Price & Badge */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Giá compact (trên thẻ card) *
              </label>
              <input
                type="text"
                required
                value={formData.priceDisplay}
                onChange={(e) => setFormData({ ...formData, priceDisplay: e.target.value })}
                placeholder="VD: 850k"
                className="w-full px-3.5 py-2 rounded-xl bg-[#080512] border border-white/15 text-white text-xs focus:outline-none focus:border-[#ff4d6d]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Giá đầy đủ (trong modal)
              </label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="VD: 850.000₫"
                className="w-full px-3.5 py-2 rounded-xl bg-[#080512] border border-white/15 text-white text-xs focus:outline-none focus:border-[#ff4d6d]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Tình trạng kho
              </label>
              <input
                type="text"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="VD: Còn 2 tác phẩm"
                className="w-full px-3.5 py-2 rounded-xl bg-[#080512] border border-white/15 text-white text-xs focus:outline-none focus:border-[#ff4d6d]"
              />
            </div>
          </div>

          {/* Badge Presets */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Chọn Badge trạng thái & Phong cách màu
            </label>
            <div className="flex flex-wrap gap-2">
              {BADGE_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleBadgeSelect(preset)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    formData.badge === preset.id
                      ? `bg-gradient-to-r ${preset.gradient} text-white border-white shadow-lg`
                      : 'bg-[#080512] text-slate-400 border-white/10 hover:border-white/30'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Description */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Mô tả chi tiết tác phẩm
            </label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Mô tả ý tưởng, vật liệu, ý nghĩa câu chuyện của tác phẩm..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#080512] border border-white/15 text-white text-xs focus:outline-none focus:border-[#ff4d6d] resize-none"
            />
          </div>

          {/* 5. Specifications */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300">
                Thông số kỹ thuật (Chất liệu, Kích thước, Đóng gói)
              </label>
              <button
                type="button"
                onClick={handleAddSpec}
                className="text-[11px] text-purple-300 hover:text-white flex items-center gap-1"
              >
                + Thêm dòng thông số
              </button>
            </div>

            <div className="space-y-1.5">
              {formData.specifications.map((spec, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={spec.label}
                    onChange={(e) => handleSpecChange(index, 'label', e.target.value)}
                    placeholder="Tên thông số (VD: Kích thước)"
                    className="w-1/3 px-3 py-1.5 rounded-lg bg-[#080512] border border-white/15 text-white text-xs"
                  />
                  <input
                    type="text"
                    value={spec.value}
                    onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                    placeholder="Giá trị (VD: Cao 11cm)"
                    className="flex-1 px-3 py-1.5 rounded-lg bg-[#080512] border border-white/15 text-white text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSpec(index)}
                    className="w-7 h-7 rounded-lg bg-red-900/20 hover:bg-red-900/40 text-red-300 flex items-center justify-center text-xs shrink-0"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-white/10 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 text-xs font-medium"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#c9184a] via-[#7209b7] to-[#00b4d8] hover:opacity-95 text-white text-xs font-bold shadow-[0_0_20px_rgba(201,24,74,0.4)]"
            >
              {product ? 'Lưu thay đổi' : 'Tạo sản phẩm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
