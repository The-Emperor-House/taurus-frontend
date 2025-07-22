'use client';

import { useEffect, useState, useMemo } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { getTheme } from '@/lib/theme';
import ThemeToggleButton from './ThemeToggleButton';

export default function MuiThemeProviderWrapper({ children }) {
  const [mode, setMode] = useState(null);

  useEffect(() => {
    const savedMode = localStorage.getItem('theme') || 'light';
    setMode(savedMode);
    document.documentElement.classList.toggle('dark', savedMode === 'dark');
  }, []);

  const theme = useMemo(() => {
    if (!mode) return getTheme('light');
    return getTheme(mode);
  }, [mode]);

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme', newMode);
    document.documentElement.classList.toggle('dark', newMode === 'dark');
  };

  if (!mode) return null;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
      <ThemeToggleButton onToggle={toggleMode} />
    </ThemeProvider>
  );
}
