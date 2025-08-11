'use client';

import React from 'react';
import SectionWrapper from './SectionWrapper';
import AboutUsSection from '@/app/about-us/components/AboutUsSection';

export default function AboutUsHomePageSection() {
  return (
    <SectionWrapper noPadding={false} className="py-24">
      <div className="mb-12" style={{ textAlign: 'right' }}>
        <p
          className="text-lg md:text-xl"
          style={{
            fontWeight: 800,
            color: '#cc8f2a',            // สีส้ม
            letterSpacing: '0.25rem',    // กระจายตัวอักษร
            marginLeft: '40px'           // ขยับไปทางขวา
          }}
        >
          RECRAFTING SPACES. REVIVING LIVING.
        </p>
      </div>
      <AboutUsSection />
    </SectionWrapper>
  );
}
