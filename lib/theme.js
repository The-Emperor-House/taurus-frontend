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
      fontFamily: "var(--font-poppins), var(--font-prompt), sans-serif",
      fontSize: 16,
      allVariants: {
        color: mode === 'light' ? '#171717' : '#ededed',
      },
      h1: { fontWeight: 700, fontSize: '3rem' },
      h2: { fontWeight: 700, fontSize: '2.25rem' },
      h3: { fontWeight: 600, fontSize: '1.875rem' },
      h4: { fontWeight: 600, fontSize: '1.5rem' },
      h5: { fontWeight: 500, fontSize: '1.25rem' },
      h6: { fontWeight: 500, fontSize: '1rem' },
      body1: { fontWeight: 400, fontSize: '1rem' },
      body2: { fontWeight: 400, fontSize: '0.875rem' },
      button: { fontWeight: 500, textTransform: 'none', fontSize: '0.875rem' },
    },
  });