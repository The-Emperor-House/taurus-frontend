"use client"; // จำเป็นเพราะใช้ useState

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 h-16 text-white px-4 py-3 font-poppins">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-bold hover:text-[#cc8f2a] transition-colors duration-300"
        >
          Taurus by Emperor
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
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
          <Link
            href="/"
            className="hover:text-[#cc8f2a] transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="hover:text-[#cc8f2a] transition-colors duration-300"
          >
            About Us
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2 font-medium px-2">
          <Link
            href="/"
            className="block px-3 py-2 rounded hover:bg-[#cc8f2a]/10 hover:text-[#cc8f2a] transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block px-3 py-2 rounded hover:bg-[#cc8f2a]/10 hover:text-[#cc8f2a] transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            About Us
          </Link>
        </div>
      )}
    </nav>
  );
}
