'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaMailBulk, FaPhone, FaTiktok, FaLine, FaFacebookF } from 'react-icons/fa';
import { useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const iconHover = {
  whileHover: { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] },
  whileTap: { scale: 0.9 },
};

export default function Footer() {
  const [showTikTokEmbed, setShowTikTokEmbed] = useState(false);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  useEffect(() => {
    if (showTikTokEmbed && !document.querySelector('script[src*="tiktok.com/embed.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://www.tiktok.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [showTikTokEmbed]);

  const logoSrc = isDarkMode
    ? '/navbar/logo webp/taurusWhite.webp'
    : '/navbar/logo webp/taurusDark.webp';

  const textColor = isDarkMode ? 'text-gray-300' : 'text-gray-700';
  const headingColor = isDarkMode ? 'text-white' : 'text-gray-900';

  const hoverColors = {
    facebook: isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600',
    tiktok: isDarkMode ? 'hover:text-pink-400' : 'hover:text-pink-500',
    line: isDarkMode ? 'hover:text-green-400' : 'hover:text-green-500',
    mail: isDarkMode ? 'hover:text-yellow-400' : 'hover:text-yellow-500',
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      variants={containerVariants}
      className={`relative py-12 ${
        isDarkMode
          ? 'bg-gradient-to-tr from-black via-gray-900 to-gray-800'
          : 'bg-gradient-to-tr from-gray-100 via-gray-200 to-gray-300'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo + Social */}
          <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start">
            <Image
              src={logoSrc}
              alt="Logo"
              width={120}
              height={0}
              className="w-40 h-auto mb-4"
              priority
            />
            <div className="flex space-x-4">
              <motion.a
                href="https://line.me/ti/p/YOUR_LINE_ID"
                target="_blank"
                rel="noopener noreferrer"
                {...iconHover}
                className={`${hoverColors.line} transition-colors text-2xl`}
                title="LINE"
              >
                <FaLine />
              </motion.a>
              <motion.a
                href="mailto:contact@taurus.com"
                {...iconHover}
                className={`${hoverColors.mail} transition-colors text-2xl`}
                title="Email"
              >
                <FaMailBulk />
              </motion.a>
            </div>
          </motion.div>

          {/* Head Office */}
          <motion.address variants={itemVariants} className={`not-italic text-sm ${textColor}`}>
            <h2 className={`text-lg font-semibold mb-4 ${headingColor}`}>Head Office :</h2>
            <div className="flex items-start gap-3 mb-3">
              <FaMapMarkerAlt className="text-[#cc8f2a] mt-1" />
              <div>
                <p>288/18 Phaholyothin Rd,</p>
                <p>Anusawaree, Bangkhen, Bangkok 10220</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FaPhone className="text-[#cc8f2a]" />
              <p>(66) 2 970 3080 - 3 / (66) 61 0596111</p>
            </div>
          </motion.address>

          {/* Showroom + TikTok + Facebook */}
          <motion.address variants={itemVariants} className={`not-italic text-sm ${textColor}`}>
            <h2 className={`text-lg font-semibold mb-4 ${headingColor}`}>Showroom :</h2>
            <div className="flex items-start gap-3 mb-3">
              <FaMapMarkerAlt className="text-[#cc8f2a] mt-1" />
              <div>
                <p>189/9-10 Ratchada-Ramintra Rd,</p>
                <p>Nuanchan, Buengkum, Bangkok 10240</p>
              </div>
            </div>

            <div className="mt-6 flex items-center space-x-4">
              <p className="text-sm">ติดตามเรา</p>

              <motion.a
                href="https://facebook.com/TaurusByEmperor"
                target="_blank"
                rel="noopener noreferrer"
                {...iconHover}
                className={`${hoverColors.facebook} transition-colors text-xl`}
                title="Facebook"
              >
                <FaFacebookF />
              </motion.a>

              <div
                className="relative"
                onMouseEnter={() => setShowTikTokEmbed(true)}
                onMouseLeave={() => setShowTikTokEmbed(false)}
              >
                <motion.a
                  href="https://www.tiktok.com/@taurus.by.emperor"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...iconHover}
                  className={`${hoverColors.tiktok} transition-colors text-xl`}
                  title="TikTok"
                >
                  <FaTiktok />
                </motion.a>

                <AnimatePresence>
                  {showTikTokEmbed && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 z-50 w-64"
                    >
                      <div
                        className={`p-2 rounded-lg shadow-lg ${
                          isDarkMode ? 'bg-gray-800' : 'bg-white'
                        }`}
                      >
                        <blockquote
                          className="tiktok-embed"
                          cite="https://www.tiktok.com/@taurus.by.emperor"
                          data-unique-id="taurus.by.emperor"
                          data-embed-type="creator"
                          style={{ width: '100%' }}
                        >
                          <section>
                            <a
                              target="_blank"
                              href="https://www.tiktok.com/@taurus.by.emperor?refer=creator_embed"
                              rel="noopener noreferrer"
                              className={`text-sm ${
                                isDarkMode ? 'text-blue-300' : 'text-blue-600'
                              }`}
                            >
                              @taurus.by.emperor
                            </a>
                          </section>
                        </blockquote>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <p className="mt-2 text-[#cc8f2a] font-medium">Taurus by Emperor</p>
          </motion.address>
        </div>

        <motion.div
          variants={itemVariants}
          className="border-t border-gray-600 mt-12 pt-6 text-center text-xs"
        >
          <p className={textColor}>
            &copy; {new Date().getFullYear()} Taurus by Emperor. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
