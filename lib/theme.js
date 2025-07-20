'use client';

import { createTheme } from '@mui/material/styles';

export const getTheme = (mode = 'light') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#cc8f2a',
      },
      background: {
        default: mode === 'light' ? '#ffffff' : '#0a0a0a',
        paper: mode === 'light' ? '#f5f5f5' : '#121212',
      },
      text: {
        primary: mode === 'light' ? '#171717' : '#ededed',
      },
    },
    typography: {
      fontFamily: ['Poppins', 'Prompt', 'sans-serif'].join(','),
      button: {
        textTransform: 'none',
      },
    },
  });
