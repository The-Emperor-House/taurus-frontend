'use client';

import { usePathname } from 'next/navigation';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <main className={isHome ? '' : 'pt-16'}>
      {children}
    </main>
  );
}
