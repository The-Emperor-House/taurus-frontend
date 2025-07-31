'use client';

import { useEffect, useState, useMemo } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { getTheme } from '@/lib/theme';
import ThemeToggleButton from '@/components/theme/ThemeToggleButton';

export default function MuiThemeProviderWrapper({ children }) {
  const [mode, setMode] = useState();
  useEffect(() => {
    const savedMode =
      localStorage.getItem('theme') ||
      (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    setMode(savedMode);
    document.documentElement.classList.toggle('dark', savedMode === 'dark');
  }, []);

  const theme = useMemo(() => getTheme(mode || 'light'), [mode]);

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme', newMode);
    document.documentElement.classList.toggle('dark', newMode === 'dark');
  };

  if (!mode) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
      <ThemeToggleButton onToggle={toggleMode} />
    </ThemeProvider>
  );
}