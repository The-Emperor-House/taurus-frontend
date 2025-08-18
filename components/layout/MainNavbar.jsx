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

  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

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

  const logoW = isLgUp ? 200 : isMdUp ? 160 : 110;
  const logoH = isLgUp ? 120 : isMdUp ? 96 : 70;

  return (
    <AppBar
      id="main-navbar"
      position="absolute"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        top: "50px",
        zIndex: (t) => t.zIndex.appBar + 1,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 2, md: 3 },
          py: 1,
          gap: { md: 1, lg: 0 },
          maxWidth: 1400,
          mx: "auto",
          width: "100%",
        }}
      >
        <Box sx={{ ml: { xs: 1, md: 2, lg: 4 } }}>
          <LogoSwap width={logoW} height={logoH} showOnXs />
        </Box>

        {/* กลุ่มขวา: รวม "ลิงก์เดสก์ท็อป" + "ปุ่ม auth" ไว้ในกล่องเดียวกัน → nav ติดกับ auth */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" }, // แสดงตั้งแต่ tablet ขึ้นไป
            alignItems: "center",
            // ลดช่องว่าง/ฟอนต์บน tablet ให้ไม่ล้น
            gap: { md: 1, lg: 1.5 },
            "& a, & .MuiButtonBase-root": {
              fontSize: { md: "0.95rem", lg: "1.05rem" },
              letterSpacing: { md: ".02rem", lg: ".03rem" },
              px: { md: 0.5, lg: 1 },
              whiteSpace: "nowrap",
            },
          }}
        >
          <NavLinks
            links={navLinks}
            onSmoothScroll={handleSmoothScroll}
            // ถ้า NavLinks รองรับ prop ปรับขนาด ให้ส่ง dense เมื่ออยู่ tablet
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

        {/* ปุ่มเมนูมือถือ (แสดงเฉพาะ < md) */}
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
