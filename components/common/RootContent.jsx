"use client";

import { usePathname } from "next/navigation";
import MainNavbar from "@/components/layout/MainNavbar";
import Footer from "@/components/layout/Footer";

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
