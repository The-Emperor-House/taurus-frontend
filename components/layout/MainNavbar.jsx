'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "@mui/material/styles";
import { AppBar, Toolbar, Box } from "@mui/material";

import NavLink from "@/components/layout/navbar/NavLink";
import UserAuthSection from "@/components/layout/navbar/UserAuthSection";
import MobileMenuButton from "@/components/layout/navbar/MobileMenuButton";
import MobileMenuOverlay from "@/components/layout/navbar/MobileMenuOverlay";
// =================================================================


export default function MainNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [desktopAnchorEl, setDesktopAnchorEl] = useState(null);
  const [imageError, setImageError] = useState(false);

  const { data: session, status } = useSession();
  const pathname = usePathname();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const isHomePage = pathname === "/";

  const user = session?.user;
  const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "U";
  const fullAvatarUrl = !imageError ? user?.avatarUrl : undefined;
  // console.log("User:", user, "Session:", session, "Status:", status);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        setIsScrolled(scrollY > 0);
        setScrollProgress((scrollY / docHeight) * 100);
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= theme.breakpoints.values.md && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen, theme.breakpoints.values.md]);

  // Close mobile menu on path change (if not handled by NavLink onClick)
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);


  // Define nav links (can be moved to a constants file in lib/ if shared widely)
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About Us" },
    { href: "/design", label: "Design" },
    { href: "/projects", label: "Projects" },
    { href: "/#showroom", label: "Showroom" },
    { href: "/#news", label: "News & Events" },
    { href: "/contact", label: "Contact" },
  ];

  // Helper to handle smooth scroll for hash links
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

  const handleDesktopMenuOpen = (event) => setDesktopAnchorEl(event.currentTarget);
  const handleDesktopMenuClose = () => setDesktopAnchorEl(null);
  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
    handleDesktopMenuClose();
    setIsMobileMenuOpen(false);
  };

  // Dynamic logo source based on scroll and theme
  const logoSrc = isScrolled
    ? "/navbar/logo webp/taurusOrange.webp"
    : isDarkMode
    ? "/navbar/logo webp/taurusWhite.webp"
    : "/navbar/logo webp/taurusDark.webp";

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        width: "100%",
        zIndex: theme.zIndex.appBar,
        transition: theme.transitions.create(['background-color', 'box-shadow'], {
          duration: theme.transitions.duration.shorter,
          easing: theme.transitions.easing.easeInOut,
        }),
        backgroundColor: isHomePage && !isScrolled
          // ? "transparent" // Use transparent background for home page
          ? (isDarkMode ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.8)") // Use a semi-transparent background for home page
          : (isDarkMode ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.8)"),
        boxShadow: (isHomePage && !isScrolled) ? "none" : theme.shadows[3],
        backdropFilter: (isHomePage && !isScrolled) ? "none" : "blur(8px)",
      }}
      component={motion.nav}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Scroll Progress Bar */}
      <motion.div
        style={{ width: `${scrollProgress}%` }}
        className="h-1 bg-[#cc8f2a]"
      />

      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center', px: { xs: 2, sm: 3, md: 4 }, py: { xs: 1, sm: 1.5 } }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
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
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3 }}>
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              pathname={pathname}
              isDarkMode={isDarkMode}
              handleSmoothScroll={handleSmoothScroll}
            />
          ))}
          <UserAuthSection
            session={session}
            status={status}
            user={user}
            firstLetter={firstLetter}
            fullAvatarUrl={fullAvatarUrl}
            handleDesktopMenuOpen={handleDesktopMenuOpen}
            handleDesktopMenuClose={handleDesktopMenuClose}
            desktopAnchorEl={desktopAnchorEl}
            handleLogout={handleLogout}
            isDarkMode={isDarkMode}
          />
        </Box>

        {/* Hamburger / Close Icon for Mobile */}
        <MobileMenuButton
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          isDarkMode={isDarkMode}
        />
      </Toolbar>

      {/* Mobile Menu Overlay */}
      <MobileMenuOverlay
        isMobileMenuOpen={isMobileMenuOpen}
        navLinks={navLinks}
        pathname={pathname}
        isDarkMode={isDarkMode}
        handleSmoothScroll={handleSmoothScroll}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        session={session}
        status={status}
        user={user}
        firstLetter={firstLetter}
        fullAvatarUrl={fullAvatarUrl}
        handleLogout={handleLogout}
      />
    </AppBar>
  );
}