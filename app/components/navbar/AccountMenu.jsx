'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Typography,
} from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import Dashboard from '@mui/icons-material/Dashboard';
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function AccountMenu({ user }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [imageError, setImageError] = useState(false); // 🔥 เพิ่ม state เช็คโหลดรูปไม่สำเร็จ

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    signOut({ callbackUrl: '/auth/login' });
  };

  const firstLetter = user?.name?.charAt(0)?.toUpperCase() || 'U';
  const fullAvatarUrl = !imageError ? user?.avatarUrl : undefined; // 🔥 ถ้า error จะเป็น undefined

  return (
    <>
      <IconButton
        onClick={handleMenuOpen}
        size="small"
        sx={{ ml: 1 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Avatar
          src={fullAvatarUrl}
          alt={user?.name || 'User'}
          sx={{ width: 40, height: 40 }}
          imgProps={{
            onError: () => setImageError(true), // 🔥 ถ้ารูปโหลด error → อัปเดต state
          }}
        >
          {firstLetter}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        PaperProps={{
          elevation: 4,
          sx: (theme) => ({
            mt: 1.5,
            minWidth: 200,
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            '& .MuiMenuItem-root:hover': {
              bgcolor:
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[800],
            },
          }),
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem disabled sx={{ cursor: 'default' }}>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2" noWrap>
            {user?.name || 'Account'}
          </Typography>
        </MenuItem>

        <Divider />

        <MenuItem component={Link} href="/auth/dashboard">
          <ListItemIcon>
            <Dashboard fontSize="small" />
          </ListItemIcon>
          Dashboard
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
