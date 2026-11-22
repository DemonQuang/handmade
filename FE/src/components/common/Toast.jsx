import React from 'react';

/**
 * Floating copy notification toast with glassmorphism style
 */
export const Toast = ({ show, message = "Đã sao chép liên kết trang!" }) => {
  return (
    <div
      id="copy-toast"
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#140b24]/95 text-white border border-[#ff4d6d]/50 px-4 py-2 rounded-full shadow-[0_0_25px_rgba(201,24,74,0.5)] flex items-center gap-2 text-xs font-medium backdrop-blur-xl z-50 transition-all duration-300 pointer-events-none ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      <span className="material-symbols-outlined text-[16px] text-[#ff4d6d]" style={{ fontVariationSettings: "'FILL' 1" }}>
        check_circle
      </span>
      <span>{message}</span>
    </div>
  );
};
