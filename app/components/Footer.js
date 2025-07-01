import Image from 'next/image';
import { FaMapMarkerAlt, FaMailBulk, FaPhone, FaTiktok, FaLine, FaFacebookF  } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#404040] text-white py-8">
      <div className="container mx-auto px-4">

        {/* columns */}
        <div className="flex flex-col md:flex-row justify-between items-center">

          <div className="mb-6 md:mb-0">
            <Image
              src="/navbar/logo webp/taurusWhite.webp"
              alt="Taurus Logo"
              width={128}
              height={0}
              className="w-32 h-auto"
              priority={false}
            />
          </div>

          <div className="mb-6 md:mb-0">
            <h2 className="text-lg font-semibold mb-2">Head Office:</h2>
            <div className="flex items-start gap-2 mb-1">
              <FaMapMarkerAlt/>
              <div>
                <p>288/18 Phaholyothin Rd,</p>
                <p>Anusawaree ,Bangkhen ,Bankok 10220</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <FaPhone/>
              <p>(66) 2 970 3080 - 3  /  (66) 61 0596111</p>
            </div>
          </div>

          <div className="mb-6 md:mb-0">
            <h2 className="text-lg font-semibold mb-2">Showroom:</h2>
            <div className="flex items-start gap-2 mb-1">
              <FaMapMarkerAlt/>
              <div>
                <p>189/9-10 Ratchada-Ramintra Rd,</p>
                <p>Nauanchan, Buengkum, Bankok 10240</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3">

              <FaLine/>
              <FaPhone/>
              <FaMailBulk/>
              <p>ติดตามผลงานเพิ่มเติมของเราได้ที่</p>
              <FaFacebookF/>
              <FaTiktok/>
              <p>Taurus by Emperor</p>
            </div>
          </div>

        </div>

        {/* Footer Links */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;