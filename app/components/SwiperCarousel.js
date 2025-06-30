'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Parallax } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/autoplay'
import 'swiper/css/parallax'

export default function SwiperCarousel({ slides }) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, Parallax]}
        effect="fade"
        speed={1000}
        parallax={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ 
          delay: 5000,
          disableOnInteraction: false 
        }}
        loop={true}
        className="h-full w-full"
      >
        {/* Parallax Background Layer */}
        <div 
          slot="container-start" 
          className="absolute top-0 left-0 w-full h-full z-0"
          data-swiper-parallax="-40%"
        >
          <div className="w-full h-full bg-gradient-to-tr from-black/50 via-transparent to-black/30" />
        </div>

        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative h-full w-full">
            <div 
              className="absolute inset-0 w-full h-full z-[-1] object-cover"
              data-swiper-parallax="-40%"
            >
              {slide.background}
            </div>

            {/* Content Layer */}
            <div className="absolute inset-0 flex items-center justify-start pl-6">
              {slide.content}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
