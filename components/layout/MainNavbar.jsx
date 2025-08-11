"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useSession } from "next-auth/react";
import { useLogout } from "@/hooks/useLogout";

export default function MainNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const { logout } = useLogout();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About Us" },
    { href: "/design", label: "Design" },
    { href: "/projects", label: "Projects" },
    { href: "/#showroom", label: "Showroom" },
    { href: "/#news", label: "News & Events" },
    { href: "/contact", label: "Contact" },
  ];

  const handleSmoothScroll = (e, href) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const targetId = href.replace("/#", "");
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
        setIsMobileMenuOpen(false);
      }
    }
  };

  const handleLogout = () => {
    logout(session?.refreshToken);
    setIsMobileMenuOpen(false);
  };

  const logoSrc = "/navbar/logo webp/taurusWhite.webp";

  return (
    <AppBar
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
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              width: 160,
              height: 100,
              position: "relative",
              ml: 5,
              display: { xs: "none", md: "block" }, // ซ่อนใน mobile
            }}
          >
            <Image
              src={logoSrc}
              alt="Taurus Logo"
              fill
              sizes="(max-width: 1200px) 100vw, 160px"
              priority
            />
          </Box>
        </Link>

        {/* Desktop Menu */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 3,
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              style={{
                textDecoration: "none",
                fontSize: "1.2rem",
                color: "#fff",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#cc8f2a")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#fff")}
            >
              {link.label}
            </Link>
          ))}

          {/* User Section */}
          {status === "authenticated" && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          )}
        </Box>

        {/* Mobile Menu Button */}
        <IconButton
          sx={{ display: { xs: "flex", md: "none" }, color: "#fff" }}
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        PaperProps={{
          sx: { backgroundColor: "#111", color: "#fff", width: 250 },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
          <IconButton
            onClick={() => setIsMobileMenuOpen(false)}
            sx={{ color: "#fff" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <List>
          {navLinks.map((link) => (
            <ListItem key={link.href} disablePadding>
              <ListItemButton
                component={Link}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                sx={{
                  color: "#fff",
                  transition: "color 0.2s ease",
                  "&:hover": { color: "#cc8f2a" },
                }}
              >
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          ))}

          <ListItem>
            {status === "authenticated" && (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleLogout}
                sx={{ mt: 2 }}
              >
                Logout
              </Button>
            )}
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
}
