import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
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
    <html
      lang="en"
      className={`${prompt.variable} scroll-smooth ${prompt.className}`}
    >
      <body className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
        <Providers>
          <MuiThemeProviderWrapper>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </MuiThemeProviderWrapper>
        </Providers>
      </body>
    </html>
  );
}
