import React, { useState, useEffect } from 'react';

/**
 * Artisan Halo Avatar with 3-color radiant galaxy glow & verified badge
 */
export const HaloAvatar = ({ avatarSrc, altText = "Luna Handmade Artist" }) => {
  const [imgSrc, setImgSrc] = useState(avatarSrc);

  useEffect(() => {
    setImgSrc(avatarSrc);
  }, [avatarSrc]);

  const handleImageError = () => {
    // Fallback if local image path fails
    setImgSrc("https://lh3.googleusercontent.com/aida-public/AB6AXuCjQcpXJruuqK1eDaAhMA3Fjo0lmoTYMNQDFmwwgW05T3g1GLS2uaMZKQa3MYbUgAoWKKHo_-Cw39GuStPIjWaa-dpc38d5sP7QPRoHJbU_rOpVxD_p8pappLU6pSnw5s0NXncW3rj3NRl6uOyuyOqF2pIR3b9b0-zTtqH0ukSlTxAE3f3qgNJY393aK4eK6kzDXlXK4iqVlBTfjmXCmHPadTp7Rh_L6X7EGiJuVWs");
  };

  return (
    <div className="relative mb-4 group cursor-pointer">
      {/* Vibrant Multi-layer Halo Ring */}
      <div 
        className="absolute -inset-3.5 rounded-full bg-gradient-to-tr from-[#c9184a] via-[#7209b7] via-[#0077b6] to-[#00b4d8] opacity-95 blur-xl group-hover:opacity-100 group-hover:blur-2xl transition-all animate-pulse shadow-[0_0_40px_rgba(201,24,74,0.7),0_0_35px_rgba(114,9,183,0.7),0_0_35px_rgba(0,119,182,0.7)]" 
      />

      {/* Sparkling 4-point Diamond Star Accents around Avatar */}
      <div className="absolute -top-2 -right-2 z-20 pointer-events-none animate-pulse">
        <svg fill="none" height="22" viewBox="0 0 20 20" width="22">
          <path
            d="M10 0 Q10 10 0 10 Q10 10 10 20 Q10 10 20 10 Q10 10 10 0 Z"
            fill="#fff5f7"
            filter="drop-shadow(0 0 7px #ff4d6d) drop-shadow(0 0 12px #c9184a)"
          />
        </svg>
      </div>

      <div className="absolute -bottom-1 -left-2 z-20 pointer-events-none animate-pulse" style={{ animationDelay: '1.2s' }}>
        <svg fill="none" height="18" viewBox="0 0 20 20" width="18">
          <path
            d="M10 0 Q10 10 0 10 Q10 10 10 20 Q10 10 20 10 Q10 10 10 0 Z"
            fill="#e0f2fe"
            filter="drop-shadow(0 0 6px #00b4d8) drop-shadow(0 0 12px #0077b6)"
          />
        </svg>
      </div>

      <div className="absolute top-1/2 -right-3 -translate-y-1/2 z-20 pointer-events-none animate-pulse" style={{ animationDelay: '2s' }}>
        <svg fill="none" height="14" viewBox="0 0 20 20" width="14">
          <path
            d="M10 0 Q10 10 0 10 Q10 10 10 20 Q10 10 20 10 Q10 10 10 0 Z"
            fill="#faf5ff"
            filter="drop-shadow(0 0 6px #d946ef)"
          />
        </svg>
      </div>

      {/* Avatar Image Container with Gradient Rim */}
      <div className="relative w-24 h-24 rounded-full p-[2.5px] bg-gradient-to-tr from-[#ff4d6d] via-[#7209b7] to-[#00b4d8] shadow-2xl">
        <img
          src={imgSrc}
          alt={altText}
          onError={handleImageError}
          className="w-full h-full rounded-full object-cover shadow-inner"
        />

        {/* Verified Artisan Badge */}
        <div 
          className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-gradient-to-r from-[#c9184a] to-[#7209b7] flex items-center justify-center text-white shadow-lg border-2 border-[#05050b]" 
          title="Nghệ nhân xác minh"
        >
          <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            verified
          </span>
        </div>
      </div>
    </div>
  );
};
