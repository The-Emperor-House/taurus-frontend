'use client';

import React from 'react';
import SectionWrapper from './SectionWrapper';
import AnimatedHeading from './AnimatedHeading';
import ProjectCards from './ProjectCards';

export default function ProjectsHomePageSection() {
  return (
    <SectionWrapper noPadding={true} className="py-35 bg-[#404040]">
      <div className="text-center mb-8">
        <AnimatedHeading/>
      </div>
      <ProjectCards />
    </SectionWrapper>
  );
}