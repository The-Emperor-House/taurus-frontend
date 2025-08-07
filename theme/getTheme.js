import { createTheme } from '@mui/material/styles';
import palette from './palette';

export const getTheme = (mode = 'light') =>
  createTheme({
    palette: palette(mode),
    typography: {
      fontFamily: 'Poppins, Prompt, sans-serif',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            textTransform: 'none',
            fontWeight: 600,
          },
          containedPrimary: {
            '&:hover': {
              backgroundColor: '#a36d12',
            },
          },
          containedSecondary: {
            '&:hover': {
              backgroundColor: '#8a7260',
            },
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? '#000000' : '#666666',
          },
        },
      },
    },
  });