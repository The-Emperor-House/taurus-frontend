'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const hoverColor = 'hover:text-[#cc8f2a]';
  const mobileHoverBg = 'hover:bg-[#cc8f2a]/10';

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
    <nav className="bg-[#404040] text-white p-4 font-poppins">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="inline-block"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src={
              isHovered
                ? '/navbar/logo webp/taurusOrange.webp'
                : '/navbar/logo webp/taurusWhite.webp'
            }
            alt="Taurus Logo"
            width={128}
            height={0}
            className="w-32 h-auto"
            priority={false}
          />
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${hoverColor} transition-colors duration-300`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2 font-medium">
          {navLinks.slice(0, 2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-3 py-2 rounded ${mobileHoverBg} ${hoverColor} transition-colors duration-300`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}