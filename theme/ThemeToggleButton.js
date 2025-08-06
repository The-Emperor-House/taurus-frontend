'use client';

import { IconButton, Box, Tooltip } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { motion, AnimatePresence } from 'framer-motion';
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

export default function ThemeToggleButton() {
  const { mode, toggleMode } = useContext(ThemeContext);
  const isDark = mode === 'dark';

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 9999,
        backgroundColor: isDark ? '#424242' : '#cc8f2a',
        borderRadius: '50%',
        boxShadow: 3,
      }}
    >
      <Tooltip title={`Switch to ${isDark ? 'light' : 'dark'} mode`}>
        <IconButton
          onClick={toggleMode}
          color="text.primary"
          sx={{ width: 48, height: 48 }}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={isDark ? 'light' : 'dark'}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'flex', alignItems: 'center' }}
              whileHover={{ scale: 1.1 }}
            >
              {isDark ? <LightModeIcon /> : <DarkModeIcon />}
            </motion.div>
          </AnimatePresence>
        </IconButton>
      </Tooltip>
    </Box>
  );
}
