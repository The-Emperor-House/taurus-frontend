'use client';

import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { getTheme } from './getTheme';
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

export default function ThemeProvider({ children }) {
  const { mode } = useContext(ThemeContext);
  const theme = getTheme(mode);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}