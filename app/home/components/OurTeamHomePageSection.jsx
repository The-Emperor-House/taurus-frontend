'use client';

import React from 'react';
import SectionWrapper from './SectionWrapper';
import AnimatedHeading from './AnimatedHeading';
import MapCards from './MapCards';

export default function OurTeamHomePageSection() {
  return (
    <SectionWrapper noPadding={true} className="py-16">
      <div className="text-center mb-8">
        <AnimatedHeading
          title="OUR TEAM"
          textColor="#cc8f2a"
        />
      </div>
      <MapCards />
    </SectionWrapper>
  );
}