import React from 'react';

/**
 * Sparkling Diamond Stars & Shimmering Dust Vector
 * 4-Point Diamond Sparkles with glowing drop shadows matching DESIGN.md
 */
export const StardustSparkles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        {/* 4-Point Diamond Sparkles Group 1 */}
        <g className="animate-pulse" style={{ animationDuration: '3s' }}>
          {/* Top Left Wine Diamond */}
          <path
            d="M75 55 Q75 68 62 68 Q75 68 75 81 Q75 68 88 68 Q75 68 75 55 Z"
            fill="#fff5f7"
            filter="drop-shadow(0 0 9px #ff4d6d) drop-shadow(0 0 16px #c9184a)"
          />
          {/* Top Right Blue Diamond */}
          <path
            d="M340 70 Q340 84 326 84 Q340 84 340 98 Q340 84 354 84 Q340 84 340 70 Z"
            fill="#f0f9ff"
            filter="drop-shadow(0 0 9px #00b4d8) drop-shadow(0 0 15px #0077b6)"
          />
          {/* Mid Left Purple Diamond */}
          <path
            d="M40 260 Q40 274 26 274 Q40 274 40 288 Q40 274 54 274 Q40 274 40 260 Z"
            fill="#faf5ff"
            filter="drop-shadow(0 0 9px #d946ef) drop-shadow(0 0 16px #7209b7)"
          />
          {/* Mid Right Wine Diamond */}
          <path
            d="M370 420 Q370 435 355 435 Q370 435 370 450 Q370 435 385 435 Q370 435 370 420 Z"
            fill="#fff5f7"
            filter="drop-shadow(0 0 10px #ff4d6d) drop-shadow(0 0 18px #c9184a)"
          />
          {/* Lower Left Cyan Diamond */}
          <path
            d="M55 580 Q55 593 42 593 Q55 593 55 606 Q55 593 68 593 Q55 593 55 580 Z"
            fill="#e0f2fe"
            filter="drop-shadow(0 0 8px #00b4d8) drop-shadow(0 0 14px #0077b6)"
          />
          {/* Lower Right Purple Diamond */}
          <path
            d="M335 730 Q335 744 321 744 Q335 744 335 758 Q335 744 349 744 Q335 744 335 730 Z"
            fill="#faf5ff"
            filter="drop-shadow(0 0 9px #b5179e) drop-shadow(0 0 16px #7209b7)"
          />
          {/* Bottom Gold Diamond */}
          <path
            d="M190 860 Q190 873 177 873 Q190 873 190 886 Q190 873 203 873 Q190 873 190 860 Z"
            fill="#fffbeb"
            filter="drop-shadow(0 0 8px #fde047) drop-shadow(0 0 14px #f59e0b)"
          />
        </g>

        {/* 4-Point Diamond Sparkles Group 2 (Avatar surroundings & staggered) */}
        <g className="animate-pulse" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }}>
          <path
            d="M115 155 Q115 166 104 166 Q115 166 115 177 Q115 166 126 166 Q115 166 115 155 Z"
            fill="#ffffff"
            filter="drop-shadow(0 0 8px #ff4d6d)"
          />
          <path
            d="M295 150 Q295 162 283 162 Q295 162 295 174 Q295 162 307 162 Q295 162 295 150 Z"
            fill="#ffffff"
            filter="drop-shadow(0 0 8px #00b4d8)"
          />
          <path
            d="M330 290 Q330 302 318 302 Q330 302 330 314 Q330 302 342 302 Q330 302 330 290 Z"
            fill="#fff5f7"
            filter="drop-shadow(0 0 8px #ff4d6d)"
          />
          <path
            d="M85 460 Q85 472 73 472 Q85 472 85 484 Q85 472 97 472 Q85 472 85 460 Z"
            fill="#f0f9ff"
            filter="drop-shadow(0 0 8px #0077b6)"
          />
          <path
            d="M305 615 Q305 628 292 628 Q305 628 305 641 Q305 628 318 628 Q305 628 305 615 Z"
            fill="#faf5ff"
            filter="drop-shadow(0 0 9px #7209b7)"
          />
        </g>

        {/* Crisp Stardust Points */}
        <circle cx="45" cy="110" fill="#fff" filter="drop-shadow(0 0 3px #ff4d6d)" opacity="0.95" r="1.6" />
        <circle cx="215" cy="45" fill="#fff" filter="drop-shadow(0 0 4px #00b4d8)" opacity="0.9" r="2" />
        <circle cx="365" cy="130" fill="#fff" filter="drop-shadow(0 0 3px #00b4d8)" opacity="0.9" r="1.8" />
        <circle cx="28" cy="380" fill="#fff" filter="drop-shadow(0 0 4px #c9184a)" opacity="0.95" r="2" />
        <circle cx="385" cy="340" fill="#fff" filter="drop-shadow(0 0 4px #7209b7)" opacity="0.9" r="2.2" />
        <circle cx="22" cy="520" fill="#fff" filter="drop-shadow(0 0 3px #0077b6)" opacity="0.85" r="1.7" />
        <circle cx="390" cy="530" fill="#fff" filter="drop-shadow(0 0 4px #ff4d6d)" opacity="0.9" r="2" />
        <circle cx="50" cy="690" fill="#fff" filter="drop-shadow(0 0 4px #00b4d8)" opacity="0.95" r="2.2" />
        <circle cx="360" cy="680" fill="#fff" filter="drop-shadow(0 0 4px #c9184a)" opacity="0.9" r="1.8" />
        <circle cx="140" cy="800" fill="#fff" filter="drop-shadow(0 0 3px #7209b7)" opacity="0.85" r="2" />
        <circle cx="270" cy="820" fill="#fff" filter="drop-shadow(0 0 4px #00b4d8)" opacity="0.95" r="2.2" />
      </svg>
    </div>
  );
};
