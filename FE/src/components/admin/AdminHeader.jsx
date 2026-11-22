import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Admin Top Navigation Bar with admin Gmail identity, logout and preview shortcut
 */
export const AdminHeader = ({ onToggleMobilePreview, isMobilePreviewOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (confirm('Bạn có chắc chắn muốn đăng xuất khỏi trang quản trị?')) {
      logout();
      navigate('/login');
    }
  };

  return (
    <header className="w-full bg-[#0d071b]/95 border-b border-white/10 px-4 sm:px-6 py-3 backdrop-blur-xl sticky top-0 z-40 flex items-center justify-between">
      {/* Brand & Studio Title */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#ff4d6d] via-[#7209b7] to-[#00b4d8] p-[2px] shadow-[0_0_15px_rgba(201,24,74,0.4)]">
          <div className="w-full h-full rounded-full bg-[#080512] flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-[19px] text-[#ff4d6d]">
              auto_fix_high
            </span>
          </div>
        </div>
        <div>
          <h1 className="text-sm sm:text-base font-bold text-white leading-tight flex items-center gap-2">
            <span>Luna Creator Studio</span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ff4d6d]/20 text-[#ff758f] border border-[#ff4d6d]/30">
              Admin
            </span>
          </h1>
          <p className="text-[11px] text-slate-400">
            Quản trị trang Link-in-Bio & Cửa hàng thủ công
          </p>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2.5">
        {/* Admin Gmail badge */}
        {user?.email && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#160d2e] border border-white/15 text-xs text-slate-200 shadow-inner">
            <span className="material-symbols-outlined text-[16px] text-[#00b4d8]">
              account_circle
            </span>
            <span className="font-semibold text-purple-200 truncate max-w-[170px]" title={user.email}>
              {user.email}
            </span>
          </div>
        )}

        {/* Mobile Preview toggle button (for small screens) */}
        <button
          type="button"
          onClick={onToggleMobilePreview}
          className="lg:hidden flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-purple-900/40 hover:bg-purple-900/60 border border-purple-500/40 text-purple-200 text-xs font-semibold active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[17px]">
            {isMobilePreviewOpen ? 'edit' : 'smartphone'}
          </span>
          <span className="hidden sm:inline">{isMobilePreviewOpen ? 'Đóng xem' : 'Xem thử'}</span>
        </button>

        {/* View Public Live Page */}
        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition-all"
        >
          <span>Xem Web</span>
          <span className="material-symbols-outlined text-[15px]">
            open_in_new
          </span>
        </Link>

        {/* Logout Button */}
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-900/25 hover:bg-red-900/40 border border-red-500/30 text-red-300 text-xs font-semibold transition-all active:scale-95 cursor-pointer"
          title="Đăng xuất quản trị"
        >
          <span className="material-symbols-outlined text-[16px]">logout</span>
          <span className="hidden sm:inline">Đăng xuất</span>
        </button>
      </div>
    </header>
  );
};
