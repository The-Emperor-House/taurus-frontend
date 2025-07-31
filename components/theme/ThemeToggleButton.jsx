'use client';

import { IconButton, Box, Tooltip } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme } from '@mui/material/styles';

export default function ThemeToggleButton({ onToggle }) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 9999,
        bgcolor: 'background.paper',
        borderRadius: '50%',
        boxShadow: 3,
      }}
    >
      <Tooltip title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}>
        <IconButton
          onClick={onToggle}
          color="primary"
          sx={{
            width: 48,
            height: 48,
          }}
        >
          {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Tooltip>
    </Box>
  );
}
