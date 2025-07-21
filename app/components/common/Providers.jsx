'use client';

import { SessionProvider } from 'next-auth/react';
import { ModalProvider } from '../modals/ModalProvider';

export function Providers({ children }) {
  return (
    <SessionProvider refetchInterval={0}>
      <ModalProvider>{children}</ModalProvider>
    </SessionProvider>
  );
}
