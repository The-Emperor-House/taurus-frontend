"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export default function MainNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [showMobileUserMenu, setShowMobileUserMenu] = useState(false);

  const { data: session, status } = useSession();
  const pathname = usePathname();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const user = session?.user;
  const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "U";
  const fullAvatarUrl = !imageError ? user?.avatarUrl : undefined;

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const docHeight =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
        setIsScrolled(scrollY > 0);
        setScrollProgress((scrollY / docHeight) * 100);
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/page/about", label: "About Us" },
    { href: "/page/design", label: "Design" },
    { href: "/#projects", label: "Projects" },
    { href: "/#showroom", label: "Showroom" },
    { href: "/#news", label: "News & Events" },
    { href: "/page/contact", label: "Contact" },
  ];

  const handleSmoothScroll = (e, href) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const targetId = href.replace("/#", "");
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
        setIsOpen(false);
      }
    }
  };

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
    handleMenuClose();
  };

  const logoSrc = isScrolled
    ? "/navbar/logo webp/taurusOrange.webp"
    : isDarkMode
    ? "/navbar/logo webp/taurusWhite.webp"
    : "/navbar/logo webp/taurusDark.webp";

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        isScrolled
          ? `${isDarkMode ? "bg-black/80" : "bg-white/80"} shadow backdrop-blur`
          : "bg-transparent"
      }`}
      style={{ willChange: "transform, opacity" }}
    >
      <motion.div
        style={{ width: `${scrollProgress}%` }}
        className="h-1 bg-[#cc8f2a]"
      />

      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <motion.div
            animate={{ scale: isScrolled ? 0.85 : 1 }}
            transition={{ duration: 0.3 }}
            style={{ width: 120, height: 80, position: "relative" }}
          >
          <Image
            src={logoSrc}
            alt="Logo"
            fill
            sizes="(max-width: 768px) 120px, 160px"
            style={{ objectFit: "contain" }}
            onError={() => setImageError(true)}
            className="transition-transform duration-300"
            priority
            quality={isScrolled ? 50 : 100}
          />
          </motion.div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className={`relative text-lg transition-all duration-300 ${
                pathname === link.href
                  ? "font-semibold text-[#cc8f2a] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-[#cc8f2a]"
                  : isDarkMode
                  ? "text-white"
                  : "text-gray-800"
              } hover:text-[#cc8f2a]`}
            >
              {link.label}
            </Link>
          ))}
          {status === "authenticated" && (
            <>
              <IconButton onClick={handleMenuOpen} size="small" sx={{ ml: 1 }}>
                <Avatar
                  src={fullAvatarUrl}
                  alt={user?.name || "User"}
                  sx={{ width: 40, height: 40 }}
                  imgProps={{ onError: () => setImageError(true) }}
                >
                  {firstLetter}
                </Avatar>
              </IconButton>

              {anchorEl && (
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    elevation: 4,
                    sx: { mt: 1.5, minWidth: 200 },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem component={Link} href="/page/dashboard/design">
                    <ListItemIcon>
                      <DashboardIcon fontSize="small" />
                    </ListItemIcon>
                    Design
                  </MenuItem>
                  <MenuItem component={Link} href="/page/dashboard/contact">
                    <ListItemIcon>
                      <DashboardIcon fontSize="small" />
                    </ListItemIcon>
                    Contact
                  </MenuItem>
                  <MenuItem component={Link} href="/page/dashboard/profile">
                    <ListItemIcon>
                      <AccountCircleIcon fontSize="small" />
                    </ListItemIcon>
                    Profile
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              )}
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          aria-label="Toggle navigation menu"
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={`absolute w-6 h-0.5 ${
              isDarkMode ? "bg-white" : "bg-gray-800"
            } transform ${isOpen ? "rotate-45" : "-translate-y-2"}`}
          />
          <span
            className={`absolute w-6 h-0.5 ${
              isDarkMode ? "bg-white" : "bg-gray-800"
            } ${isOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`absolute w-6 h-0.5 ${
              isDarkMode ? "bg-white" : "bg-gray-800"
            } transform ${isOpen ? "-rotate-45" : "translate-y-2"}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden ${
              isDarkMode ? "bg-black" : "bg-white"
            } overflow-hidden`}
          >
            <div className="flex flex-col p-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className={`relative text-lg transition-all duration-300 ${
                    pathname === link.href
                      ? "font-semibold text-[#cc8f2a] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-[#cc8f2a]"
                      : isDarkMode
                      ? "text-white"
                      : "text-gray-800"
                  } hover:text-[#cc8f2a]`}
                >
                  {link.label}
                </Link>
              ))}

              {status === "authenticated" && (
                <>
                  <button
                    onClick={() => setShowMobileUserMenu(!showMobileUserMenu)}
                    className="flex items-center text-lg hover:text-[#cc8f2a]"
                  >
                    Account
                    {showMobileUserMenu ? (
                      <ExpandLessIcon />
                    ) : (
                      <ExpandMoreIcon />
                    )}
                  </button>

                  <AnimatePresence>
                    {showMobileUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-4 flex flex-col space-y-1"
                      >
                        <Link
                          href="/dashboard/contact"
                          className="text-md hover:text-[#cc8f2a]"
                        >
                          Contact
                        </Link>
                        <Link
                          href="/dashboard/profile"
                          className="text-md hover:text-[#cc8f2a]"
                        >
                          Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="text-left text-md hover:text-[#cc8f2a]"
                        >
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
