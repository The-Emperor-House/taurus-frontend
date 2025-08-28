"use client";

import { useState, useCallback, useMemo } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Avatar,
  Button,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";

import { useSession, signIn } from "next-auth/react";
import { useLogout } from "@/shared/hooks/useLogout";

import LogoSwap from "./LogoSwap";
import NavLinks from "./NavLinks";
import MobileNavDrawer from "./MobileNavDrawer";
import AccountPanel from "./AccountPanel";
import AccountDrawer from "./AccountDrawer";

export default function MainNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const { data: session, status } = useSession();
  const isAuthed = status === "authenticated";
  const { logout } = useLogout();

  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const navLinks = useMemo(
    () => [
      { href: "/", label: "Home" },
      { href: "/about-us", label: "About Us" },
      { href: "/design", label: "Design" },
      { href: "/projects", label: "Projects" },
      { href: "#furniture", label: "Showroom" },
      { href: "/news", label: "News & Events" },
      { href: "/contact", label: "Contact" },
    ],
    []
  );

  const handleLogout = () => {
    logout(session?.refreshToken);
    setIsMobileMenuOpen(false);
    setIsAccountOpen(false);
  };

  const logoW = isLgUp ? 180 : isMdUp ? 150 : 120;
  const logoH = isLgUp ? 108 : isMdUp ? 90 : 70;

  return (
    <AppBar
      id="main-navbar"
      position="absolute"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 2, md: 3, lg: 4 },
          py: 1,
          maxWidth: 1400,
          mx: "auto",
          width: "100%",
        }}
      >
        <Box>
          <LogoSwap width={logoW} height={logoH} showOnXs />
        </Box>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: { md: 1, lg: 1.5 },
            ml: "auto",
            "& a, & .MuiButtonBase-root": {
              fontSize: { md: "0.95rem", lg: "1.2rem" },
              letterSpacing: { md: ".02rem", lg: ".03rem" },
              px: { md: 0.5, lg: 1 },
              whiteSpace: "nowrap",
            },
          }}
        >
          <NavLinks
            links={navLinks}
            dense={!isLgUp}
          />

          {isAuthed ? (
            <IconButton
              onClick={() => setIsAccountOpen(true)}
              sx={{ color: "common.white" }}
              aria-label="open account menu"
            >
              {session?.user?.image ? (
                <Avatar
                  src={session.user.image}
                  alt={session.user.name || "Profile"}
                  sx={{ width: 32, height: 32 }}
                />
              ) : (
                <AccountCircleIcon />
              )}
            </IconButton>
          ) : (
            <Tooltip title="Login">
              <IconButton
                aria-label="login"
                onClick={() => signIn()}
                sx={{
                  color: "common.white",
                  "&:hover": {
                    bgcolor: (t) => t.palette.action.hover,
                  },
                }}
              >
                <LoginIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <IconButton
          sx={{
            display: { xs: "flex", md: "none" },
            color: "common.white",
            ml: "auto",
          }}
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="open menu"
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <MobileNavDrawer
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={navLinks}
        extra={
          isAuthed ? (
            <AccountPanel
              onClose={() => setIsMobileMenuOpen(false)}
              onLogout={handleLogout}
            />
          ) : (
            <Box sx={{ p: 2 }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                startIcon={<LoginIcon />}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  signIn();
                }}
              >
                Login
              </Button>
            </Box>
          )
        }
      />

      {isAuthed && (
        <AccountDrawer
          open={isAccountOpen}
          onClose={() => setIsAccountOpen(false)}
          onLogout={handleLogout}
        />
      )}
    </AppBar>
  );
}
