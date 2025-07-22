"use client";

import Image from "next/image";
import SwiperCarousel from "./SwiperCarousel";
import AnimatedHeading from "./AnimatedHeading";
import { Typography } from "@mui/material";
import AboutUs from "./AboutUs";
import ProjectCards from "./ProjectCards";
import MapCards from "./MapCards";

export default function HomePage() {
  const sharedContent = (
    <div>
      <Typography
        variant="h1"
        sx={{
          fontWeight: "semi-bold",
          fontSize: "3rem", // Adjusted for better readability on mobile
          textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
          color: "#cc8f2a",
        }}
      >
        TAURUS:
      </Typography>

      <Typography
        variant="h2"
        sx={{
          fontWeight: "semi-bold",
          fontSize: "2.5rem", // Adjusted for better readability on mobile
          textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
          color: "#fdfdfd",
        }}
      >
        WE RENEW
      </Typography>

      <Typography
        variant="h3"
        sx={{
          fontWeight: "semi-bold",
          fontSize: "1.5rem", // Adjusted for better readability on mobile
          color: "#fdfdfd",
          textShadow: "0 4px 6px rgba(0,0,0,0.5)", // drop-shadow-lg
          mt: 2, // mt-4 ≈ theme.spacing(2)
        }}
      >
        &quot;สร้างบ้านหลังใหม่ ในที่อยู่อาศัยเดิมของคุณ&quot;
      </Typography>
    </div>
  );

  const carouselSlides = [1, 2, 3, 4, 5, 6, 7].map((num) => ({
    id: num,
    background: (
      <Image
        src={`/home/swiper/${String(num).padStart(2, "0")}.webp`}
        className="w-full h-full object-cover"
        alt={`slide ${num}`}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={num === 1}
      />
    ),
    content: sharedContent,
  }));

  return (
    <main className="flex flex-col">
      <section className="relative h-screen overflow-hidden">
        <SwiperCarousel slides={carouselSlides} />
      </section>

      <section>
          <AboutUs />
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
