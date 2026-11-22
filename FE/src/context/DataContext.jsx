import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { storageService } from '../services/storageService';
import { apiService } from '../services/apiService';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [profile, setProfile] = useState(() => storageService.getProfile());
  const [links, setLinks] = useState(() => storageService.getLinks());
  const [products, setProducts] = useState(() => storageService.getProducts());
  const [lastSaved, setLastSaved] = useState(Date.now());
  const [syncStatus, setSyncStatus] = useState('SYNCING'); // 'ONLINE' | 'OFFLINE' | 'SYNCING'

  // Fetch initial data from Backend API if server is online
  const refreshData = useCallback(async () => {
    setSyncStatus('SYNCING');
    try {
      const [profileRes, linksRes, productsRes] = await Promise.allSettled([
        apiService.getProfile(),
        apiService.getLinks(),
        apiService.getProducts(),
      ]);

      let hasSuccess = false;

      if (profileRes.status === 'fulfilled' && profileRes.value?.data) {
        setProfile(profileRes.value.data);
        storageService.saveProfile(profileRes.value.data);
        hasSuccess = true;
      }
      if (linksRes.status === 'fulfilled' && Array.isArray(linksRes.value?.data)) {
        setLinks(linksRes.value.data);
        storageService.saveLinks(linksRes.value.data);
        hasSuccess = true;
      }
      if (productsRes.status === 'fulfilled' && Array.isArray(productsRes.value?.data)) {
        setProducts(productsRes.value.data);
        storageService.saveProducts(productsRes.value.data);
        hasSuccess = true;
      }

      setSyncStatus(hasSuccess ? 'ONLINE' : 'OFFLINE');
      setLastSaved(Date.now());
      return hasSuccess;
    } catch (e) {
      console.warn('API sync deferred, using local cache:', e);
      setSyncStatus('OFFLINE');
      return false;
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Listen for storage events (e.g. cross-tab sync)
  useEffect(() => {
    const handleStorageChange = () => {
      setProfile(storageService.getProfile());
      setLinks(storageService.getLinks());
      setProducts(storageService.getProducts());
      setLastSaved(Date.now());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Profile actions
  const updateProfile = async (updatedProfile) => {
    const merged = { ...profile, ...updatedProfile };
    setProfile(merged);
    storageService.saveProfile(merged);
    setLastSaved(Date.now());

    // Async sync to BE
    try {
      const auth = JSON.parse(localStorage.getItem('LUNA_ADMIN_AUTH') || '{}');
      if (auth?.token && auth.token !== 'local_jwt_token_fallback') {
        const res = await apiService.updateProfile(merged, auth.token);
        if (res?.data) {
          setSyncStatus('ONLINE');
        }
      }
    } catch {
      setSyncStatus('OFFLINE');
    }
  };

  // Links actions
  const addLink = async (newLink) => {
    const linkWithId = {
      ...newLink,
      id: newLink.id || `link_${Date.now()}`,
      isHero: Boolean(newLink.isHero),
      enabled: newLink.enabled !== false,
    };
    const updated = [...links, linkWithId];
    setLinks(updated);
    storageService.saveLinks(updated);
    setLastSaved(Date.now());

    // Async sync to BE
    try {
      const auth = JSON.parse(localStorage.getItem('LUNA_ADMIN_AUTH') || '{}');
      if (auth?.token && auth.token !== 'local_jwt_token_fallback') {
        const res = await apiService.createLink(linkWithId, auth.token);
        if (res?.data) {
          setSyncStatus('ONLINE');
        }
      }
    } catch {
      setSyncStatus('OFFLINE');
    }

    return linkWithId;
  };

  const updateLink = async (id, updatedFields) => {
    const updated = links.map((link) =>
      link.id === id ? { ...link, ...updatedFields } : link
    );
    setLinks(updated);
    storageService.saveLinks(updated);
    setLastSaved(Date.now());

    // Async sync to BE
    try {
      const auth = JSON.parse(localStorage.getItem('LUNA_ADMIN_AUTH') || '{}');
      if (auth?.token && auth.token !== 'local_jwt_token_fallback') {
        await apiService.updateLink(id, updatedFields, auth.token);
        setSyncStatus('ONLINE');
      }
    } catch {
      setSyncStatus('OFFLINE');
    }
  };

  const updateSocials = async (socialsData) => {
    try {
      const auth = JSON.parse(localStorage.getItem('LUNA_ADMIN_AUTH') || '{}');
      if (auth?.token && auth.token !== 'local_jwt_token_fallback') {
        const res = await apiService.updateSocials(socialsData, auth.token);
        if (res?.data && Array.isArray(res.data)) {
          setLinks(res.data);
          storageService.saveLinks(res.data);
          setLastSaved(Date.now());
          setSyncStatus('ONLINE');
          return true;
        }
      }
    } catch (err) {
      console.warn('Backend updateSocials failed, keeping local updates:', err);
      setSyncStatus('OFFLINE');
    }
    return false;
  };

  const deleteLink = async (id) => {
    const updated = links.filter((link) => link.id !== id);
    setLinks(updated);
    storageService.saveLinks(updated);
    setLastSaved(Date.now());

    // Async sync to BE
    try {
      const auth = JSON.parse(localStorage.getItem('LUNA_ADMIN_AUTH') || '{}');
      if (auth?.token && auth.token !== 'local_jwt_token_fallback') {
        await apiService.deleteLink(id, auth.token);
        setSyncStatus('ONLINE');
      }
    } catch {
      setSyncStatus('OFFLINE');
    }
  };

  const toggleLink = (id) => {
    const target = links.find((l) => l.id === id);
    const newEnabled = target ? !target.enabled : true;
    updateLink(id, { enabled: newEnabled });
  };

  const reorderLinks = (newLinks) => {
    setLinks(newLinks);
    storageService.saveLinks(newLinks);
    setLastSaved(Date.now());
  };

  // Products actions
  const addProduct = async (newProduct) => {
    const tempId = newProduct.id || `prod_${Date.now()}`;
    const productWithId = {
      ...newProduct,
      id: tempId,
    };
    const updated = [productWithId, ...products];
    setProducts(updated);
    storageService.saveProducts(updated);
    setLastSaved(Date.now());

    // Async sync to BE
    try {
      const auth = JSON.parse(localStorage.getItem('LUNA_ADMIN_AUTH') || '{}');
      if (auth?.token && auth.token !== 'local_jwt_token_fallback') {
        const res = await apiService.createProduct(productWithId, auth.token);
        if (res?.data?.id) {
          setSyncStatus('ONLINE');
          setProducts((current) => {
            const next = current.map((p) => (p.id === tempId ? res.data : p));
            storageService.saveProducts(next);
            return next;
          });
          return res.data;
        }
      }
    } catch (e) {
      console.warn('Backend addProduct deferred, saved to local cache:', e);
      setSyncStatus('OFFLINE');
    }

    return productWithId;
  };

  const updateProduct = async (id, updatedFields) => {
    const updated = products.map((prod) =>
      prod.id === id ? { ...prod, ...updatedFields } : prod
    );
    setProducts(updated);
    storageService.saveProducts(updated);
    setLastSaved(Date.now());

    // Async sync to BE
    try {
      const auth = JSON.parse(localStorage.getItem('LUNA_ADMIN_AUTH') || '{}');
      if (auth?.token && auth.token !== 'local_jwt_token_fallback') {
        await apiService.updateProduct(id, updatedFields, auth.token);
        setSyncStatus('ONLINE');
      }
    } catch {
      setSyncStatus('OFFLINE');
    }
  };

  const deleteProduct = async (id) => {
    const updated = products.filter((prod) => prod.id !== id);
    setProducts(updated);
    storageService.saveProducts(updated);
    setLastSaved(Date.now());

    // Async sync to BE
    try {
      const auth = JSON.parse(localStorage.getItem('LUNA_ADMIN_AUTH') || '{}');
      if (auth?.token && auth.token !== 'local_jwt_token_fallback') {
        await apiService.deleteProduct(id, auth.token);
        setSyncStatus('ONLINE');
      }
    } catch {
      setSyncStatus('OFFLINE');
    }
  };

  // Reset to default
  const resetToDefaults = () => {
    const resetData = storageService.resetAll();
    setProfile(resetData.profile);
    setLinks(resetData.links);
    setProducts(resetData.products);
    setLastSaved(Date.now());
  };

  // Import / Export
  const exportBackup = () => storageService.exportBackup();

  const importBackup = (jsonString) => {
    const res = storageService.importBackup(jsonString);
    if (res.success) {
      setProfile(res.data.profile);
      setLinks(res.data.links);
      setProducts(res.data.products);
      setLastSaved(Date.now());
    }
    return res;
  };

  return (
    <DataContext.Provider
      value={{
        profile,
        links,
        products,
        lastSaved,
        syncStatus,
        refreshData,
        updateProfile,
        updateSocials,
        addLink,
        updateLink,
        deleteLink,
        toggleLink,
        reorderLinks,
        addProduct,
        updateProduct,
        deleteProduct,
        resetToDefaults,
        exportBackup,
        importBackup,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
