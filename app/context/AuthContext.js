'use client';

import { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

// 1. สร้าง Context
const AuthContext = createContext(null);

// 2. สร้าง Provider Component
export const AuthProvider = ({ children }) => {
  // เปลี่ยนมาใช้ authStatus state เพื่อให้ตรงกับที่ Navbar ต้องการ
  const [authStatus, setAuthStatus] = useState('loading');
  const router = useRouter();

  // เช็ค token ตอนโหลดหน้าครั้งแรก
  useEffect(() => {
    const token = Cookies.get('token');
    setAuthStatus(token ? 'authenticated' : 'unauthenticated');
  }, []);

  // ฟังก์ชันสำหรับ Login
  const login = (token) => {
    Cookies.set('token', token, { expires: 1, sameSite: 'lax' });
    setAuthStatus('authenticated'); // อัปเดตสถานะเป็น 'authenticated'
    router.push('/dashboard');
  };

  // ฟังก์ชันสำหรับ Logout
  const logout = () => {
    Cookies.remove('token');
    setAuthStatus('unauthenticated'); // อัปเดตสถานะเป็น 'unauthenticated'
    router.push('/login');
  };

  // 3. ส่ง authStatus และฟังก์ชันต่างๆ ออกไปใน value
  const value = {
    authStatus,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 4. สร้าง Custom Hook
export const useAuth = () => {
  return useContext(AuthContext);
};