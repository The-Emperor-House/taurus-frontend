'use client';

import { SessionProvider } from 'next-auth/react';
import { ModalProvider } from '../modals/ModalProvider';

export function Providers({ children }) {
  return (
    <SessionProvider>
      <ModalProvider>
        {children}
      </ModalProvider>
    </SessionProvider>
  );
}
