import { createTheme } from '@mui/material/styles';

export const getTheme = (mode = 'light') =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            background: {
              default: '#fafafa',
            },
          }
        : {
            background: {
              default: '#121212',
            },
          }),
    },
    typography: {
      fontFamily: 'Poppins, Prompt',
    },
  });