'use client';

import React from 'react';
import { Typography, Box } from '@mui/material';
import SectionWrapper from './SectionWrapper';
import AboutUsSection from '@/app/about-us/components/AboutUsSection';

export default function AboutUsHomePageSection() {
  return (
    <SectionWrapper noPadding={true} className="py-24">
      {/* แถวเดียว ซ้าย-ขวา (mobile = กลาง/เรียงลง) */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: { xs: 'center', md: 'space-between' },
          alignItems: { xs: 'center', md: 'center' },
          gap: { xs: 1.5, md: 0 },
          mb: 4,
          px: { xs: 2, md: 14 },
        }}
      >
        {/* ABOUT US */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 100,
            letterSpacing: '0.4rem',
            color: '#000',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          ABOUT US
        </Typography>

        {/* RECRAFTING ... */}
        <Typography
          variant="body1"
          sx={{
            fontWeight: 800,
            color: '#cc8f2a',
            letterSpacing: '0.25rem',
            textAlign: { xs: 'center', md: 'right' },
            fontSize: { xs: '1.5rem', sm: '1.1rem', md: '1.2rem', lg: '1.6rem' },
            lineHeight: 1.2,
            pr: { xs: 0, md: 14 },
          }}
        >
          RECRAFTING SPACES. REVIVING LIVING.
        </Typography>
      </Box>

      <AboutUsSection />
    </SectionWrapper>
  );
}
