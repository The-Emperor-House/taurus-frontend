'use client';

import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const MobileMenuButton = ({ isMobileMenuOpen, setIsMobileMenuOpen, isDarkMode }) => {
  return (
    <IconButton
      aria-label="Toggle navigation menu"
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      sx={{ display: { xs: 'block', md: 'none' }, color: isDarkMode ? 'white' : 'text.primary' }}
    >
      {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
    </IconButton>
  );
};

export default MobileMenuButton;