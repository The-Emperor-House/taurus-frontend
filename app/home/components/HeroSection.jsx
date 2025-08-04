'use client';

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
    <section className="relative h-screen overflow-hidden">
      <SwiperCarousel slides={carouselSlides} />
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <SlideContent />
      </div>
    </section>
  );
}
