"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Avatar,
  Divider,
  ListSubheader,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import ContactMailIcon from "@mui/icons-material/ContactMail";

import { useSession, signIn } from "next-auth/react";
import { useLogout } from "@/hooks/useLogout";

export default function MainNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

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
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
        setIsMobileMenuOpen(false);
      }
    }
  };

  const handleLogout = () => {
    logout(session?.refreshToken);
    setIsMobileMenuOpen(false);
    setIsAccountOpen(false);
  };

  const logoSrc = "/navbar/logo webp/taurusWhite.webp";

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
        <Link href="/" style={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              width: 160,
              height: 100,
              position: "relative",
              ml: 5,
              display: { xs: "none", md: "block" },
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

        {/* Desktop menu */}
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

          {/* Account trigger (desktop) */}
          {status === "authenticated" ? (
            <IconButton
              onClick={() => setIsAccountOpen(true)}
              sx={{ color: "#fff" }}
              aria-label="open account drawer"
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
            <IconButton
              onClick={() => signIn()}
              sx={{ color: "#fff" }}
              aria-label="login"
              title="Login"
            >
              <LoginIcon />
            </IconButton>
          )}
        </Box>

        {/* Mobile menu button */}
        <IconButton
          sx={{ display: { xs: "flex", md: "none" }, color: "#fff" }}
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="open menu"
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Mobile main drawer (navigation) */}
      <Drawer
        anchor="right"
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        PaperProps={{
          sx: { backgroundColor: "#111", color: "#fff", width: 280 },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
          <IconButton
            onClick={() => setIsMobileMenuOpen(false)}
            sx={{ color: "#fff" }}
            aria-label="close menu"
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <List sx={{ pt: 0 }}>
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
        </List>

        <Divider sx={{ my: 1, borderColor: "rgba(255,255,255,0.12)" }} />

        {/* Account section on mobile (same items) */}
        <List
          subheader={
            <ListSubheader
              sx={{
                bgcolor: "transparent",
                color: "#cc8f2a",
                fontWeight: 700,
                letterSpacing: ".06em",
              }}
            >
              Dashboard
            </ListSubheader>
          }
        >

          <ListItem disablePadding>
            <ListItemButton component={Link} href="/dashboard/design" onClick={() => setIsMobileMenuOpen(false)}>
              <ListItemIcon sx={{ color: "#cc8f2a" }}>
                <DesignServicesIcon />
              </ListItemIcon>
              <ListItemText primary="Design" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} href="/dashboard/project" onClick={() => setIsMobileMenuOpen(false)}>
              <ListItemIcon sx={{ color: "#cc8f2a" }}>
                <WorkspacesIcon />
              </ListItemIcon>
              <ListItemText primary="Project" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} href="/dashboard/contact" onClick={() => setIsMobileMenuOpen(false)}>
              <ListItemIcon sx={{ color: "#cc8f2a" }}>
                <ContactMailIcon />
              </ListItemIcon>
              <ListItemText primary="Contact" />
            </ListItemButton>
          </ListItem>

          <Divider sx={{ my: 1, borderColor: "rgba(255,255,255,0.12)" }} />

          <ListItem disablePadding>
            <ListItemButton component={Link} href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
              <ListItemIcon sx={{ color: "#cc8f2a" }}>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={handleLogout}
              disabled={status !== "authenticated"}
              sx={{ opacity: status === "authenticated" ? 1 : 0.6 }}
            >
              <ListItemIcon sx={{ color: "#cc8f2a" }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Account drawer (desktop & can be used on mobile too if needed) */}
      <Drawer
        anchor="right"
        open={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        PaperProps={{
          sx: { backgroundColor: "#111", color: "#fff", width: 320 },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
          <IconButton
            onClick={() => setIsAccountOpen(false)}
            sx={{ color: "#fff" }}
            aria-label="close account drawer"
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <List
          subheader={
            <ListSubheader
              sx={{
                bgcolor: "transparent",
                color: "#cc8f2a",
                fontWeight: 700,
                letterSpacing: ".06em",
              }}
            >
              Dashboard
            </ListSubheader>
          }
        >          
        <ListItem disablePadding>
            <ListItemButton component={Link} href="/dashboard/design" onClick={() => setIsAccountOpen(false)}>
              <ListItemIcon sx={{ color: "#cc8f2a" }}>
                <DesignServicesIcon />
              </ListItemIcon>
              <ListItemText primary="Design" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} href="/dashboard/project" onClick={() => setIsAccountOpen(false)}>
              <ListItemIcon sx={{ color: "#cc8f2a" }}>
                <WorkspacesIcon />
              </ListItemIcon>
              <ListItemText primary="Project" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} href="/dashboard/contact" onClick={() => setIsAccountOpen(false)}>
              <ListItemIcon sx={{ color: "#cc8f2a" }}>
                <ContactMailIcon />
              </ListItemIcon>
              <ListItemText primary="Contact" />
            </ListItemButton>
          </ListItem>

          <Divider sx={{ my: 1, borderColor: "rgba(255,255,255,0.12)" }} />

          <ListItem disablePadding>
            <ListItemButton component={Link} href="/profile" onClick={() => setIsAccountOpen(false)}>
              <ListItemIcon sx={{ color: "#cc8f2a" }}>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={handleLogout}
              disabled={status !== "authenticated"}
              sx={{ opacity: status === "authenticated" ? 1 : 0.6 }}
            >
              <ListItemIcon sx={{ color: "#cc8f2a" }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
}
