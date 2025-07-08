"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";

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
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { logout } = useAuth();

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
      const token = Cookies.get("token");

      if (!token) {
        console.warn("No token found, logging out");
        logout();
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
             // If token is invalid or expired, log out
            console.error("Authentication failed, logging out.");
            logout();
          }
          throw new Error(`Failed to fetch user data: ${res.statusText}`);
        }

        const responseData = await res.json();
        setUser(responseData.user);

      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Could not load user profile. Please try again.");
        logout();
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [logout]);

  if (isLoading) {
    return (
      <Card
        sx={{
          width: '100%',
          maxWidth: 512,
          bgcolor: 'background.paper',
          borderRadius: '16px',
          boxShadow: 3,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 300,
        }}
      >
        <CircularProgress sx={{ color: '#cc8f2a' }} size={60} />
        <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
          Loading Profile...
        </Typography>
      </Card>
    );
  }

  if (error || !user) {
    return (
      <Card
        sx={{
          width: '100%',
          maxWidth: 512,
          bgcolor: 'background.paper',
          borderRadius: '16px',
          boxShadow: 3,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 300,
        }}
      >
        <Typography variant="h6" color="error" sx={{ textAlign: 'center' }}>
          {error || "Could not load user profile. Please log in again."}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={logout}
          sx={{ mt: 3 }}
        >
          Go to Login
        </Button>
      </Card>
    );
  }

  // --- Render User Profile ---
  // Derive userInitial here, now that 'user' is guaranteed to exist
  const userInitial = user.email ? user.email.charAt(0).toUpperCase() : (user.username ? user.username.charAt(0).toUpperCase() : "U");


  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: 512, // Equivalent to max-w-lg (512px)
        bgcolor: 'background.paper', // For bg-white / dark:bg-gray-800
        borderRadius: '16px', // Equivalent to rounded-2xl (often 16px)
        boxShadow: 3, // Equivalent to shadow-xl (MUI's shadow scale)
        p: 4, // Equivalent to p-8 (32px padding)
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center content horizontally
        gap: 4, // Equivalent to space-y-8 (32px gap between direct children)
        // For dark mode: MUI's default theming handles dark/light background based on palette.
        // Ensure your MUI theme is configured for dark mode if you want the dark:bg-gray-800 effect.
      }}
    >
      {/* Header Section */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          variant="body2" // Equivalent to text-sm
          sx={{ fontWeight: 'medium', color: '#cc8f2a' }} // Equivalent to font-medium text-[#cc8f2a]
        >
          WELCOME BACK
        </Typography>
      </Box>

      {/* User Info Section (Avatar and Name/Email) */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}> {/* Equivalent to space-y-4 */}
        {/* Avatar/Initial Circle */}
        {user.avatar ? (
          <Avatar
            src={user.avatar}
            alt="User Avatar"
            sx={{
              width: 96,
              height: 96,
              boxShadow: 3, // Equivalent to shadow-md
              // Add a border if you like, similar to the previous MUI example
              // border: '4px solid',
              // borderColor: 'primary.main',
            }}
          />
        ) : (
          <GradientAvatar>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'white' }}>
              {userInitial}
            </Typography>
          </GradientAvatar>
        )}
        {/* User Name and Email */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h5" // Equivalent to text-2xl
            component="h2"
            sx={{ fontWeight: 'semibold', color: 'text.primary' }} // For text-gray-800 / dark:text-gray-100
          >
            {user.username || "User"}
          </Typography>
          <Typography
            variant="body1" // Equivalent to text-md
            color="text.secondary" // For text-gray-500 / dark:text-gray-400
          >
            {user.email}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          borderTop: 1, // Equivalent to border-t
          borderColor: 'divider', // Equivalent to border-gray-200 / dark:border-gray-700
          pt: 3, // Equivalent to pt-6 (24px padding)
          display: 'flex',
          flexDirection: 'column',
          gap: 2, // Equivalent to space-y-4 (16px gap)
          width: '100%', // Ensure it takes full width
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ fontWeight: 'medium', color: 'text.secondary' }}>
            User ID:
          </Typography>
          <Box
            sx={{
              px: 1.5, // Equivalent to px-3
              py: 0.5, // Equivalent to py-1
              fontSize: '0.875rem', // Equivalent to text-sm
              fontFamily: 'monospace', // Equivalent to font-mono
              bgcolor: 'action.hover', // For bg-gray-100 / dark:bg-gray-700
              borderRadius: '9999px', // Equivalent to rounded-full
              color: 'text.primary', // For text-gray-700 / dark:text-gray-200
            }}
          >
            {user.userId}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ fontWeight: 'medium', color: 'text.secondary' }}>
            Created At:
          </Typography>
          <Box
            sx={{
              px: 1.5, // Equivalent to px-3
              py: 0.5, // Equivalent to py-1
              fontSize: '0.875rem', // Equivalent to text-sm
              fontFamily: 'monospace', // Equivalent to font-mono
              bgcolor: 'action.hover', // For bg-gray-100 / dark:bg-gray-700
              borderRadius: '9999px', // Equivalent to rounded-full
              color: 'text.primary', // For text-gray-700 / dark:text-gray-200
            }}
          >
            {new Date(user.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ fontWeight: 'medium', color: 'text.secondary' }}>
            Last Updated At:
          </Typography>
          <Box
            sx={{
              px: 1.5, // Equivalent to px-3
              py: 0.5, // Equivalent to py-1
              fontSize: '0.875rem', // Equivalent to text-sm
              fontFamily: 'monospace', // Equivalent to font-mono
              bgcolor: 'action.hover', // For bg-gray-100 / dark:bg-gray-700
              borderRadius: '9999px', // Equivalent to rounded-full
              color: 'text.primary', // For text-gray-700 / dark:text-gray-200
            }}
          >
            {new Date(user.updatedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}
          </Box>
        </Box>
      </Box>

      {/* Action Buttons */}
      <Box
        sx={{
          pt: 3, // Equivalent to pt-6
          display: 'flex',
          flexDirection: 'column',
          gap: 2, // Equivalent to space-y-4
          width: '100%',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          component={Link} // Use Link component
          href="/profile/edit"
          sx={{ py: 1.5 }} // Taller button
        >
          Edit Profile
        </Button>
        <Button
          variant="contained"
          color="secondary"
          component={Link} // Use Link component
          href="/profile/change-password"
          sx={{ py: 1.5 }} // Taller button
        >
          Change Password
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={logout}
          sx={{ py: 1.5 }} // Taller button
        >
          Logout
        </Button>
      </Box>
    </Card>
  );
}