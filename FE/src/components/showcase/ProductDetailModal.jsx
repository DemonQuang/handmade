import React, { useEffect } from 'react';

/**
 * Product Detail & Order Modal (Bottom Sheet / Drawer for Mobile)
 */
export const ProductDetailModal = ({ product, isOpen, onClose, contactPhone, contactZalo }) => {
  // Lock body scroll and listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const handleOrderZalo = () => {
    const text = encodeURIComponent(`Chào Luna, mình muốn đặt mua tác phẩm: ${product.title} (${product.priceDisplay}) trên trang cá nhân của bạn ✨`);
    let targetZalo = 'https://zalo.me/0908123456';
    if (contactZalo && contactZalo.trim()) {
      targetZalo = contactZalo.trim();
    } else if (contactPhone && contactPhone.trim()) {
      const cleanPhone = contactPhone.replace(/\D/g, '');
      targetZalo = `https://zalo.me/${cleanPhone}`;
    }
    const finalUrl = targetZalo.includes('?') ? `${targetZalo}&text=${text}` : `${targetZalo}?text=${text}`;
    window.open(finalUrl, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[420px] max-h-[90vh] overflow-y-auto bg-[#0d071b] border-t sm:border border-white/15 rounded-t-3xl sm:rounded-3xl p-5 text-slate-100 shadow-[0_-10px_40px_rgba(201,24,74,0.35)] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer drag handle on mobile */}
        <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-4" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 transition-colors"
          aria-label="Đóng chi tiết sản phẩm"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Product Image */}
        <div className="w-full aspect-square rounded-2xl overflow-hidden relative mb-4 bg-black/60 border border-white/10">
          <img
            src={product.image}
            alt={product.alt}
            className="w-full h-full object-cover"
          />
          <span 
            className={`absolute top-2 left-2 px-2 py-1 rounded-md bg-gradient-to-r ${product.badgeGradient} text-[10px] font-extrabold text-white leading-none shadow-lg`}
          >
            {product.badge}
          </span>
        </div>

        {/* Product Details Header */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <span className="text-[11px] font-semibold text-purple-300 uppercase tracking-wider block">
              {product.category}
            </span>
            <h3 className="font-serif text-xl font-bold text-white mt-0.5">
              {product.title}
            </h3>
          </div>
          <div className="text-right shrink-0">
            <span className={`text-xl font-extrabold ${product.priceColor} block leading-tight`}>
              {product.price}
            </span>
            <span className="text-[10px] text-emerald-400 font-medium">
              {product.stock}
            </span>
          </div>
        </div>

        {/* Product Description */}
        <p className="text-xs text-slate-300 leading-relaxed mt-2 mb-4 bg-white/[0.03] p-3 rounded-xl border border-white/5">
          {product.description}
        </p>

        {/* Specifications */}
        {product.specifications && (
          <div className="space-y-1.5 mb-5 text-[11px]">
            {product.specifications.map((spec, index) => (
              <div key={index} className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400 font-medium">{spec.label}</span>
                <span className="text-slate-200 text-right font-semibold">{spec.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-2">
          <button
            type="button"
            onClick={handleOrderZalo}
            className="w-full h-12 rounded-full bg-gradient-to-r from-[#ff4d6d] via-[#7209b7] to-[#00b4d8] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(201,24,74,0.5)] active:scale-98 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>Đặt Mua Trực Tiếp (Zalo 1:1)</span>
          </button>
          
          <button
            type="button"
            onClick={onClose}
            className="w-full h-10 rounded-full bg-white/10 hover:bg-white/15 text-white/80 font-medium text-xs flex items-center justify-center transition-colors"
          >
            Tiếp tục xem trang cá nhân
          </button>
        </div>
      </div>
    </div>
  );
};
