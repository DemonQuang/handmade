import React from 'react';

/**
 * About Me ("Một chút về mình") Glassmorphism Story Card
 */
export const AboutCard = ({ story }) => {
  return (
    <section className="w-full mt-4 p-3.5 rounded-2xl bg-[#0d0718]/80 backdrop-blur-xl border border-white/10 shadow-[0_0_20px_rgba(114,9,183,0.2)] text-left">
      <div className="flex items-center gap-2 mb-1.5">
        <span 
          className="material-symbols-outlined text-[17px] text-[#ff4d6d]" 
          style={{ filter: "drop-shadow(0 0 6px #c9184a)" }}
        >
          auto_awesome
        </span>
        <h3 className="text-xs font-bold uppercase tracking-wider text-white">
          Một chút về mình
        </h3>
      </div>
      <p className="text-[11.5px] leading-relaxed text-slate-300">
        {story}
      </p>
    </section>
  );
};
