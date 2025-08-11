'use client';

import SectionWrapper from './SectionWrapper';
import SwiperCarousel from "./SwiperCarousel";
import SlideContent from "./SlideContent";
import React from 'react';

export default function HeroSection() {
  const carouselSlides = [1, 2, 3, 4, 5, 6, 7].map((num) => ({
    id: num,
    imageSrc: `/home/swiper/${String(num).padStart(2, "0")}.webp`,
    alt: `Slide ${num}`,
  }));

  return (
    <SectionWrapper noPadding={true}>
      <div className="relative">
        <SwiperCarousel slides={carouselSlides} />

        {/* Overlay สีดำโปร่ง */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        {/* เนื้อหาสไลด์ */}
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
          <SlideContent />
        </div>
      </div>
    </SectionWrapper>
  );
}
