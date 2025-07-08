'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import customTheme from '../../lib/theme'; // ปรับเส้นทางให้ตรงกับที่เก็บไฟล์ theme.js ของคุณ

export default function MuiThemeProviderWrapper({ children }) {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}