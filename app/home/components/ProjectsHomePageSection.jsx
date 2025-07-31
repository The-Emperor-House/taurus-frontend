'use client';

import React from 'react';
import SectionWrapper from './SectionWrapper';
import AnimatedHeading from './AnimatedHeading';
import ProjectCards from './ProjectCards';

export default function ProjectsHomePageSection() {
  return (
    <>
      <SectionWrapper>
        <div className="text-center mb-8">
          <AnimatedHeading
            title="PROJECTS"
            // สามารถตัด className/subtitleClassName/textColor/textShadow ออกจาก props ได้
            // และใส่ใน AnimatedHeading โดยตรงถ้าค่าเหล่านี้เป็นค่า Default
            className="text-4xl md:text-5xl lg:text-6xl"
            // subtitleClassName="text-2xl md:text-3xl lg:text-4xl" // คุณไม่ได้ใช้ subtitle ใน AnimatedHeading.jsx
            textColor="#cc8f2a"
            // textShadow="2px 2px 4px rgba(0,0,0,0.7)" // คุณไม่ได้ใช้ textShadow ใน AnimatedHeading.jsx
          />
        </div>
      </SectionWrapper>
      {/* PROJECTS - FULL WIDTH: ให้ ProjectCards จัดการความกว้างของตัวเอง */}
      <section>
        <ProjectCards />
      </section>
    </>
  );
}