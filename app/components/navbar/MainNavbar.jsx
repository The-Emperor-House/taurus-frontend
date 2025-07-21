"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { useTheme } from "@mui/material/styles";
import AccountMenu from './AccountMenu';

export default function MainNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHash, setActiveHash] = useState("");
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setIsScrolled(scrollY > 0);
      setScrollProgress((scrollY / docHeight) * 100);
      setActiveHash(window.location.hash);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/#design", label: "Design" },
    { href: "/#projects", label: "Projects" },
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
        setIsOpen(false);
        setActiveHash(`#${targetId}`);
      }
    }
  };

  const textColor = isDarkMode ? "text-white" : "text-gray-800";
  const bgColor = isDarkMode ? "bg-black/80" : "bg-[#404040]/80";
  const hamburgerColor = isDarkMode ? "bg-white" : "bg-gray-800";
  const logoSrc = isScrolled ? "/navbar/logo webp/taurusOrange.webp" : "/navbar/logo webp/taurusWhite.webp";

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        isScrolled ? `${bgColor} shadow backdrop-blur` : "bg-transparent"
      }`}
    >
      <motion.div style={{ width: `${scrollProgress}%` }} className="h-1 bg-[#cc8f2a]" />

      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <motion.div animate={{ scale: isScrolled ? 0.85 : 1 }} transition={{ duration: 0.3 }} whileHover={{ scale: 1.05 }}>
            <Image src={logoSrc} alt="Logo" width={isScrolled ? 100 : 120} height={isScrolled ? 33 : 40} priority />
          </motion.div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (pathname === "/" && activeHash === link.href.replace("/", ""));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className={`relative text-lg transition-all duration-300 ${
                  isActive
                    ? "font-semibold text-[#cc8f2a] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-[#cc8f2a]"
                    : textColor
                } hover:text-[#cc8f2a]`}
              >
                {link.label}
              </Link>
            );
          })}
          {status === "authenticated" && <AccountMenu user={session.user} />}
        </div>

        {/* Hamburger */}
        <button className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative" onClick={() => setIsOpen(!isOpen)}>
          <motion.span
            className={`absolute w-6 h-0.5 ${hamburgerColor}`}
            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 0 : -6 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className={`absolute w-6 h-0.5 ${hamburgerColor}`}
            animate={{ opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className={`absolute w-6 h-0.5 ${hamburgerColor}`}
            animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? 0 : 6 }}
            transition={{ duration: 0.3 }}
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
            className={`md:hidden ${isDarkMode ? "bg-black" : "bg-[#404040]"} overflow-hidden`}
          >
            <div className="flex flex-col p-4 space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (pathname === "/" && activeHash === link.href.replace("/", ""));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className={`relative text-lg transition-all duration-300 ${
                      isActive
                        ? `font-semibold text-[#cc8f2a] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-[#cc8f2a]`
                        : `${textColor}`
                    } hover:text-[#cc8f2a]`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              {status === "authenticated" && <AccountMenu user={session.user} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}