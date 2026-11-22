import React, { useState, useEffect } from 'react';

/**
 * Compact Showcase Product Card (3-column layout on mobile)
 */
export const ProductCard = ({ product, onSelect }) => {
  const {
    title,
    priceDisplay,
    badge,
    badgeGradient,
    image,
    alt,
    cardBorder,
    glowShadow,
    priceColor,
    priceGlow
  } = product;

  const [imgSrc, setImgSrc] = useState(image);

  useEffect(() => {
    setImgSrc(image);
  }, [image]);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(product)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(product);
        }
      }}
      className={`group relative flex flex-col bg-[#0d0718]/90 backdrop-blur-xl rounded-2xl p-2 border ${cardBorder} ${glowShadow} transition-all cursor-pointer active:scale-95`}
    >
      {/* 1:1 Aspect ratio image container */}
      <div className="w-full aspect-square rounded-xl overflow-hidden mb-2 relative bg-black/50">
        <img
          src={imgSrc}
          alt={alt}
          onError={() => {
            // If local path fails, keep fallback from Stitch
            if (product.id === 'dragon-fantasy') {
              setImgSrc("https://lh3.googleusercontent.com/aida-public/AB6AXuBZqM-I6OW90j5B4bulp3OcRSN_PhXiB_3KBMoblXxf5tu2NhK2RHSUt-cDyBNEWav23IhJ32PhBaqSd8LXRM2RorMW9asTelH7vF0e2a2F8Tv0AM7eS68Gm08ESSv8-MlfM2RRHEwk1kJ6O_W-_H9HvX2a-QQIDz66XK59EnWgEYhBZf8XW8CJyoqoDLkh5-0mYUnWKJ9fzcGWBInDKC41pbUgp1Snv7h1J130wxg");
            } else if (product.id === 'ocean-lamp') {
              setImgSrc("https://lh3.googleusercontent.com/aida-public/AB6AXuAw3xj8duacx28hSkNwFFHg8v7OqpH_i1ibiwzCThQmJwpISPK9JzWPXBSObScIYtt-rUdIellYbmlJOJWgj83mGx8aLwLcC0xwFRm5Hc4hCx0DSBonTPo-bF_RT6EATugVdHntjq_FId12bB_KpZ6RXQxebF8fEbVbnhhShpFXqCRyagj4OzKQ9IpPiZ6q2c0aNvyLhP3O2SGWwx_5OK31Oq70ON5Imuyl5fK0tgM");
            } else {
              setImgSrc("https://lh3.googleusercontent.com/aida-public/AB6AXuCEfvgINR3TO7qP5UGfwtQ9xBvnATXYpITKskqZF7Ohjpt1IpD-u1A8_stwdEV4jmyErXOnEo29eHTlO40eFCRy6as2aqO9dipw_ZobYQkPBSNtq_mz57f5KCFCPwOhU8933ECHofyGd6dZdcnRCIO_8IoeTDkNjsHWe3TaQm4I-TMo41KdqZGp6R_vBpVwS5RtUNqzQeNLPXAftApKLkVOOkCxz6__0UE1fMy1gYA");
            }
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badge in top corner */}
        <span 
          className={`absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-gradient-to-r ${badgeGradient} text-[9px] font-extrabold text-white leading-none shadow-[0_0_10px_rgba(201,24,74,0.8)]`}
        >
          {badge}
        </span>
      </div>

      {/* Product Title */}
      <p className="text-[11px] font-bold text-slate-100 truncate">
        {title}
      </p>

      {/* Glowing Price */}
      <span 
        className={`text-[12px] font-extrabold ${priceColor} mt-0.5`} 
        style={{ filter: priceGlow }}
      >
        {priceDisplay}
      </span>
    </div>
  );
};
