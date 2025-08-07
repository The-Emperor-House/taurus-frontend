'use client';

import Link from "next/link";
import { Box, IconButton, Avatar, CircularProgress } from "@mui/material";
import UserDropdownMenu from "@/components/layout/navbar/UserDropdownMenu";

const UserAuthSection = ({
  session,
  status,
  user,
  firstLetter,
  fullAvatarUrl,
  handleDesktopMenuOpen,
  handleDesktopMenuClose,
  desktopAnchorEl,
  handleLogout,
  isDarkMode
}) => {
  const authLoading = status === "loading";

  if (authLoading) {
    return <CircularProgress size={24} sx={{ color: 'primary.main', ml: 1 }} />;
  }

  if (session) {
    return (
      <Box display="flex" alignItems="center">
        <IconButton onClick={handleDesktopMenuOpen} size="small" sx={{ ml: 1, p: 0 }}>
          <Avatar
            src={fullAvatarUrl}
            alt={user?.name || "User"}
            sx={{ width: 40, height: 40 }}
          >
            {firstLetter}
          </Avatar>
        </IconButton>
        {desktopAnchorEl && (
          <UserDropdownMenu
            user={user}
            fullAvatarUrl={fullAvatarUrl}
            firstLetter={firstLetter}
            handleLogout={handleLogout}
            handleMenuClose={handleDesktopMenuClose}
            anchorEl={desktopAnchorEl}
            open={Boolean(desktopAnchorEl)}
          />
        )}
      </Box>
    );
  }

  return (
    <Link
      href="/auth/login"
      className="text-primary-main hover:text-primary-hover transition-colors duration-200"
      style={{ textDecoration: 'none', fontWeight: 600 }}
      onClick={() => {
        if (handleDesktopMenuClose) handleDesktopMenuClose();
      }}
    >
      Login
    </Link>
  );
};

export default UserAuthSection;