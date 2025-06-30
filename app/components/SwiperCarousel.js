'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Parallax, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import 'swiper/css/parallax'

export default function SwiperCarousel({ slides }) {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <Swiper
        modules={[Autoplay, Parallax, Pagination]}
        speed={800}
        parallax={true}
        spaceBetween={0} // ไม่มีช่องว่าง
        slidesPerView={1}
        autoplay={{ 
          delay: 4500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        pagination={{ clickable: true }} // ยังมีจุด Pagination ถ้าไม่เอาออกก็ลบตรงนี้ได้เลย
        className="h-full w-full"
      >
        {/* Parallax Background Layer */}
        <div 
          slot="container-start" 
          className="absolute top-0 left-0 w-full h-full z-0"
          data-swiper-parallax="-30%"
        >
          <div className="w-full h-full bg-gradient-to-tr from-black/80 via-transparent to-black/40" />
        </div>

        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative h-full w-full">
            <div 
              className="absolute inset-0 w-full h-full z-[-1] object-cover opacity-90"
              data-swiper-parallax="-20%"
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
