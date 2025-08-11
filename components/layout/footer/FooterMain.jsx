import SocialIconButton from "@/components/layout/footer/components/SocialIconButton";
import TikTokHoverEmbed from "@/components/layout/footer/components/TikTokHoverEmbed";
import {
  FaMailBulk,
  FaLine,
  FaFacebookF
} from "react-icons/fa";

const FooterMain = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-semibold">Follow Us</h2>
            <div className="flex space-x-4 mt-2">
              <SocialIconButton
                href="https://www.facebook.com/yourpage"
                icon={<FaFacebookF />}
                label="Facebook"
              />
              <SocialIconButton
                href="https://www.line.me/yourpage"
                icon={<FaLine />}
                label="Line"
              />
              <SocialIconButton
                href="mailto:taurus@emperorhouse.com"
                icon={<FaMailBulk />}
                label="Email"
              />
              <TikTokHoverEmbed
                href="https://www.tiktok.com/@yourpage"
                label="TikTok"
              />
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm">
              © {new Date().getFullYear()} Taurus. All rights reserved.
            </p>
            <p className="text-sm mt-2">
              Made with ❤️ by Emperor House
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <h2 className="text-lg font-semibold">Contact Us</h2>
            <p className="text-sm mt-2">
              For inquiries, please email us at{" "}
              <a
                href="mailto:taurus@emperorhouse.com"
                className="text-blue-400 hover:underline"
              >
                taurus@emperorhouse.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterMain;