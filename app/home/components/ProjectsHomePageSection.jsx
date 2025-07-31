'use client';

import React from 'react';
import SectionWrapper from './SectionWrapper';
import AnimatedHeading from './AnimatedHeading';
import ProjectCards from './ProjectCards';

export default function ProjectsHomePageSection() {
  return (
    <SectionWrapper noPadding={true} className="py-16">
      <div className="text-center mb-8">
        <AnimatedHeading
          title="PROJECTS"
          textColor="#cc8f2a"
        />
      </div>
      <ProjectCards />
    </SectionWrapper>
  );
}