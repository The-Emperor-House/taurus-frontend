'use client';

import { usePathname } from 'next/navigation';
import MainNavbar from '../navbar/MainNavbar';
import Footer from '../common/Footer';
import LayoutWrapper from '../common/LayoutWrapper';

export default function RootContent({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard');

  return (
    <>
      {!isDashboard && <MainNavbar />}
      <LayoutWrapper>{children}</LayoutWrapper>
      {!isDashboard && <Footer />}
    </>
  );
}
