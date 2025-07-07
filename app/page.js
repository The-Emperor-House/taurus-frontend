"use client";

import Image from "next/image";
import SwiperCarousel from "./components/home/SwiperCarousel";
import AnimatedHeading from "./components/home/AnimatedHeading";
import Project from "./components/home/project";
import Map from "./components/home/map";

export default function Home() {
  const sharedContent = (
    <div>
      <h2 className="text-5xl font-extrabold drop-shadow-[2px_2px_4px_rgba(0,0,0,0.7)] text-[#cc8f2a]">
        TRANSFORM
      </h2>
      <h2 className="text-5xl font-light drop-shadow-[2px_2px_4px_rgba(0,0,0,0.7)] text-[#fdfdfd]">
        & DECORATE
      </h2>
      <h3 className="text-[#fdfdfd] drop-shadow-lg mt-4">
        &quot;เปลี่ยนบ้านหลังเก่าให้เป็นไปตามจินตนาการของคุณ&quot;
      </h3>
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
        {/* โลโก้ลายน้ำพื้นหลัง - ปรับขนาดสำหรับมือถือ */}
        <SwiperCarousel slides={carouselSlides} />
      </section>

      <section className="bg-[#404040] relative overflow-hidden">
        {/* โลโก้ลายน้ำพื้นหลัง - ปรับขนาดสำหรับมือถือ */}
        <div className="absolute inset-0 items-center justify-start opacity-5 md:opacity-10 pointer-events-none flex">
          <Image
            src="/home/transparent.webp"
            alt="Taurus Logo Watermark"
            width={300}
            height={300}
            className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 h-auto object-contain mx-auto"
            priority
          />
        </div>

        {/* เนื้อหาหลัก */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 relative z-10">
          {/* หัวข้อ - ปรับขนาดฟอนต์สำหรับมือถือ */}
          <div className="text-center py-8">
            <AnimatedHeading
              title="PROJECTS"
              textColor="text-white"
              lineColor="bg-white"
              mobileSize="text-3xl" // ขนาดเล็กลงบนมือถือ
            />
          </div>

          {/* โปรเจคทั้งหมด */}
          <div>
            <Project />
          </div>
        </div>
      </section>

      <section>
        <Map />
      </section>
    </main>
  );
}
