'use client';

import MainNavbar from '../navbar/MainNavbar';
import Footer from '../common/Footer';

export default function RootContent({ children }) {
  return (
    <>
      <MainNavbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
