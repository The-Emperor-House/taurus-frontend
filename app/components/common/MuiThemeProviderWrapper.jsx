'use client';

import { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, IconButton, Box } from '@mui/material';
import { getTheme } from '@/lib/theme';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export default function MuiThemeProviderWrapper({ children }) {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('theme') || 'light';
      setMode(savedMode);
      document.documentElement.classList.toggle('dark', savedMode === 'dark');
    }
  }, []);

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme', newMode);
    document.documentElement.classList.toggle('dark', newMode === 'dark');
  };

  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: mode === 'light' ? '#f3f4f6' : '#000', // light: gray-100, dark: black
          minHeight: '100vh',
          transition: 'background-color 0.3s ease',
        }}
      >
        {children}

        {/* Toggle button */}
        <Box
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 9999,
            bgcolor: 'background.paper',
            borderRadius: '50%',
            boxShadow: 3,
            transition: 'background-color 0.3s ease',
          }}
        >
          <IconButton
            onClick={toggleMode}
            color="primary"
            sx={{
              width: 48,
              height: 48,
              transition: 'color 0.3s ease',
            }}
            aria-label="Toggle dark mode"
          >
            {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
