const getApiBase = () => {
  if (import.meta.env?.VITE_API_URL) return import.meta.env.VITE_API_URL;
  if (typeof window !== 'undefined' && (window.location.port === '3000' || window.location.port === '5173')) {
    return '/api';
  }
  return 'http://localhost:5000/api';
};

const API_BASE = getApiBase();

/**
 * Luna Handmade — REST API Client Service
 * Kết nối đồng bộ với Backend Express & TypeScript (http://localhost:5000/api)
 */
export const apiService = {
  // Check Backend server health
  async checkHealth() {
    try {
      const res = await this.request('/health');
      return res?.success === true;
    } catch {
      return false;
    }
  },

  // Helper for requests
  async request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    };

    // If body is FormData, delete Content-Type so browser sets boundary
    if (options.body instanceof FormData) {
      delete headers['Content-Type'];
    }

    try {
      const response = await fetch(url, { ...options, headers });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || `Lỗi HTTP ${response.status}`);
      }

      return data;
    } catch (err) {
      console.warn(`[API] Không thể kết nối tới ${endpoint}:`, err.message);
      throw err;
    }
  },

  // ================= 1. AUTHENTICATION =================
  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  async loginGoogle(email = 'admin.luna@gmail.com') {
    return this.request('/auth/login-google', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  async getMe(token) {
    return this.request('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // ================= 2. PROFILE =================
  async getProfile() {
    return this.request('/profile');
  },

  async updateProfile(profileData, token) {
    return this.request('/profile', {
      method: 'PUT',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: JSON.stringify(profileData),
    });
  },

  async updateStory(story, token) {
    return this.request('/profile/story', {
      method: 'PUT',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: JSON.stringify({ aboutStory: story, story }),
    });
  },

  // ================= 3. LINKS & SOCIALS =================
  async getLinks() {
    return this.request('/links');
  },

  async updateSocials(socialsData, token) {
    return this.request('/links/socials', {
      method: 'PUT',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: JSON.stringify(socialsData),
    });
  },

  async createLink(linkData, token) {
    return this.request('/links', {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: JSON.stringify(linkData),
    });
  },

  async updateLink(id, linkData, token) {
    return this.request(`/links/${id}`, {
      method: 'PUT',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: JSON.stringify(linkData),
    });
  },

  async deleteLink(id, token) {
    return this.request(`/links/${id}`, {
      method: 'DELETE',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  },

  // ================= 4. PRODUCTS =================
  async getProducts() {
    return this.request('/products');
  },

  async createProduct(productData, token) {
    return this.request('/products', {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: JSON.stringify(productData),
    });
  },

  async updateProduct(id, productData, token) {
    return this.request(`/products/${id}`, {
      method: 'PUT',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: JSON.stringify(productData),
    });
  },

  async deleteProduct(id, token) {
    return this.request(`/products/${id}`, {
      method: 'DELETE',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  },

  // ================= 5. UPLOAD =================
  async uploadImage(file, token) {
    const formData = new FormData();
    formData.append('file', file);

    return this.request('/upload', {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });
  },
};
