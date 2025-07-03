'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get('token');

      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          Cookies.remove('token');
          router.push('/login');
          return;
        }

        const userData = await res.json();
        setUser(userData.user);

      } catch (error) {
        console.error('Failed to fetch user data', error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/login');
  };

  if (isLoading) {
    return <div>กำลังโหลดข้อมูล...</div>;
  }

  if (!user) {
    return <div>ไม่พบข้อมูลผู้ใช้ กรุณาลองใหม่หรือล็อกอินอีกครั้ง</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-600 mb-2">ข้อมูลผู้ใช้:</p>
      <ul className="list-disc pl-5">
        <li>ชื่อผู้ใช้: {user.username}</li>
        <li>อีเมล: {user.email}</li>
        <li>ID ผู้ใช้: {user.userId}</li>
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
