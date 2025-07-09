'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

export default function SwiperCarousel({ slides }) {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <Swiper
        modules={[Autoplay, Pagination]}
        speed={800}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ 
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        pagination={{ clickable: true }}
        className="h-full w-full"
      >
        <div 
          slot="container-start" 
          className="absolute top-0 left-0 w-full h-full z-0"
        >
          <div className="w-full h-full bg-gradient-to-tr from-black/80 via-transparent to-black/40" />
        </div>

        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative h-full w-full">
            <div 
              className="absolute inset-0 w-full h-full z-[-1] object-cover opacity-90"
            >
              {slide.background}
            </div>

            {/* Content Layer */}
            <div className="absolute inset-0 flex items-center justify-start pl-8 md:pl-16 transition-opacity duration-700 ease-in-out">
              {slide.content}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
