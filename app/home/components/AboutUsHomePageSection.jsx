'use client';

import React from 'react';
import { Typography, Box } from '@mui/material';
import SectionWrapper from './SectionWrapper';
import AboutUsSection from '@/app/about-us/components/AboutUsSection';

export default function AboutUsHomePageSection() {
  return (
    <SectionWrapper noPadding={true} className="py-24">

      {/* แถวเดียว ซ้าย-ขวา */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap', // กันข้อความล้นจอเล็ก
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
            textAlign: 'right',
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.2rem' },
            pr: { xs: 2, md: 14 }
          }}
        >
          RECRAFTING SPACES. REVIVING LIVING.
        </Typography>
      </Box>

      <AboutUsSection />
    </SectionWrapper>
  );
}
