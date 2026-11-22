import { creatorData as defaultProfile } from '../data/creatorData';
import { linksData as defaultLinks } from '../data/linksData';
import { productsData as defaultProducts } from '../data/productsData';

const KEYS = {
  PROFILE: 'LUNA_HANDMADE_PROFILE',
  LINKS: 'LUNA_HANDMADE_LINKS',
  PRODUCTS: 'LUNA_HANDMADE_PRODUCTS',
};

export const storageService = {
  // Profile
  getProfile: () => {
    try {
      const stored = localStorage.getItem(KEYS.PROFILE);
      return stored ? JSON.parse(stored) : defaultProfile;
    } catch (e) {
      console.error('Error loading profile from storage:', e);
      return defaultProfile;
    }
  },

  saveProfile: (profile) => {
    try {
      localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
      return true;
    } catch (e) {
      console.error('Error saving profile to storage:', e);
      return false;
    }
  },

  // Links
  getLinks: () => {
    try {
      const stored = localStorage.getItem(KEYS.LINKS);
      return stored ? JSON.parse(stored) : defaultLinks;
    } catch (e) {
      console.error('Error loading links from storage:', e);
      return defaultLinks;
    }
  },

  saveLinks: (links) => {
    try {
      localStorage.setItem(KEYS.LINKS, JSON.stringify(links));
      return true;
    } catch (e) {
      console.error('Error saving links to storage:', e);
      return false;
    }
  },

  // Products
  getProducts: () => {
    try {
      const stored = localStorage.getItem(KEYS.PRODUCTS);
      return stored ? JSON.parse(stored) : defaultProducts;
    } catch (e) {
      console.error('Error loading products from storage:', e);
      return defaultProducts;
    }
  },

  saveProducts: (products) => {
    try {
      localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
      return true;
    } catch (e) {
      console.error('Error saving products to storage:', e);
      return false;
    }
  },

  // Reset to default sample data
  resetAll: () => {
    try {
      localStorage.removeItem(KEYS.PROFILE);
      localStorage.removeItem(KEYS.LINKS);
      localStorage.removeItem(KEYS.PRODUCTS);
      return {
        profile: defaultProfile,
        links: defaultLinks,
        products: defaultProducts,
      };
    } catch (e) {
      console.error('Error resetting data:', e);
      return {
        profile: defaultProfile,
        links: defaultLinks,
        products: defaultProducts,
      };
    }
  },

  // Export JSON string
  exportBackup: () => {
    const data = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      profile: storageService.getProfile(),
      links: storageService.getLinks(),
      products: storageService.getProducts(),
    };
    return JSON.stringify(data, null, 2);
  },

  // Import JSON string
  importBackup: (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== 'object') throw new Error('Dữ liệu không hợp lệ');

      if (parsed.profile) storageService.saveProfile(parsed.profile);
      if (parsed.links) storageService.saveLinks(parsed.links);
      if (parsed.products) storageService.saveProducts(parsed.products);

      return {
        success: true,
        data: {
          profile: parsed.profile || storageService.getProfile(),
          links: parsed.links || storageService.getLinks(),
          products: parsed.products || storageService.getProducts(),
        },
      };
    } catch (e) {
      console.error('Error importing backup:', e);
      return { success: false, error: e.message };
    }
  },
};
