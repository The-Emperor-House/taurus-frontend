"use client";

import { useState, useCallback, useMemo } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Avatar,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";

import { useSession, signIn } from "next-auth/react";
import { useLogout } from "@/hooks/useLogout";

import LogoSwap from "./navbar/LogoSwap";
import NavLinks from "./navbar/NavLinks";
import MobileNavDrawer from "./navbar/MobileNavDrawer";
import AccountPanel from "./navbar/AccountPanel";
import AccountDrawer from "./navbar/AccountDrawer";

export default function MainNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const { data: session, status } = useSession();
  const isAuthed = status === "authenticated";
  const { logout } = useLogout();

  const navLinks = useMemo(
    () => [
      { href: "/", label: "Home" },
      { href: "/about-us", label: "About Us" },
      { href: "/design", label: "Design" },
      { href: "/projects", label: "Projects" },
      { href: "/furniture", label: "Showroom" },
      { href: "/news", label: "News & Events" },
      { href: "/contact", label: "Contact" },
    ],
    []
  );

  const handleSmoothScroll = useCallback((e, href) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const id = href.slice(2);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
        setIsMobileMenuOpen(false);
      }
    }
  }, []);

  const handleLogout = () => {
    logout(session?.refreshToken);
    setIsMobileMenuOpen(false);
    setIsAccountOpen(false);
  };

  return (
    <AppBar
      id="main-navbar"
      position="absolute"
      sx={{ backgroundColor: "transparent", boxShadow: "none", top: "50px" }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          py: 1,
        }}
      >
        {/* Logo: md+ — ขยับไปทางขวาเล็กน้อยด้วย ml */}
        <Box id="brand-md" sx={{ display: { xs: "none", md: "block" }, ml: 4 }}>
          <LogoSwap width={200} height={120} showOnXs={false} />
        </Box>

        {/* Logo: xs (มือถือ) — ขยับขวานิดหน่อยเช่นกัน */}
        <Box id="brand-xs" sx={{ display: { xs: "block", md: "none" }, ml: 1 }}>
          <LogoSwap width={110} height={70} showOnXs />
        </Box>

        {/* กลุ่มขวา: รวม "ลิงก์เดสก์ท็อป" + "ปุ่ม auth" ไว้ในกล่องเดียวกัน → nav ติดกับ auth */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <NavLinks links={navLinks} onSmoothScroll={handleSmoothScroll} />
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
            <Button
              onClick={() => signIn()}
              startIcon={<LoginIcon />}
              color="primary"
              variant="contained"
              sx={{ ml: 0.5 }}
            >
              Login
            </Button>
          )}
        </Box>

        {/* ปุ่มเมนูมือถือ */}
        <IconButton
          sx={{ display: { xs: "flex", md: "none" }, color: "common.white" }}
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="open menu"
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Mobile drawer */}
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

      {/* Account drawer (desktop & ใช้ใน mobile ได้ถ้าต้องการ) */}
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
