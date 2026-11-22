import React from 'react';
import { PublicView } from '../../pages/PublicView';

/**
 * Interactive iPhone Device Mockup Simulator
 * Embedded in Admin Studio for live real-time split-screen preview
 */
export const PhoneSimulator = () => {
  return (
    <div className="w-full flex flex-col items-center justify-start sticky top-20">
      {/* Simulator Header label */}
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-[#00b4d8] animate-ping" />
        <span className="text-xs uppercase font-extrabold tracking-widest text-slate-300">
          Xem trước di động (Live Preview)
        </span>
      </div>

      {/* Realistic iPhone Phone Shell */}
      <div className="relative w-[360px] h-[740px] rounded-[48px] p-3 bg-[#1e192c] border-4 border-[#3a2c5a] shadow-[0_0_50px_rgba(114,9,183,0.35),0_20px_40px_rgba(0,0,0,0.8)]">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-40 flex items-center justify-end px-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#0b1022] border border-[#1b254a]" />
        </div>

        {/* Inner Phone Screen */}
        <div className="w-full h-full rounded-[38px] overflow-hidden bg-[#05050b] relative">
          <div className="w-full h-full overflow-y-auto overflow-x-hidden">
            <PublicView isPreview={true} />
          </div>
        </div>

        {/* Home Indicator Bar */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full z-40 pointer-events-none" />
      </div>
    </div>
  );
};
