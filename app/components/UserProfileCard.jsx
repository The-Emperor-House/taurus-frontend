"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import LogoutDialog from './LogoutDialog';
import PersonIcon from '@mui/icons-material/Person';
import Divider from '@mui/material/Divider';
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
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const isLoading = status === 'loading' || (status === 'authenticated' && !user);

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
            setIsLogoutDialogOpen(true);
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
          onClick={() => setIsLogoutDialogOpen(true)}
          sx={{ mt: 3 }}
        >
          กลับไปล็อกอิน
        </Button>
        <LogoutDialog isOpen={isLogoutDialogOpen} onClose={() => setIsLogoutDialogOpen(false)} />
      </StyledCard>
    );
  }

  return (
    <StyledCard>
      <Avatar sx={{ width: 72, height: 72, bgcolor: 'primary.main', fontSize: '2rem' }}>
        <PersonIcon fontSize="inherit" />
      </Avatar>

      <Typography variant="h5" sx={{ mt: 2, fontWeight: 700, color: 'text.primary' }}>
        {user.username}
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
        {user.email}
      </Typography>

      <Divider sx={{ my: 3, width: '100%' }} />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, width: '100%' }}>
        <InfoItem label="👤 ชื่อจริง" value={user.firstName || '—'} />
        <InfoItem label="👥 นามสกุล" value={user.lastName || '—'} />
        <InfoItem label="📅 วันที่สมัครสมาชิก" value={formatDate(user.createdAt)} />
        <InfoItem label="🛠️ วันที่แก้ไขล่าสุด" value={formatDate(user.updatedAt)} />
      </Box>

      <Button
        variant="outlined"
        color="error"
        onClick={() => setIsLogoutDialogOpen(true)}
        sx={{ mt: 3, fontWeight: 600 }}
      >
        ออกจากระบบ
      </Button>

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Link href="/profile/edit" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#cc8f2a',
              '&:hover': { backgroundColor: '#e0a040' },
              fontWeight: 600,
            }}
          >
            แก้ไขโปรไฟล์
          </Button>
        </Link>
      </Box>

      <LogoutDialog isOpen={isLogoutDialogOpen} onClose={() => setIsLogoutDialogOpen(false)} />
    </StyledCard>
  );
}

function InfoItem({ label, value }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>{label}:</Typography>
      <Box
        sx={{
          px: 2,
          py: 0.5,
          fontSize: '0.85rem',
          fontFamily: 'monospace',
          bgcolor: 'grey.100',
          borderRadius: '9999px',
          minWidth: 100,
          textAlign: 'center',
        }}
      >
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
