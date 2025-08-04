'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/autoplay';

// ==========================
// Swiper Carousel Component
// ==========================
export default function SwiperCarousel({ slides = [] }) {
  if (slides.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-black text-white">
        No slides available.
      </div>
    );
  }

  const contentTransition = {
    duration: 0.8,
    ease: [0.2, 0.65, 0.3, 0.9],
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop
        speed={800}
        spaceBetween={0}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className="w-full h-full"
      >
        {/* Background gradient overlay */}
        <div
          slot="container-start"
          className="absolute inset-0 z-0 bg-gradient-to-tr from-black/60 via-transparent to-black/20"
        />

        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            <BackgroundImage src={slide.imageSrc} alt={slide.alt || `Slide ${slide.id}`} />

            {/* Animated content overlay */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={contentTransition}
              className="absolute inset-0 flex items-center justify-start pl-8 md:pl-16 z-10"
            >
              {slide.content}
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

// ==========================
// Background Image Component
// ==========================
function BackgroundImage({ src, alt }) {
  const [loading, setLoading] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      className="absolute inset-0 w-full h-full z-0"
    >
      {/* Skeleton while image is loading */}
      {loading && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
      )}

      <Image
        src={src}
        alt={alt}
        fill
        priority
        onLoad={() => setLoading(false)}
        sizes="(max-width: 768px) 100vw, 50vw"
        className={`object-cover transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}
      />
    </motion.div>
  );
}
