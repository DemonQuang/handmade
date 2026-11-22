import React from 'react';

/**
 * Top action row header with flare effect icon and share button
 */
export const HeaderActionRow = ({ onShare }) => {
  return (
    <header className="w-full flex items-center justify-between pt-2 pb-4">
      {/* Decorative flare button */}
      <div 
        className="w-10 h-10 rounded-full bg-[#120a22]/80 hover:bg-[#1f113a]/90 backdrop-blur-xl border border-white/15 flex items-center justify-center text-white/90 shadow-[0_0_15px_rgba(201,24,74,0.3)] transition-all cursor-default"
        title="Luna Handmade • Galaxy Portal"
      >
        <span 
          className="material-symbols-outlined text-[20px] text-[#ff4d6d]" 
          style={{ filter: "drop-shadow(0 0 8px #c9184a)" }}
        >
          flare
        </span>
      </div>

      {/* Share button */}
      <button
        type="button"
        aria-label="Chia sẻ liên kết"
        onClick={onShare}
        className="w-10 h-10 rounded-full bg-[#120a22]/80 hover:bg-[#1f113a]/90 active:scale-95 backdrop-blur-xl border border-white/15 flex items-center justify-center text-white/90 shadow-[0_0_15px_rgba(0,180,216,0.3)] transition-all cursor-pointer"
        id="btn-share"
      >
        <span className="material-symbols-outlined text-[19px]">
          ios_share
        </span>
      </button>
    </header>
  );
};
