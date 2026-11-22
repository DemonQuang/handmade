import React from 'react';
import { ProductCard } from './ProductCard';

/**
 * Compact Featured Products Showcase Section
 */
export const ProductShowcase = ({ products, onSelectProduct }) => {
  return (
    <section className="w-full mt-8 mb-3" id="featured-products">
      {/* Showcase Section Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-xs uppercase font-extrabold tracking-widest text-slate-200 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#ff4d6d] via-[#7209b7] to-[#00b4d8] shadow-[0_0_12px_#ff4d6d] animate-pulse" />
          Tác Phẩm Nổi Bật
        </h2>
        <span className="text-[11px] font-semibold text-[#ffccd5] flex items-center gap-1">
          <span className="material-symbols-outlined text-[13px] text-[#ff4d6d]">
            sparkles
          </span>
          Thủ công 100%
        </span>
      </div>

      {/* 3-column Grid for Mobile */}
      <div className="grid grid-cols-3 gap-2.5">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={onSelectProduct}
          />
        ))}
      </div>
    </section>
  );
};
