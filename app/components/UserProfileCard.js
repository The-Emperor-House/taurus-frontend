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
    boxShadow: theme.shadows[3],
    background: `linear-gradient(to bottom right, #cc8f2a, #e0a040)`,
  }));

  useEffect(() => {
    const fetchUserData = async () => {
      if (status !== 'authenticated') return;

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${session.backendToken}`,
          },
        });

        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            console.error('Authentication failed, logging out.');
            signOut({ callbackUrl: '/auth/login' });
          }
          throw new Error('Failed to fetch user data');
        }

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error(err);
        setError('Could not load user profile.');
      }
    };

    fetchUserData();
  }, [session, status]);

  if (isLoading) {
    return (
      <Card sx={{ maxWidth: 512, p: 4, borderRadius: '16px', boxShadow: 3, minHeight: 300, textAlign: 'center' }}>
        <CircularProgress sx={{ color: '#cc8f2a' }} size={60} />
        <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
          Loading Profile...
        </Typography>
      </Card>
    );
  }

  if (error || !user) {
    return (
      <Card sx={{ maxWidth: 512, p: 4, borderRadius: '16px', boxShadow: 3, minHeight: 300, textAlign: 'center' }}>
        <Typography variant="h6" color="error">{error || 'User not found.'}</Typography>
        <Button variant="contained" color="primary" onClick={() => signOut({ callbackUrl: '/auth/login' })} sx={{ mt: 3 }}>
          Go to Login
        </Button>
      </Card>
    );
  }

  const userInitial = user.username?.[0]?.toUpperCase() || 'U';

  return (
    <Card sx={{ maxWidth: 512, p: 4, borderRadius: '16px', boxShadow: 3 }}>
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Typography variant="body2" sx={{ fontWeight: 'medium', color: '#cc8f2a' }}>
          WELCOME BACK
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        {user.avatar ? (
          <Avatar src={user.avatar} alt="User Avatar" sx={{ width: 96, height: 96, boxShadow: 3 }} />
        ) : (
          <GradientAvatar>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'white' }}>
              {userInitial}
            </Typography>
          </GradientAvatar>
        )}

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 'semibold' }}>
            {user.username}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {user.email}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ borderTop: 1, borderColor: 'divider', pt: 3, mt: 3, gap: 2 }}>
        <InfoItem label="User ID" value={user.userId} />
        <InfoItem label="Created At" value={formatDate(user.createdAt)} />
        <InfoItem label="Last Updated At" value={formatDate(user.updatedAt)} />
      </Box>

      <Box sx={{ pt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button variant="contained" href="/profile/edit" component={Link}>Edit Profile</Button>
        <Button variant="contained" href="/profile/change-password" component={Link} color="secondary">Change Password</Button>
        <Button variant="contained" color="error" onClick={() => signOut({ callbackUrl: '/auth/login' })}>Logout</Button>
      </Box>
    </Card>
  );
}

function InfoItem({ label, value }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
      <Typography variant="body2" sx={{ fontWeight: 'medium', color: 'text.secondary' }}>
        {label}:
      </Typography>
      <Box
        sx={{
          px: 1.5,
          py: 0.5,
          fontSize: '0.875rem',
          fontFamily: 'monospace',
          bgcolor: 'action.hover',
          borderRadius: '9999px',
          color: 'text.primary',
        }}
      >
        {value}
      </Box>
    </Box>
  );
}

function formatDate(dateString) {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}
