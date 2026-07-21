'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://www.techmart.com.bd';

export function AuthProvider({ children }) {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('techmart_token');
    const savedCustomer = localStorage.getItem('techmart_customer');
    if (saved) {
      setToken(saved);
      if (savedCustomer) setCustomer(JSON.parse(savedCustomer));
    }
    setLoading(false);
  }, []);

  const saveAuth = (tkn, cust) => {
    setToken(tkn);
    setCustomer(cust);
    localStorage.setItem('techmart_token', tkn);
    localStorage.setItem('techmart_customer', JSON.stringify(cust));
  };

  const clearAuth = () => {
    setToken('');
    setCustomer(null);
    localStorage.removeItem('techmart_token');
    localStorage.removeItem('techmart_customer');
  };

  const authFetch = useCallback(async (action, body = null) => {
    const url = new URL(`${API_BASE}/index.php`);
    url.searchParams.set('route', 'api/custom/customer');
    url.searchParams.set('action', action);

    const options = {
      method: body ? 'POST' : 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    };
    if (body) options.body = JSON.stringify(body);

    const res = await fetch(url.toString(), options);
    return res.json();
  }, [token]);

  // লগইন
  const login = async (email, password) => {
    const data = await authFetch('login', { email, password });
    if (data.success) {
      saveAuth(data.token, data.customer);
    }
    return data;
  };

  // রেজিস্টার
  const register = async (formData) => {
    const data = await authFetch('register', formData);
    if (data.success) {
      saveAuth(data.token, data.customer);
    }
    return data;
  };

  // লগআউট
  const logout = () => {
    clearAuth();
  };

  // অর্ডার হিস্ট্রি
  const getOrders = async () => {
    return authFetch('orders');
  };

  // প্রোফাইল আপডেট
  const updateProfile = async (formData) => {
    const data = await authFetch('update', formData);
    if (data.success && formData.firstname) {
      const updated = { ...customer, ...formData };
      setCustomer(updated);
      localStorage.setItem('techmart_customer', JSON.stringify(updated));
    }
    return data;
  };

  return (
    <AuthContext.Provider value={{
      customer,
      loading,
      isLoggedIn: !!token,
      login,
      register,
      logout,
      getOrders,
      updateProfile,
      token,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
