'use client';
import Image from 'next/image';
import { FaMapMarkerAlt, FaMailBulk, FaPhone, FaTiktok, FaLine, FaFacebookF } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const Footer = () => {
  const [showTikTokEmbed, setShowTikTokEmbed] = useState(false);

  // โหลด TikTok script เมื่อ hover ครั้งแรก
  useEffect(() => {
    if (showTikTokEmbed) {
      const script = document.createElement('script');
      script.src = 'https://www.tiktok.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [showTikTokEmbed]);

  return (
    <footer className="bg-[#404040] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Logo Column */}
          <div className="flex flex-col items-center md:items-start">
            <Image
              src="/navbar/logo webp/taurusWhite.webp"
              alt="Taurus Logo"
              width={160}
              height={0}
              className="w-40 h-auto mb-4"
            />
            <div className="flex space-x-4">
              <a 
                href="https://line.me/ti/p/YOUR_LINE_ID"
                target="_blank" 
                rel="noopener noreferrer"
                title="เพิ่มเพื่อนทาง LINE"
                className="text-[#00B900] hover:text-[#00D900] transition-colors text-2xl"
              >
                <FaLine />
              </a>
              <a 
                href="mailto:contact@taurus.com" 
                title="ส่งอีเมลหาเรา"
                className="text-gray-300 hover:text-[#cc8f2a] transition-colors text-2xl"
              >
                <FaMailBulk />
              </a>
            </div>
          </div>

          {/* Head Office Column */}
          <address className="not-italic text-gray-300">
            <h2 className="text-lg font-semibold mb-4 text-white">Head Office :</h2>
            <div className="flex items-start gap-3 mb-3">
              <FaMapMarkerAlt className="text-[#cc8f2a] mt-1 flex-shrink-0" />
              <div>
                <p>288/18 Phaholyothin Rd,</p>
                <p>Anusawaree, Bangkhen, Bangkok 10220</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FaPhone className="text-[#cc8f2a] flex-shrink-0" />
              <p>(66) 2 970 3080 - 3 / (66) 61 0596111</p>
            </div>
          </address>

          {/* Showroom Column */}
          <address className="not-italic text-gray-300">
            <h2 className="text-lg font-semibold mb-4 text-white">Showroom :</h2>
            <div className="flex items-start gap-3 mb-3">
              <FaMapMarkerAlt className="text-[#cc8f2a] mt-1 flex-shrink-0" />
              <div>
                <p>189/9-10 Ratchada-Ramintra Rd,</p>
                <p>Nuanchan, Buengkum, Bangkok 10240</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center space-x-4 relative">
                <p className="text-sm">ติดตามผลงานเพิ่มเติมของเราได้ที่</p>
                
                {/* Facebook Icon */}
                <a 
                  href="https://facebook.com/TaurusByEmperor" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="Facebook Page"
                  className="text-gray-300 hover:text-[#1877F2] transition-colors text-xl"
                >
                  <FaFacebookF />
                </a>

                {/* TikTok Icon with hover popup */}
                <div 
                  className="relative inline-block"
                  onMouseEnter={() => setShowTikTokEmbed(true)}
                  onMouseLeave={() => setShowTikTokEmbed(false)}
                >
                  <a
                    href="https://www.tiktok.com/@taurus.by.emperor"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="TikTok Page"
                    className="text-gray-300 hover:text-[#FE2C55] transition-colors text-xl"
                  >
                    <FaTiktok />
                  </a>

                  {/* TikTok Embed Popup */}
                  {showTikTokEmbed && (
                    <div 
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 z-50 w-[300px] sm:w-[400px]"
                    >
                      <div className="bg-white p-1 rounded-lg shadow-2xl">
                        <blockquote 
                          className="tiktok-embed"
                          cite="https://www.tiktok.com/@taurus.by.emperor"
                          data-unique-id="taurus.by.emperor"
                          data-embed-type="creator"
                          style={{ maxWidth: '780px', minWidth: '288px', width: '100%' }}
                        >
                          <section>
                            <a
                              target="_blank"
                              href="https://www.tiktok.com/@taurus.by.emperor?refer=creator_embed"
                              rel="noopener noreferrer"
                            >
                              @taurus.by.emperor
                            </a>
                          </section>
                        </blockquote>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <p className="mt-2 text-[#cc8f2a] font-medium">Taurus by Emperor</p>
            </div>
          </address>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Taurus by Emperor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
