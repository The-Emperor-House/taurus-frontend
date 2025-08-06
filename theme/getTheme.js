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
            divider: '#eeeeee',
            text: {
              primary: '#cc8f2a',
              secondary: '#757575',
            },
            action: {
              active: '#ffffff',
              hover: '#eeeeee',
              selected: '#cccccc',
            },
          }
        : {
            background: {
              default: '#121212',
            },
            divider: '#ffffff',
            text: {
              primary: '#ffffff',
              secondary: '#b0b0b0',
            },
            action: {
              active: '#ffffff',
              hover: '#444444',
              selected: '#555555',
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