import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ProductFormModal } from './ProductFormModal';

/**
 * Products & Catalog Manager
 */
export const ProductsEditor = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useData();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    } else {
      addProduct(productData);
    }
  };

  const handleDelete = (prod) => {
    if (confirm(`Bạn có chắc muốn xóa tác phẩm "${prod.title}" khỏi danh mục?`)) {
      deleteProduct(prod.id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-purple-200 flex items-center gap-2">
            <span className="material-symbols-outlined text-[19px] text-[#ff4d6d]">palette</span>
            Quản lý tác phẩm nghệ thuật thủ công ({products.length})
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Các tác phẩm này sẽ xuất hiện trong mục "Tác Phẩm Nổi Bật" trên trang Link-in-Bio
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#ff4d6d] to-[#00b4d8] hover:opacity-95 text-white text-xs font-bold shadow-[0_0_15px_rgba(201,24,74,0.4)] active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[17px]">add</span>
          <span>Thêm Tác Phẩm</span>
        </button>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="p-8 rounded-2xl bg-[#120a22]/60 border border-white/10 text-center text-slate-400">
          <span className="material-symbols-outlined text-4xl text-purple-400 mb-2">inventory_2</span>
          <p className="text-sm font-semibold">Chưa có tác phẩm nào trong danh mục</p>
          <p className="text-xs text-slate-500 mt-1">Bấm nút "Thêm Tác Phẩm" phía trên để tạo tác phẩm đầu tiên</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {products.map((prod) => (
            <div
              key={prod.id}
              className={`p-4 rounded-2xl bg-[#120a22]/90 border ${prod.cardBorder || 'border-white/10'} backdrop-blur-xl shadow-lg transition-all flex flex-col justify-between`}
            >
              <div className="flex gap-3.5">
                {/* Product Thumbnail */}
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-black/60 border border-white/15 relative shrink-0">
                  <img
                    src={prod.image}
                    alt={prod.alt || prod.title}
                    className="w-full h-full object-cover"
                  />
                  <span className={`absolute top-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-extrabold text-white leading-none bg-gradient-to-r ${prod.badgeGradient}`}>
                    {prod.badge}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase font-bold text-purple-300 tracking-wider block">
                    {prod.category}
                  </span>
                  <h4 className="text-sm font-bold text-white truncate mt-0.5">
                    {prod.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-sm font-extrabold ${prod.priceColor || 'text-[#ff4d6d]'}`}>
                      {prod.priceDisplay || prod.price}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      • {prod.stock}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-snug">
                    {prod.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 mt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => openEditModal(prod)}
                  className="px-3 py-1.5 rounded-xl bg-purple-900/30 hover:bg-purple-900/50 text-purple-200 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <span className="material-symbols-outlined text-[15px]">edit</span>
                  <span>Chỉnh sửa</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(prod)}
                  className="px-3 py-1.5 rounded-xl bg-red-900/20 hover:bg-red-900/40 text-red-300 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <span className="material-symbols-outlined text-[15px]">delete</span>
                  <span>Xóa</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        onSave={handleSave}
      />
    </div>
  );
};
