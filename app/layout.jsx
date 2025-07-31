import { Suspense } from 'react';
import { Poppins, Prompt } from 'next/font/google';
import './globals.css';

import { Box, CircularProgress, Typography } from '@mui/material';

import { Providers } from '@/components/providers';
import MainNavbar from '@/components/layout/MainNavbar';
import Footer from '@/components/layout/Footer';

// กำหนด fonts
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

const prompt = Prompt({
  subsets: ['latin', 'thai'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-prompt',
});

// กำหนด metadata สำหรับ SEO
export const metadata = {
  title: 'Taurus: WE RENEW',
  description: 'เปลี่ยนบ้านหลังเก่าให้เป็นไปตามจินตนาการของคุณ',
  icons: { icon: '/logo.ico' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="th" className={`${poppins.variable} ${prompt.variable}`}>
      <body>
        <Providers>
          <MainNavbar />
          <main className="min-h-screen">
            <Suspense
              fallback={
                <Box
                  sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: 2,
                  }}
                >
                  <CircularProgress size={60} />
                  <Typography variant="h5" color="text.secondary">
                    กำลังโหลด...
                  </Typography>
                </Box>
              }
            >
              {children}
            </Suspense>
          </main>
          
          <Footer />
        </Providers>
      </body>
    </html>
  );
}