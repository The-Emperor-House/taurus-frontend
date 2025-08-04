'use client'; //

import { useEffect, useState, useMemo } from 'react';
import { ThemeProvider, CssBaseline, CircularProgress, Typography, Box } from '@mui/material';
import { getTheme } from '@/lib/theme';
import ThemeToggleButton from '@/components/common/ThemeToggleButton';

export default function MuiThemeProvider({ children }) {
  const [mode, setMode] = useState(null); // เริ่มต้นด้วย null เพื่อจัดการ loading state ของ theme
  
  useEffect(() => {
    // ตรวจสอบว่า `window` object มีอยู่ (เพื่อให้โค้ดนี้รันเฉพาะฝั่ง Client)
    if (typeof window !== 'undefined') { //
      const savedMode = localStorage.getItem('theme');
      // ตรวจสอบ prefers-color-scheme เป็น fallback หากไม่มีใน localStorage
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialMode = savedMode || (systemPrefersDark ? 'dark' : 'light');

      setMode(initialMode); //
      document.documentElement.classList.toggle('dark', initialMode === 'dark');
    }
  }, []); //

  const theme = useMemo(() => {
    return getTheme(mode || 'light');
  }, [mode]); //

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme', newMode);
    document.documentElement.classList.toggle('dark', newMode === 'dark');
  };

  // แสดง Loading state จนกว่า mode จะถูกกำหนด
  if (mode === null) { //
    return (
      <Box //
        sx={{ //
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 2,
          bgcolor: 'background.default',
          color: 'text.primary',
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h5" color="text.secondary">
          Loading...
        </Typography>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
      <ThemeToggleButton onToggle={toggleMode} />
    </ThemeProvider>
  );
}