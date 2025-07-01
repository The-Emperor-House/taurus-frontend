'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  // คลาสสำหรับเอฟเฟกต์ hover
  const hoverEffect = {
    text: 'hover:text-[#cc8f2a] transition-colors duration-300',
    button: 'hover:bg-[#e0a040] transition-colors duration-300',
    mobileItem: 'hover:bg-[#cc8f2a]/10 hover:text-[#cc8f2a] transition-colors duration-300'
  };

  // ลิงก์เมนู
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/design', label: 'Design' },
    { href: '/projects', label: 'Projects' },
    { href: '/showroom', label: 'Showroom' },
    { href: '/news', label: 'News & Events' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="bg-[#404040] text-white p-4 font-poppins fixed w-full z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="inline-block"
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
          aria-label="Taurus Home"
        >
          <Image
            src={
              isLogoHovered
                ? '/navbar/logo webp/taurusOrange.webp'
                : '/navbar/logo webp/taurusWhite.webp'
            }
            alt="Taurus Logo"
            width={110}
            height={65}
            className="w-auto h-[40px] md:h-[65px]"
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xl font-light ${hoverEffect.text}`}
            >
              {link.label}
            </Link>
          ))}
          
          {/* Login Button */}
          <Link
            href="/login"
            className={`ml-6 bg-[#cc8f2a] text-white font-medium py-2 px-6 rounded-full ${hoverEffect.button}`}
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-white transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block h-0.5 bg-white transition-all ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block h-0.5 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden bg-[#404040] overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-screen mt-4' : 'max-h-0'}`}>
        <div className="space-y-3 py-4 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block text-xl py-3 px-4 rounded-lg ${hoverEffect.mobileItem}`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            className={`block text-xl py-3 px-4 rounded-lg bg-[#cc8f2a] text-white font-medium text-center ${hoverEffect.button}`}
            onClick={() => setIsOpen(false)}
          >
            Member Login
          </Link>
        </div>
      </div>
    </nav>
  );
}