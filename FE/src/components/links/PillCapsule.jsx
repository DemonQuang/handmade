import React from 'react';

/**
 * Pill Capsule Button Component
 * Supports both Primary Hero Storefront CTA and standard Social Media Link Pills
 */
export const PillCapsule = ({ link, onHeroClick }) => {
  const {
    id,
    isHero,
    title,
    subtitle,
    url,
    icon,
    iconColor,
    iconBorder,
    gradientBorder,
    shadow,
    badgePing
  } = link;

  const formatUrl = (rawUrl) => {
    if (!rawUrl || rawUrl === '#') return '#';
    const trimmed = rawUrl.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('//')) {
      return trimmed;
    }
    return `https://${trimmed}`;
  };

  const targetUrl = formatUrl(url);

  if (isHero) {
    return (
      <a
        href={targetUrl}
        onClick={(e) => {
          if (onHeroClick) {
            e.preventDefault();
            onHeroClick();
          }
        }}
        className={`group relative w-full h-[68px] rounded-full p-[2px] bg-gradient-to-r ${gradientBorder} ${shadow} active:scale-[0.985] transition-all cursor-pointer block`}
      >
        <div className="w-full h-full rounded-full bg-[#0a0614]/95 backdrop-blur-2xl px-3.5 flex items-center justify-between group-hover:bg-[#140b27]/90 transition-colors">
          {/* Hero Left Icon */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#c9184a] via-[#7209b7] to-[#00b4d8] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#c9184a]/50 relative">
            <span className="material-symbols-outlined text-[24px]">
              {icon}
            </span>
            {badgePing && (
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#ff4d6d] animate-ping opacity-85" />
            )}
          </div>

          {/* Hero Center Text */}
          <div className="flex-1 px-3 text-center min-w-0">
            <div className="flex items-center justify-center gap-1.5">
              <span className="text-[13px] font-extrabold tracking-wider text-white uppercase truncate">
                {title}
              </span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00b4d8] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff4d6d]" />
              </span>
            </div>
            <p className="text-[11px] font-semibold text-[#ffccd5] truncate flex items-center justify-center gap-1 mt-0.5">
              <span>{subtitle}</span>
            </p>
          </div>

          {/* Hero Right Arrow */}
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 group-hover:text-white transition-colors shrink-0">
            <span className="material-symbols-outlined text-[20px]">
              chevron_right
            </span>
          </div>
        </div>
      </a>
    );
  }

  // Standard Social Media Capsule
  return (
    <a
      href={targetUrl}
      target={targetUrl === '#' ? undefined : "_blank"}
      rel="noopener noreferrer"
      onClick={(e) => {
        if (targetUrl === '#') e.preventDefault();
      }}
      className={`group relative w-full h-[62px] rounded-full p-[1.5px] bg-gradient-to-r ${gradientBorder} active:scale-[0.985] ${shadow} transition-all cursor-pointer block`}
    >
      <div className="w-full h-full rounded-full bg-[#0b0716]/90 backdrop-blur-xl px-3.5 flex items-center justify-between group-hover:bg-[#140b24]/90 transition-colors">
        {/* Left Icon with soft glowing border */}
        <div 
          className={`w-11 h-11 rounded-full bg-[#06040d] border ${iconBorder} flex items-center justify-center shrink-0 ${iconColor} group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(201,24,74,0.4)]`}
        >
          <span className="material-symbols-outlined text-[22px]">
            {icon}
          </span>
        </div>

        {/* Center Title */}
        <div className="flex-1 px-3 text-center min-w-0">
          <span className="text-[14px] font-semibold text-white group-hover:text-white truncate block">
            {title}
          </span>
        </div>

        {/* Right Action Menu Icon */}
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 group-hover:text-white transition-colors shrink-0">
          <span className="material-symbols-outlined text-[19px]">
            more_vert
          </span>
        </div>
      </div>
    </a>
  );
};
