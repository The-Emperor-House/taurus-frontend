'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material';
import ContactsIcon from '@mui/icons-material/Contacts';
import PersonIcon from '@mui/icons-material/Person';

const menuItems = [
  { label: 'Contact List', href: '/dashboard/contact', icon: <ContactsIcon /> },
  { label: 'Profile', href: '/dashboard/profile', icon: <PersonIcon /> },
];

export default function Sidebar({ open, onClose, variant }) {
  const pathname = usePathname();

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          mt: '64px', // ดันลงจาก MainNavbar
          height: 'calc(100% - 64px)',
          transition: 'all 0.3s ease',
          boxShadow: variant === 'temporary' ? 8 : 'none',
        },
      }}
    >
      <Box>
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.href}
              component={Link}
              href={item.href}
              selected={pathname === item.href}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
