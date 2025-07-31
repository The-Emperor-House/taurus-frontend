'use client';

import { motion, AnimatePresence } from "framer-motion";
import { Box, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import NavLink from "@/components/layout/navbar/NavLink";
import MobileUserSubMenu from "@/components/layout/navbar/MobileUserSubMenu";

const MobileMenuOverlay = ({
  isMobileMenuOpen,
  navLinks,
  pathname,
  isDarkMode,
  handleSmoothScroll,
  setIsMobileMenuOpen,
  session,
  status,
  user,
  firstLetter,
  fullAvatarUrl,
  handleLogout,
}) => {
  const theme = useTheme();
  const authLoading = status === "loading";

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ overflow: 'hidden' }}
        >
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexDirection: 'column',
              p: 2,
              gap: 1.5,
              backgroundColor: isDarkMode ? "black" : "white",
              borderTop: `1px solid ${theme.palette.divider}`,
              minHeight: 'calc(100vh - 64px)',
            }}
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                pathname={pathname}
                isDarkMode={isDarkMode}
                handleSmoothScroll={handleSmoothScroll}
                setIsOpen={setIsMobileMenuOpen}
              />
            ))}

            {/* Mobile User Menu */}
            {authLoading ? (
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start', py: 1 }}>
                <CircularProgress size={24} sx={{ color: 'primary.main' }} />
              </Box>
            ) : session ? (
              <MobileUserSubMenu
                user={user}
                firstLetter={firstLetter}
                handleLogout={handleLogout}
                fullAvatarUrl={fullAvatarUrl}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
              />
            ) : (
              <NavLink
                href="/auth/login"
                label="Login"
                pathname={pathname}
                isDarkMode={isDarkMode}
                setIsOpen={setIsMobileMenuOpen}
              />
            )}
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenuOverlay;