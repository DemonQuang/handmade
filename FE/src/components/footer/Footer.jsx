import React from 'react';

/**
 * Footer with Platform Badge & Copyright
 */
export const Footer = ({ platformBadge, copyright }) => {
  return (
    <footer className="w-full pt-6 pb-2 flex flex-col items-center justify-center text-center mt-auto">
      {/* Platform Badge */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0d081b]/90 border border-white/15 text-slate-300 text-xs font-medium shadow-[0_0_20px_rgba(201,24,74,0.3)] backdrop-blur-md">
        <span 
          className="material-symbols-outlined text-[15px] text-[#ff4d6d]" 
          style={{ filter: "drop-shadow(0 0 6px #ff4d6d)" }}
        >
          star
        </span>
        <span>{platformBadge}</span>
      </div>

      {/* Copyright */}
      <p className="text-[11px] text-slate-400 mt-2.5 font-normal tracking-wide">
        {copyright}
      </p>
    </footer>
  );
};
