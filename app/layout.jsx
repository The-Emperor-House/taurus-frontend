import MainNavbar from "./components/navbar/MainNavbar";
import Footer from "./components/common/Footer";
import MuiThemeProviderWrapper from "./components/common/MuiThemeProviderWrapper";
import { Prompt, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import PageTransition from "./components/common/PageTransition";

export const metadata = {
  title: "TAURUS",
  description: "by emperor",
  icons: {
    icon: "/logo.webp",
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
            <PageTransition>{children}</PageTransition>
            <Footer />
          </Providers>
        </MuiThemeProviderWrapper>
      </body>
    </html>
  );
}
