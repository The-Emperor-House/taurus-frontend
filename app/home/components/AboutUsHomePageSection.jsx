'use client';

import React from 'react';
import SectionWrapper from './SectionWrapper';
import AboutUsSection from '@/app/about-us/components/AboutUsSection';

export default function AboutUsHomePageSection() {
  return (
    <SectionWrapper noPadding={true} className="py-16">
      <AboutUsSection />
    </SectionWrapper>
  );
}