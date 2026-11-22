import React from 'react';

/**
 * Vibrant Deep Space Galaxy Nebula Background
 * 6 swirling nebula gradients combining Burgundy, Sapphire Blue, and Ultraviolet
 */
export const CosmicNebula = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Deep Space Base */}
      <div className="absolute inset-0 bg-[#05050b]" />

      {/* Swirling Nebula 1: Wine Red / Burgundy (Top & Center Left) */}
      <div 
        className="absolute -top-32 -left-24 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-[#ff4d6d]/70 via-[#c9184a]/60 to-[#800f2f]/50 blur-[75px] mix-blend-screen opacity-90 animate-pulse" 
        style={{ animationDuration: '6s' }} 
      />

      {/* Swirling Nebula 2: Deep Cosmic Sapphire & Neon Cyan (Top Right & Middle Right) */}
      <div className="absolute top-10 -right-28 w-[460px] h-[490px] rounded-full bg-gradient-to-bl from-[#00b4d8]/65 via-[#0077b6]/75 to-[#0b1354]/85 blur-[75px] mix-blend-screen opacity-90" />

      {/* Swirling Nebula 3: Galaxy Purple & Ultraviolet (Center & Around Avatar) */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-gradient-to-r from-[#7209b7]/75 via-[#b5179e]/60 to-[#3a0ca3]/75 blur-[80px] mix-blend-screen opacity-85" />

      {/* Swirling Nebula 4: Crimson / Burgundy Mid Section (Body & Capsules) */}
      <div className="absolute top-[44%] -left-28 w-[450px] h-[460px] rounded-full bg-gradient-to-tr from-[#a4133c]/70 via-[#800f2f]/65 to-[#3a0ca3]/60 blur-[80px] mix-blend-screen opacity-80" />

      {/* Swirling Nebula 5: Electric Blue & Ultraviolet Lower Section */}
      <div className="absolute top-[60%] -right-24 w-[480px] h-[480px] rounded-full bg-gradient-to-tl from-[#0077b6]/70 via-[#560bad]/70 to-[#0b1354]/80 blur-[85px] mix-blend-screen opacity-85" />

      {/* Swirling Nebula 6: Bottom Galaxy Cauldron (Wine, Purple, Blue Blend) */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[520px] h-[480px] rounded-full bg-gradient-to-t from-[#c9184a]/60 via-[#7209b7]/65 to-[#0077b6]/55 blur-[80px] mix-blend-screen opacity-90" />
    </div>
  );
};
