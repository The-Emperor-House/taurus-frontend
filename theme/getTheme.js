import { createTheme } from '@mui/material/styles';

export const getTheme = (mode = 'light') =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            background: {
              default: '#404040',
            },
          }
        : {
            background: {
              default: '#121212',
            },
          }),
      primary: {
        main: '#ffffffff',
        hover: '#cc8f2a',
      },
      secondary: {
        main: '#dc004e',
      },
      divider: '#eeeeee',
    },
    typography: {
      fontFamily: 'Poppins, Prompt',
    },
  });