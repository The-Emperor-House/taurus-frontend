'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Fade } from '@mui/material';
import UserProfileCard from '../../components/UserProfileCard';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center text-lg text-gray-500 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <Fade in timeout={500}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
        <UserProfileCard user={session.user} />
      </div>
    </Fade>
  );
}
