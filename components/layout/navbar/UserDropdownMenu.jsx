'use client';

import { useContext } from 'react';
import Link from 'next/link';
import {
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Avatar,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import DesignServicesOutlinedIcon from '@mui/icons-material/DesignServicesOutlined';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PersonIcon from '@mui/icons-material/Person';

import { signOut } from 'next-auth/react';
import { ModalContext } from '@/components/modals/ModalProvider';

const menuItems = [
  {
    label: 'Design',
    icon: <DesignServicesOutlinedIcon fontSize="small" />,
    href: '/dashboard/design',
  },
  {
    label: 'Contact',
    icon: <ContactMailIcon fontSize="small" />,
    href: '/dashboard/contact',
  },
  {
    label: 'Profile',
    icon: <PersonIcon fontSize="small" />,
    href: '/profile',
  },
];

export default function UserDropdownMenu({
  user,
  fullAvatarUrl,
  firstLetter,
  anchorEl,
  open,
  handleMenuClose,
}) {
  const { showModal, closeModal } = useContext(ModalContext);

  const handleLogoutWithConfirm = () => {
    showModal('confirm', {
      message: `Are you sure you want to log out?`,
      onConfirm: async () => {
        closeModal();
        await signOut({ callbackUrl: '/' });
      },
    });
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleMenuClose}
      PaperProps={{
        elevation: 4,
        sx: { mt: 1.5, minWidth: 200 },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {/* Profile summary */}
      <MenuItem disabled>
        <Avatar
          src={fullAvatarUrl}
          alt={user?.name || 'User'}
          sx={{ width: 32, height: 32, mr: 1 }}
        >
          {firstLetter}
        </Avatar>
        {user?.name || user?.email}
      </MenuItem>

      <Divider />

      {/* Menu links */}
      {menuItems.map((item) => (
        <MenuItem
          key={item.href}
          component={Link}
          href={item.href}
          onClick={handleMenuClose}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          {item.label}
        </MenuItem>
      ))}

      <Divider />

      {/* Logout */}
      <MenuItem onClick={handleLogoutWithConfirm}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        Log Out
      </MenuItem>
    </Menu>
  );
}
