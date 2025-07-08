'use client';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import {
  Box,
  Typography,
  Card,
  Button,
  Avatar,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/system';

export default function UserProfileCard() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const isLoading = status === 'loading' || (status === 'authenticated' && !user);

  const GradientAvatar = styled(Box)(({ theme }) => ({
    width: 96,
    height: 96,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: theme.shadows[4],
    background: `linear-gradient(135deg, #cc8f2a, #e0a040)`,
  }));

  useEffect(() => {
    if (status !== 'authenticated') return;

    const fetchUserData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${session.backendToken}`,
          },
        });

        if (!res.ok) {
          if ([401, 403].includes(res.status)) {
            console.error('Authentication failed');
            signOut({ callbackUrl: '/auth/login' });
          }
          throw new Error('Fetch failed');
        }

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error(err);
        setError('ไม่สามารถโหลดข้อมูลผู้ใช้ได้');
      }
    };

    fetchUserData();
  }, [session, status]);

  const userInitial = user?.username?.charAt(0)?.toUpperCase() || 'U';

  if (isLoading) {
    return (
      <StyledCard>
        <CircularProgress sx={{ color: '#cc8f2a' }} size={48} />
        <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
          Loading Profile...
        </Typography>
      </StyledCard>
    );
  }

  if (error || !user) {
    return (
      <StyledCard>
        <Typography variant="h6" color="error" sx={{ textAlign: 'center' }}>
          {error || 'ไม่พบข้อมูลผู้ใช้'}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => signOut({ callbackUrl: '/auth/login' })}
          sx={{ mt: 3 }}
        >
          กลับไปล็อกอิน
        </Button>
      </StyledCard>
    );
  }

  return (
    <StyledCard>
      <GradientAvatar>
        <Avatar sx={{ width: 64, height: 64, fontSize: '2rem' }}>
          {userInitial}
        </Avatar>
      </GradientAvatar>
      <Typography variant="h5" sx={{ mt: 2, fontWeight: 600 }}>
        {user.username}
      </Typography>
      <Box sx={{ mt: 1, mb: 3 }}>
        <Typography variant="body2" color="text.secondary">
          {user.email}
        </Typography>
      </Box>
<InfoItem
  label="👤 ชื่อจริง"
  value={user.firstName ? user.firstName : '—'}
/>
<InfoItem
  label="👥 นามสกุล"
  value={user.lastName ? user.lastName : '—'}
/>
<InfoItem
  label="📅 วันที่สมัครสมาชิก"
  value={formatDate(user.createdAt)}
/>
<InfoItem
  label="🛠️ วันที่แก้ไขล่าสุด"
  value={formatDate(user.updatedAt)}
/>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => signOut({ callbackUrl: '/auth/login' })}
        sx={{ mt: 2 }}
      >
        ออกจากระบบ
      </Button>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Link href="/profile/edit" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="secondary">
            แก้ไขโปรไฟล์
          </Button>
        </Link>
      </Box>
    </StyledCard>
  );
}

function InfoItem({ label, value }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>{label}:</Typography>
      <Box sx={{
        px: 2,
        py: 0.5,
        fontSize: '0.85rem',
        fontFamily: 'monospace',
        bgcolor: 'action.hover',
        borderRadius: '9999px',
      }}>
        {value}
      </Box>
    </Box>
  );
}

function formatDate(date) {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 512,
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[5],
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));
