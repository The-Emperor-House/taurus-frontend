'use client' // จำเป็นเพราะใช้ useState

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)  // เพิ่มตรงนี้

  const hoverColor = 'hover:text-[#cc8f2a]'
  const mobileHoverBg = 'hover:bg-[#cc8f2a]/10'

  return (
    <nav className="bg-gray-800 text-white p-4 font-poppins">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="inline-block"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={isHovered 
              ? '/navbar/logo webp/taurusOrange.webp' 
              : '/navbar/logo webp/taurusWhite.webp'}
            alt="Taurus Logo"
            className="w-32 h-auto"
            loading="lazy"
          />
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 font-medium">
          <Link 
            href="/" 
            className={`${hoverColor} transition-colors duration-300`}
          >
            Home
          </Link>
          <Link 
            href="/about" 
            className={`${hoverColor} transition-colors duration-300`}
          >
            About Us
          </Link>
          <Link 
            href="/design" 
            className={`${hoverColor} transition-colors duration-300`}
          >
            Design
          </Link>
          <Link 
            href="/projects" 
            className={`${hoverColor} transition-colors duration-300`}
          >
            Projects
          </Link>
          <Link 
            href="/showroom" 
            className={`${hoverColor} transition-colors duration-300`}
          >
            Showroom
          </Link>
          <Link 
            href="/newsandevents" 
            className={`${hoverColor} transition-colors duration-300`}
          >
            News & Events
          </Link>
          <Link 
            href="/contact" 
            className={`${hoverColor} transition-colors duration-300`}
          >
            Contact
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2 font-medium">
          <Link 
            href="/" 
            className={`block px-3 py-2 rounded ${mobileHoverBg} ${hoverColor} transition-colors duration-300`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link 
            href="/about" 
            className={`block px-3 py-2 rounded ${mobileHoverBg} ${hoverColor} transition-colors duration-300`}
            onClick={() => setIsOpen(false)}
          >
            About Us
          </Link>
        </div>
      )}
    </nav>
  )
}
