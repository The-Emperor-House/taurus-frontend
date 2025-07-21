"use client";

import { usePathname } from "next/navigation";
import MainNavbar from "../navbar/MainNavbar";
import Footer from "../common/Footer";

export default function RootContent({ children }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      <MainNavbar />
      <main className={isHome ? "" : "pt-16"}>{children}</main>
      <Footer />
    </>
  );
}
