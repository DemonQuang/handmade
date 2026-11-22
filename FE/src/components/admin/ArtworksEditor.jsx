import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ProductFormModal } from './ProductFormModal';

/**
 * Tab: Quản lý & Thêm Ảnh Tác Phẩm Nghệ Thuật (Artworks & Gallery)
 */
export const ArtworksEditor = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useData();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quickUploadToast, setQuickUploadToast] = useState('');

  const openAddModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSave = (productData) => {
    if (selectedProduct) {
      updateProduct(selectedProduct.id, productData);
      showToast('Đã cập nhật tác phẩm thành công! ✨');
    } else {
      addProduct(productData);
      showToast('Đã thêm ảnh tác phẩm mới thành công! ✨');
    }
  };

  const handleDelete = (prod) => {
    if (confirm(`Bạn có chắc muốn xóa tác phẩm "${prod.title}" khỏi danh mục?`)) {
      deleteProduct(prod.id);
      showToast(`Đã xóa tác phẩm "${prod.title}"`);
    }
  };

  const showToast = (msg) => {
    setQuickUploadToast(msg);
    setTimeout(() => setQuickUploadToast(''), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {quickUploadToast && (
        <div className="fixed top-16 right-6 z-50 bg-[#160d2e] border border-[#ff4d6d]/60 text-white px-4 py-2.5 rounded-2xl shadow-[0_0_20px_rgba(201,24,74,0.5)] text-xs font-semibold flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[18px] text-[#ff4d6d]">check_circle</span>
          <span>{quickUploadToast}</span>
        </div>
      )}

      {/* Top Banner with Prominent "+ Thêm Ảnh Tác Phẩm Mới" button */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#170a2a] via-[#210c3b] to-[#0c183d] border border-white/15 backdrop-blur-xl shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px] text-[#ff4d6d]">photo_library</span>
            <span>Bộ Sưu Tập & Tác Phẩm Thủ Công ({products.length})</span>
          </h3>
          <p className="text-xs text-purple-200/80 mt-1 leading-relaxed">
            Thêm ảnh chụp tác phẩm đất sét nung, resin, móc khóa để hiển thị trong mục <strong>"Tác Phẩm Nổi Bật"</strong> trên trang Bio.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="shrink-0 flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#ff4d6d] via-[#7209b7] to-[#00b4d8] hover:opacity-95 text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_25px_rgba(201,24,74,0.5)] active:scale-95 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[19px]">add_a_photo</span>
          <span>Thêm Ảnh Tác Phẩm Mới</span>
        </button>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="p-12 rounded-3xl bg-[#120a22]/60 border border-white/10 text-center text-slate-400">
          <span className="material-symbols-outlined text-5xl text-purple-400 mb-2">collections</span>
          <p className="text-sm font-bold text-white">Chưa có tác phẩm nào</p>
          <p className="text-xs text-slate-400 mt-1">Bấm nút "Thêm Ảnh Tác Phẩm Mới" phía trên để tải ảnh đầu tiên lên</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((prod) => (
            <div
              key={prod.id}
              className={`p-3.5 rounded-2xl bg-[#120a22]/90 border ${prod.cardBorder || 'border-white/10'} backdrop-blur-xl shadow-lg transition-all flex flex-col justify-between group hover:border-[#ff4d6d]`}
            >
              <div>
                {/* 1:1 Large Square Image */}
                <div className="w-full aspect-square rounded-xl overflow-hidden bg-black/60 border border-white/15 relative mb-3">
                  <img
                    src={prod.image}
                    alt={prod.alt || prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Badge */}
                  <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-extrabold text-white leading-none bg-gradient-to-r ${prod.badgeGradient} shadow-md`}>
                    {prod.badge}
                  </span>
                  {/* Price Tag Overlay */}
                  <span className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-xs font-extrabold text-white border border-white/15 shadow-lg">
                    {prod.priceDisplay || prod.price}
                  </span>
                </div>

                {/* Info */}
                <div>
                  <span className="text-[10px] uppercase font-bold text-purple-300 tracking-wider block">
                    {prod.category}
                  </span>
                  <h4 className="text-sm font-bold text-white truncate mt-0.5">
                    {prod.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {prod.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/10">
                <span className="text-[10px] text-emerald-400 font-medium">
                  {prod.stock || 'Còn hàng'}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => openEditModal(prod)}
                    className="px-2.5 py-1.5 rounded-lg bg-purple-900/30 hover:bg-purple-900/50 text-purple-200 text-xs font-medium flex items-center gap-1 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[14px]">edit</span>
                    <span>Sửa</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(prod)}
                    className="px-2.5 py-1.5 rounded-lg bg-red-900/20 hover:bg-red-900/40 text-red-300 text-xs font-medium flex items-center gap-1 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[14px]">delete</span>
                    <span>Xóa</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        onSave={handleSave}
      />
    </div>
  );
};
