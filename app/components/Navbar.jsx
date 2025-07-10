"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import LogoutDialog from "./LogoutDialog";

const UserProfile = ({ user }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const firstLetter = user?.name?.[0]?.toUpperCase() || "U";

  return (
    <div className="relative" ref={profileRef}>
      <button
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className="w-11 h-11 bg-gray-500 rounded-full flex items-center justify-center font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[#cc8f2a]"
      >
        <span className="text-white">{firstLetter}</span>
      </button>

      <AnimatePresence>
        {isProfileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg py-1 z-50"
          >
            <Link
              href="/auth/dashboard"
              className="block px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => setIsProfileOpen(false)}
            >
              Dashboard
            </Link>
            <button
              onClick={() => setIsLogoutDialogOpen(true)}
              className="w-full text-left block px-4 py-2 text-sm hover:bg-gray-100"
            >
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <LogoutDialog isOpen={isLogoutDialogOpen} onClose={() => setIsLogoutDialogOpen(false)} />
    </div>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const { data: session, status } = useSession();

  const hoverEffect = {
    text: "hover:text-[#cc8f2a] transition-colors duration-300",
    button: "hover:bg-[#e0a040] transition-colors duration-300",
    mobileItem: "hover:bg-gray-700 transition-colors duration-300",
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/design", label: "Design" },
    { href: "/projects", label: "Projects" },
    { href: "/showroom", label: "Showroom" },
    { href: "/news", label: "News & Events" },
    { href: "/contact", label: "Contact" },
  ];

  const renderAuthSection = (isMobile = false) => {
    if (status === "loading") {
      return <div className="w-24 h-10 bg-gray-700 rounded-full animate-pulse"></div>;
    }

    if (status === "authenticated") {
      return isMobile ? (
        <>
          <Link
            href="/auth/dashboard"
            className={`block text-xl py-3 px-4 rounded-lg bg-[#cc8f2a]/80 text-white font-medium text-center ${hoverEffect.button}`}
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <button
            onClick={() => {
              signOut({ callbackUrl: "/auth/login" });
              setIsOpen(false);
            }}
            className={`w-full text-left block text-xl py-3 px-4 rounded-lg ${hoverEffect.mobileItem}`}
          >
            Logout
          </button>
        </>
      ) : (
        <UserProfile user={session.user} />
      );
    }

    return null;
  };

  return (
    <nav className="bg-[#404040] text-white p-4 font-poppins fixed w-full z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
        >
          <Image
            src={
              isLogoHovered
                ? "/navbar/logo webp/taurusOrange.webp"
                : "/navbar/logo webp/taurusWhite.webp"
            }
            alt="Taurus Logo"
            width={120}
            height={0}
            priority
          />
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={`text-xl font-light ${hoverEffect.text}`}>
              {link.label}
            </Link>
          ))}
          {renderAuthSection()}
        </div>

        <button className="md:hidden focus:outline-none p-2" onClick={() => setIsOpen(!isOpen)}>
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-white transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`block h-0.5 bg-white transition-all ${isOpen ? "opacity-0" : ""}`}></span>
            <span className={`block h-0.5 bg-white transition-all ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </div>
        </button>
      </div>

      <div className={`md:hidden bg-[#404040] overflow-hidden transition-all duration-300 ${isOpen ? "max-h-screen mt-4" : "max-h-0"}`}>
        <div className="space-y-3 py-4 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-xl py-3 px-4 rounded-lg hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <hr className="border-gray-600" />
          {renderAuthSection(true)}
        </div>
      </div>
    </nav>
  );
}
