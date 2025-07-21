'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useTheme } from '@mui/material/styles';
import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountMenu from '../navbar/AccountMenu';

export default function DashboardNavbar({ onMenuClick, isDesktop, isScrolled }) {
  const { data: session, status } = useSession();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const logoSrc = isScrolled
    ? '/navbar/logo webp/taurusOrange.webp'
    : isDarkMode
    ? '/navbar/logo webp/taurusWhite.webp'
    : '/navbar/logo webp/taurusDark.webp';

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: 1100,
        backdropFilter: 'blur(6px)',
        bgcolor: isScrolled
          ? isDarkMode
            ? 'rgba(0,0,0,0.8)'
            : 'rgba(255,255,255,0.8)'
          : 'transparent',
      }}
    >
      <Toolbar>
        {!isDesktop && (
          <IconButton color="inherit" edge="start" onClick={onMenuClick} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
        )}

        <Link href="/" passHref>
          <motion.div animate={{ scale: isScrolled ? 0.85 : 1 }} transition={{ duration: 0.3 }}>
            <Image src={logoSrc} alt="Logo" width={100} height={33} priority />
          </motion.div>
        </Link>

        <Box sx={{ flexGrow: 1 }} />

        {status === 'authenticated' && <AccountMenu user={session.user} />}
      </Toolbar>
    </AppBar>
  );
}
