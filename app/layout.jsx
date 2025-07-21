import MainNavbar from "./components/navbar/MainNavbar";
import Footer from "./components/common/Footer";
import MuiThemeProviderWrapper from "./components/common/MuiThemeProviderWrapper";
import { Prompt, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./components/common/Providers";
import PageTransition from "./components/common/PageTransition";
import LayoutWrapper from "./components/common/LayoutWrapper";

export const metadata = {
  title: "TAURUS by emperor",
  description:
    "TAURUS - Renovate & Interior Design, specializing in contemporary and modern style with imported furniture. Transform your space with elegance and premium craftsmanship.",
  keywords: [
    "renovate",
    "interior design",
    "contemporary style",
    "modern style",
    "imported furniture",
    "luxury renovation",
    "premium design",
    "Taurus",
    "Emperor"
  ],
  icons: {
    icon: "/logo.ico",
  },
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const prompt = Prompt({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-prompt",
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${prompt.variable} scroll-smooth ${poppins.className}`}
    >
      <body>
        <MuiThemeProviderWrapper>
          <Providers>
            <MainNavbar />
            <LayoutWrapper>
            <PageTransition>{children}</PageTransition>
            </LayoutWrapper>
            <Footer />
          </Providers>
        </MuiThemeProviderWrapper>
      </body>
    </html>
  );
}
