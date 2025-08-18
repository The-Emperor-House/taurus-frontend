'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@/theme';
import ModalProvider from "@/components/modals/ModalProvider";

export function Providers({ children }) {
  return (
    <SessionProvider refetchInterval={0}>
      <ThemeProvider>
        <ModalProvider>{children}</ModalProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}