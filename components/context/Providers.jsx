'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProviderWrapper } from '@/theme/ThemeContext';
import { ThemeProvider } from '@/theme';
import ModalProvider from "@/components/modals/ModalProvider";

// import ThemeToggleButton from '@/theme/ThemeToggleButton';

export function Providers({ children }) {
  return (
    <SessionProvider refetchInterval={0}>
      <ThemeProviderWrapper>
        <ThemeProvider>
          <ModalProvider>
            {children}
          </ModalProvider>
          {/* <ThemeToggleButton /> */}
        </ThemeProvider>
      </ThemeProviderWrapper>
    </SessionProvider>
  );
}