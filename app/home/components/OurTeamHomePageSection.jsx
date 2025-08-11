'use client';

import React from 'react';
import SectionWrapper from './SectionWrapper';
import MapCards from './MapCards';

export default function OurTeamHomePageSection() {
  return (
    <SectionWrapper noPadding={true}>
      <MapCards />
    </SectionWrapper>
  );
}