'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProviderWrapper } from '@/theme/ThemeContext';
import { ThemeProvider } from '@/theme';
import ModalProvider from "@/components/modals/ModalProvider";

export function Providers({ children }) {
  return (
    <SessionProvider refetchInterval={0}>
      <ThemeProviderWrapper>
        <ThemeProvider>
          <ModalProvider>
            {children}
          </ModalProvider>
        </ThemeProvider>
      </ThemeProviderWrapper>
    </SessionProvider>
  );
}