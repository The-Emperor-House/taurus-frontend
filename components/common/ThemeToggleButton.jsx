'use client';

import { IconButton, Box, Tooltip } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThemeToggleButton({ onToggle }) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 9999,
        bgcolor: 'background.paper',
        borderRadius: '50%',
        boxShadow: 3,
      }}
      component={motion.div}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Tooltip title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}>
        <IconButton
          onClick={onToggle}
          color="primary"
          sx={{
            width: 48,
            height: 48,
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              key={isDarkMode ? 'light' : 'dark'}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </motion.div>
          </AnimatePresence>
        </IconButton>
      </Tooltip>
    </Box>
  );
}
