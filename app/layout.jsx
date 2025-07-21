import { Suspense } from 'react';
import MuiThemeProviderWrapper from './components/common/MuiThemeProviderWrapper';
import { Providers } from './components/common/Providers';
import RootContent from './components/common/RootContent';
import { Prompt, Poppins } from 'next/font/google';
import './globals.css';
import { CircularProgress, Typography, Box } from '@mui/material';

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

export default function RootLayout({ children }) {
  return (
    <html lang="th" className={`${poppins.variable} ${prompt.variable}`}>
      <body>
        <MuiThemeProviderWrapper>
          <Providers>
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
                  <CircularProgress />
                  <Typography variant="h6" color="text.secondary">
                    กำลังโหลดหน้า...
                  </Typography>
                </Box>
              }
            >
              <RootContent>{children}</RootContent>
            </Suspense>
          </Providers>
        </MuiThemeProviderWrapper>
      </body>
    </html>
  );
}