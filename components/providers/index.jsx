'use client'; //

import { SessionProvider } from 'next-auth/react';
import MuiThemeProvider from './MuiThemeProvider';
import { ModalProvider } from '@/components/modals/ModalProvider';

export function Providers({ children }) {
  return (
    <SessionProvider refetchInterval={0}>
      <MuiThemeProvider>
        <ModalProvider>{children}</ModalProvider>
      </MuiThemeProvider>
    </SessionProvider>
  );
}