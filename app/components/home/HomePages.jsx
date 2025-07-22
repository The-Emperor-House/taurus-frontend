"use client";

import SwiperCarousel from "./SwiperCarousel";
import SlideContent from "./SlideContent";
import AnimatedHeading from "./AnimatedHeading";
import AboutUsSection from "../about/AboutUsSection";
import ProjectCards from "./ProjectCards";
import MapCards from "./MapCards";
import SectionWrapper from "./SectionWrapper";

export default function HomePage() {
  const carouselSlides = [1, 2, 3, 4, 5, 6, 7].map((num) => ({
    id: num,
    imageSrc: `/home/swiper/${String(num).padStart(2, "0")}.webp`,
    alt: `Slide ${num}`,
    content: <SlideContent num={num} />,
  }));

  return (
    <main className="flex flex-col">
      {/* HERO */}
      <section className="relative h-screen overflow-hidden">
        <SwiperCarousel slides={carouselSlides} />
      </section>

      {/* ABOUT US */}
      <SectionWrapper>
        <AboutUsSection />
      </SectionWrapper>

      {/* PROJECTS - HEADER ONLY */}
      <SectionWrapper>
        <div className="text-center mb-8">
          <AnimatedHeading
            title="PROJECTS"
            className="text-4xl md:text-5xl lg:text-6xl"
            subtitleClassName="text-2xl md:text-3xl lg:text-4xl"
            textColor="#cc8f2a"
            textShadow="2px 2px 4px rgba(0,0,0,0.7)"
          />
        </div>
      </SectionWrapper>

      {/* PROJECTS - FULL WIDTH */}
      <section>
        <ProjectCards />
      </section>

      {/* TEAM - HEADER ONLY */}
      <SectionWrapper>
        <div className="text-center mb-8">
          <AnimatedHeading
            title="OUR TEAM"
            className="text-4xl md:text-5xl lg:text-6xl"
            subtitleClassName="text-2xl md:text-3xl lg:text-4xl"
            textColor="#cc8f2a"
            textShadow="2px 2px 4px rgba(0,0,0,0.7)"
          />
        </div>
      </SectionWrapper>

      {/* MAP + TEAM */}
      <section>
        <MapCards />
      </section>
    </main>
  );
}
