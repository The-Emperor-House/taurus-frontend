const palette = (mode = 'light') => {
  const isLight = mode === 'light';

  return {
    mode,
    primary: {
      main: '#cc8f2a',
      light: '#e0a741',
      dark: '#a36d12',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ab9685', // ปุ่มรอง
      light: '#cbbdaf',
      dark: '#8a7260',
      contrastText: '#ffffff',
    },
    background: {
      default: isLight ? '#fdfdfd' : '#404040',
      paper: isLight ? '#ffffff' : '#2c2c2c',
    },
    text: {
      primary: isLight ? '#000000' : '#f5f5f5',
      secondary: isLight ? '#4a4a4a' : '#c0c0c0',
    },
    divider: isLight ? '#000000' : '#666666',
    action: {
      hover: isLight ? '#ebe1d8' : '#5c5247',
      selected: isLight ? '#e0d5ca' : '#7a6b5c',
    },
    success: {
      main: '#2e7d32', // เขียวธรรมชาติ
    },
    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#ed6c02',
    },
    info: {
      main: '#0288d1',
    },
  };
};

export default palette;