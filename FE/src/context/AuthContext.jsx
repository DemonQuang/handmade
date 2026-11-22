import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/apiService';

const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = 'LUNA_ADMIN_AUTH';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  });

  const isAuthenticated = Boolean(user);

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  // Login with Gmail & Password
  const loginWithEmail = async (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      throw new Error('Vui lòng nhập địa chỉ Gmail admin');
    }
    if (!cleanEmail.includes('@')) {
      throw new Error('Địa chỉ email không hợp lệ');
    }

    try {
      // Attempt backend API login first
      const res = await apiService.login(cleanEmail, password);
      if (res?.data?.token) {
        const adminUser = {
          ...res.data.user,
          token: res.data.token,
          loginMethod: 'GMAIL_API',
          avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjQcpXJruuqK1eDaAhMA3Fjo0lmoTYMNQDFmwwgW05T3g1GLS2uaMZKQa3MYbUgAoWKKHo_-Cw39GuStPIjWaa-dpc38d5sP7QPRoHJbU_rOpVxD_p8pappLU6pSnw5s0NXncW3rj3NRl6uOyuyOqF2pIR3b9b0-zTtqH0ukSlTxAE3f3qgNJY393aK4eK6kzDXlXK4iqVlBTfjmXCmHPadTp7Rh_L6X7EGiJuVWs',
          loggedInAt: new Date().toISOString(),
        };
        setUser(adminUser);
        return adminUser;
      }
    } catch (apiErr) {
      // If server rejected with a specific error (400, 401, 403), rethrow it
      if (apiErr.message && !apiErr.message.includes('Failed to fetch') && !apiErr.message.includes('NetworkError')) {
        throw apiErr;
      }
      console.warn('Backend offline, running local security check:', apiErr.message);
    }

    // Local Fallback Security Check
    if (cleanEmail !== 'admin.luna@gmail.com') {
      throw new Error(`Email "${cleanEmail}" không có quyền truy cập trang quản trị`);
    }

    if (password !== 'LunaCraft2025@') {
      throw new Error('Mật khẩu quản trị không chính xác');
    }

    const adminUser = {
      email: cleanEmail,
      displayName: 'Luna Admin',
      role: 'ADMIN',
      loginMethod: 'GMAIL_LOCAL',
      token: 'local_jwt_token_fallback',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjQcpXJruuqK1eDaAhMA3Fjo0lmoTYMNQDFmwwgW05T3g1GLS2uaMZKQa3MYbUgAoWKKHo_-Cw39GuStPIjWaa-dpc38d5sP7QPRoHJbU_rOpVxD_p8pappLU6pSnw5s0NXncW3rj3NRl6uOyuyOqF2pIR3b9b0-zTtqH0ukSlTxAE3f3qgNJY393aK4eK6kzDXlXK4iqVlBTfjmXCmHPadTp7Rh_L6X7EGiJuVWs',
      loggedInAt: new Date().toISOString(),
    };

    setUser(adminUser);
    return adminUser;
  };

  // One-click Google Sign-in simulation
  const loginWithGoogle = async (googleEmail = 'admin.luna@gmail.com') => {
    try {
      const res = await apiService.loginGoogle(googleEmail);
      if (res?.data?.token) {
        const adminUser = {
          ...res.data.user,
          token: res.data.token,
          loginMethod: 'GOOGLE_API',
          avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjQcpXJruuqK1eDaAhMA3Fjo0lmoTYMNQDFmwwgW05T3g1GLS2uaMZKQa3MYbUgAoWKKHo_-Cw39GuStPIjWaa-dpc38d5sP7QPRoHJbU_rOpVxD_p8pappLU6pSnw5s0NXncW3rj3NRl6uOyuyOqF2pIR3b9b0-zTtqH0ukSlTxAE3f3qgNJY393aK4eK6kzDXlXK4iqVlBTfjmXCmHPadTp7Rh_L6X7EGiJuVWs',
          loggedInAt: new Date().toISOString(),
        };
        setUser(adminUser);
        return adminUser;
      }
    } catch (apiErr) {
      if (apiErr.message && !apiErr.message.includes('Failed to fetch') && !apiErr.message.includes('NetworkError')) {
        throw apiErr;
      }
      console.warn('Backend loginGoogle unavailable, fallback to local:', apiErr.message);
    }

    if (googleEmail !== 'admin.luna@gmail.com') {
      throw new Error(`Tài khoản "${googleEmail}" không thuộc danh sách quản trị`);
    }

    const adminUser = {
      email: googleEmail,
      displayName: 'Luna Admin',
      role: 'ADMIN',
      loginMethod: 'GOOGLE_OAUTH_LOCAL',
      token: 'local_jwt_token_fallback',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjQcpXJruuqK1eDaAhMA3Fjo0lmoTYMNQDFmwwgW05T3g1GLS2uaMZKQa3MYbUgAoWKKHo_-Cw39GuStPIjWaa-dpc38d5sP7QPRoHJbU_rOpVxD_p8pappLU6pSnw5s0NXncW3rj3NRl6uOyuyOqF2pIR3b9b0-zTtqH0ukSlTxAE3f3qgNJY393aK4eK6kzDXlXK4iqVlBTfjmXCmHPadTp7Rh_L6X7EGiJuVWs',
      loggedInAt: new Date().toISOString(),
    };

    setUser(adminUser);
    return adminUser;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loginWithEmail,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
