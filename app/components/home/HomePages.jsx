"use client";

import SwiperCarousel from "./SwiperCarousel";
import AnimatedHeading from "./AnimatedHeading";
import SlideContent from "./SlideContent";
import AboutUsSection from "../about/AboutUsSection";
import ProjectCards from "./ProjectCards";
import MapCards from "./MapCards";

export default function HomePage() {
  const carouselSlides = [1, 2, 3, 4, 5, 6, 7].map((num) => ({
    id: num,
    imageSrc: `/home/swiper/${String(num).padStart(2, '0')}.webp`,
    alt: `Slide ${num}`,
    content: <SlideContent num={num} />,
  }));

  return (
    <main className="flex flex-col">
      <section className="relative h-screen overflow-hidden">
        <SwiperCarousel slides={carouselSlides} />
      </section>

      <section>
        <AboutUsSection />
      </section>

      <section>
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 relative z-10">
          {/* หัวข้อ - ปรับขนาดฟอนต์สำหรับมือถือ */}
          <div className="text-center py-8">
            <AnimatedHeading
              title="PROJECTS"
              className="text-4xl md:text-5xl lg:text-6xl"
              subtitleClassName="text-2xl md:text-3xl lg:text-4xl"
              textColor="#cc8f2a"
              textShadow="2px 2px 4px rgba(0,0,0,0.7)"              
              textAlign="center"
            />
          </div>

          {/* โปรเจคทั้งหมด */}
          <div>
            <ProjectCards />
          </div>
        </div>
      </section>

      <section>
        <MapCards />
      </section>
    </main>
  );
}
