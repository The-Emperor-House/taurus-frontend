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
      <Box>
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
      className={`text-lg transition-colors duration-300 ${
        isDarkMode ? "text-white" : "text-gray-800"
      } hover:text-[#cc8f2a]`}
      style={{ textDecoration: 'none' }}
    >
      Login
    </Link>
  );
};

export default UserAuthSection;