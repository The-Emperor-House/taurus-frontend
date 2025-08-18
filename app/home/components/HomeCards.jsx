"use client";

import Carousel from "./home/carousel/Carousel";
import HeroText from "./home/hero/HeroText";

export default function HomeHero() {
  const files = ["01", "02", "03", "04", "05", "06", "07"];

  const slides = files.map((n, i) => ({
    id: i + 1,
    imageSrc: `/home/swiper/${n}.webp`,
    dim: { xs: 0.34, md: 0.28 },
    priority: i === 0,
    objectPosition: "center left",
    content: (
      <HeroText
        title="TAURUS:"
        subtitle="WE RENEW"
        tagline={'"สร้างบ้านหลังใหม่ ในที่อยู่อาศัยเดิมของคุณ"'}
        accent="primary.main"
        align="left"
      />
    ),
  }));

  return (
    <Carousel
      slides={slides}
      overlayPaddingLeft={{
        xs: "var(--brand-offset-xs)",
        sm: "var(--brand-offset-sm)",
        md: "var(--brand-offset-md)",
        lg: "var(--brand-offset-lg)",
      }}
      height={{ xs: "88vh", md: "100vh" }}
      delay={5000}
    />
  );
}
