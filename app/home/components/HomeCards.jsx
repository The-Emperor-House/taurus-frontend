"use client";

import Carousel from "./home/carousel/Carousel";
import HeroText from "./home/hero/HeroText";

export default function HomeHero() {
  const files = ["01", "02", "03", "04", "05", "06", "07"];

  const slides = files.map((n, i) => ({
    id: i + 1,
    imageSrc: `/home/swiper/${n}.webp`,
    dim: { xs: 0.34, md: 0.28, lg: 0.24 }, 
    gradient: false,                
    priority: i === 0,
    content: (
      <HeroText/>
    ),
  }));

  return (
    <Carousel
      slides={slides}
      height={{ xs: "88vh", md: "100vh" }}
      delay={5000}
    />
  );
}
