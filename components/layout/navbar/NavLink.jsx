'use client';

import Link from "next/link";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const NavLink = ({ href, label, pathname, handleSmoothScroll, setIsOpen, classes = "" }) => {
  const isActive = pathname === href || (href === '/' && pathname === '/');
  const isHashLink = href.startsWith("/#");
  const theme = useTheme();

    const commonSx = {
      textTransform: "none",
      fontWeight: isActive ? 600 : 'normal',
      color: isActive ? "primary.main" : "text.primary", // Use primary color for active link
      fontSize: "1rem",
      "&:hover": {
        color: "primary.main", // Change color on hover
        backgroundColor: 'transparent',
      },
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: -4,
      left: 0,
      height: "2px",
      width: "100%",
      transform: isActive ? "scaleX(1)" : "scaleX(0)",
      transition: theme.transitions.create('transform', { duration: 0.3, easing: theme.transitions.easing.easeOut }),
    },
  };

  return (
    <Typography
      component={Link}
      href={href}
      onClick={(e) => {
        if (isHashLink) handleSmoothScroll(e, href);
        if (setIsOpen) setIsOpen(false);
      }}
      sx={{ ...commonSx, position: 'relative', display: 'inline-block' }}
      className={classes}
    >
      {label}
    </Typography>
  );
};

export default NavLink;