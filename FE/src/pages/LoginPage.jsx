import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CosmicNebula } from '../components/background/CosmicNebula';
import { StardustSparkles } from '../components/background/StardustSparkles';

export const LoginPage = () => {
  const { loginWithEmail, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await loginWithEmail(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Đăng nhập không thành công');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle('admin.luna@gmail.com');
      navigate(from, { replace: true });
    } catch (err) {
      setError('Đăng nhập Google thất bại');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin.luna@gmail.com');
    setPassword('LunaCraft2025@');
  };

  return (
    <div className="min-h-screen bg-[#05050b] text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-[#ff4d6d]/40 selection:text-white">
      {/* Background Effects */}
      <CosmicNebula />
      <StardustSparkles />

      {/* Login Card */}
      <div className="w-full max-w-[420px] rounded-3xl bg-[#0e071c]/90 border border-white/15 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_0_50px_rgba(201,24,74,0.35),0_0_80px_rgba(114,9,183,0.3)] z-10 relative">
        {/* Halo Glow Decor */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#ff4d6d] via-[#7209b7] to-[#00b4d8] p-[2.5px] mx-auto mb-4 shadow-[0_0_30px_rgba(201,24,74,0.6)] animate-pulse">
          <div className="w-full h-full rounded-full bg-[#080512] flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-[30px] text-[#ff4d6d]" style={{ filter: 'drop-shadow(0 0 8px #c9184a)' }}>
              lock
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="font-serif text-2xl font-bold text-white tracking-tight drop-shadow-md">
            Luna Creator Studio
          </h1>
          <p className="text-xs text-purple-200/80 mt-1">
            Đăng nhập bằng Gmail để quản lý cửa hàng thủ công
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-900/30 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-[17px]">error</span>
            <span>{error}</span>
          </div>
        )}

        {/* 1. Fast Google / Gmail Login Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full h-12 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs flex items-center justify-center gap-3 shadow-lg active:scale-98 transition-all cursor-pointer mb-4"
        >
          {/* Official Google G SVG */}
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Đăng nhập bằng Google / Gmail</span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-[1px] bg-white/10" />
          <span className="text-[11px] uppercase tracking-wider text-slate-400">hoặc qua Gmail</span>
          <div className="flex-1 h-[1px] bg-white/10" />
        </div>

        {/* 2. Email / Password Form */}
        <form onSubmit={handleEmailSubmit} className="space-y-3.5">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Địa chỉ Gmail Admin
            </label>
            <div className="relative">
              <span className="material-symbols-outlined text-[18px] text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2">
                mail
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin.luna@gmail.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#06030d] border border-white/15 text-white text-xs focus:outline-none focus:border-[#ff4d6d] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Mật khẩu quản trị
            </label>
            <div className="relative">
              <span className="material-symbols-outlined text-[18px] text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2">
                key
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#06030d] border border-white/15 text-white text-xs focus:outline-none focus:border-[#ff4d6d] transition-colors"
              />
            </div>
          </div>

          {/* Quick Demo Autofill */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[11px] text-[#ff758f] hover:underline cursor-pointer"
            >
              Điền tài khoản Admin mẫu
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-gradient-to-r from-[#ff4d6d] via-[#7209b7] to-[#00b4d8] hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(201,24,74,0.4)] active:scale-98 transition-all cursor-pointer mt-2"
          >
            {loading ? 'Đang xác thực...' : 'Đăng Nhập Quản Trị'}
          </button>
        </form>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Quay lại trang người dùng</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
