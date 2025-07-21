'use client';

import { useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Fade } from '@mui/material';
import UserProfileCard from '../../components/user/UserProfileCard';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    if (status === 'unauthenticated') {
      router.push('/auth/login');
      return;
    }

    // ✅ ตรวจ token หมดอายุ (ถ้า tokenExpiresIn มีใน session)
    if (status === 'authenticated' && session?.tokenExpiresIn) {
      const expiresAt = new Date(session.tokenExpiresIn).getTime();
      if (Date.now() > expiresAt) {
        console.warn('⚠️ Token expired, signing out...');
        signOut({ callbackUrl: '/auth/login' });
      }
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-lg text-gray-500 animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <Fade in timeout={500}>
      <div className="min-h-screen flex items-center justify-center">
        <UserProfileCard user={session?.user} />
      </div>
    </Fade>
  );
}
