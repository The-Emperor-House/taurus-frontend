"use client";

import { useAuth } from '../context/AuthContext';
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

// Component ย่อยสำหรับจัดการส่วนของผู้ใช้ที่ Login แล้ว
const UserProfile = ({ onLogout }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // ทำให้เมนูปิดลงเมื่อคลิกที่อื่น
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  return (
    <div className="relative" ref={profileRef}>
      <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="w-11 h-11 bg-gray-500 rounded-full flex items-center justify-center font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[#cc8f2a]">
        <span className="text-white">
          {/* แสดงตัวอักษรแรกของชื่อผู้ใช้ */}
          {onLogout ? "U" : "G"}
          
        </span>
      </button>

      {/* Dropdown Menu */}
      {isProfileOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg py-1 z-50">
          <Link href="/auth/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={() => setIsProfileOpen(false)}>
            Dashboard
          </Link>
          <button onClick={onLogout} className="w-full text-left block px-4 py-2 text-sm hover:bg-gray-100">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

// Component หลักของ Navbar
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  
  const { authStatus, logout } = useAuth(); 

  const hoverEffect = {
    text: "hover:text-[#cc8f2a] transition-colors duration-300",
    button: "hover:bg-[#e0a040] transition-colors duration-300",
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

  const handleMobileLogout = () => {
    logout();
    setIsOpen(false);
  };
  
  const renderAuthSection = (isMobile = false) => {
    if (authStatus === 'loading') {
      return <div className="w-24 h-10 bg-gray-700 rounded-full animate-pulse"></div>;
    }
    
    if (authStatus === 'authenticated') {
      return isMobile ? (
        <>
          <Link href="/dashboard" className={`block text-xl py-3 px-4 rounded-lg bg-[#cc8f2a]/80 text-white font-medium text-center ${hoverEffect.button}`} onClick={() => setIsOpen(false)}>Dashboard</Link>
          <button onClick={handleMobileLogout} className={`w-full text-left block text-xl py-3 px-4 rounded-lg ${hoverEffect.mobileItem}`}>Logout</button>
        </>
      ) : (
        <UserProfile onLogout={logout} />
      );
    }
  }

  return (
    <nav className="bg-[#404040] text-white p-4 font-poppins fixed w-full z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" onMouseEnter={() => setIsLogoHovered(true)} onMouseLeave={() => setIsLogoHovered(false)}>
          <Image src={isLogoHovered ? "/navbar/logo webp/taurusOrange.webp" : "/navbar/logo webp/taurusWhite.webp"} alt="Taurus Logo" width={120} height={40} className="w-auto h-[40px] md:h-[65px]" priority />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={`text-xl font-light ${hoverEffect.text}`}>
              {link.label}
            </Link>
          ))}
          {renderAuthSection()}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden focus:outline-none p-2" onClick={() => setIsOpen(!isOpen)}>
          <div className="w-6 flex flex-col gap-1.5">
             <span className={`block h-0.5 bg-white transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
             <span className={`block h-0.5 bg-white transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
             <span className={`block h-0.5 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
           </div>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden bg-[#404040] overflow-hidden transition-all duration-300 ${isOpen ? "max-h-screen mt-4" : "max-h-0"}`}>
        <div className="space-y-3 py-4 px-4">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="block text-xl py-3 px-4 rounded-lg hover:bg-gray-700" onClick={() => setIsOpen(false)}>
              {link.label}
            </Link>
          ))}
          <hr className="border-gray-600"/>
          {renderAuthSection(true)}
        </div>
      </div>
    </nav>
  );
}