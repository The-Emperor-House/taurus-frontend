import MainNavbar from "./components/navbar/MainNavbar";
import Footer from "./components/common/Footer";
import MuiThemeProviderWrapper from "./components/MuiThemeProviderWrapper";
import { Prompt } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "TAURUS",
  description: "by emperor",
  icons: {
    icon: "/logo.webp",
  },
};

const prompt = Prompt({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-prompt",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${prompt.variable} scroll-smooth ${prompt.className}`}>
      <body>
        <Providers>
          <MuiThemeProviderWrapper>
            <MainNavbar />
            <main>{children}</main>
            <Footer />
          </MuiThemeProviderWrapper>
        </Providers>
      </body>
    </html>
  );
}
