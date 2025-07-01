"use client";

import Image from "next/image";
import SwiperCarousel from "./components/SwiperCarousel";
import AnimatedHeading from "./components/home/AnimatedHeading";
import Project from "./components/home/project";
import Map from "./components/home/map";

export default function Home() {
  const sharedContent = (
    <div>
      <h2 className="text-5xl font-extrabold drop-shadow-[2px_2px_4px_rgba(0,0,0,0.7)] text-[#cc8f2a]">
        TRANFORM
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
      <section className="relative w-full h-[80vh] min-h-[400px] max-h-[1000px] md:h-screen md:min-h-[600px] overflow-hidden bg-black">
        <SwiperCarousel slides={carouselSlides} />
      </section>

      <section className="bg-[#404040] relative overflow-hidden">
        {/* โลโก้ลายน้ำพื้นหลัง - ปรับขนาดสำหรับมือถือ */}
        {/* <div className="absolute inset-0 items-center justify-start opacity-5 md:opacity-10 pointer-events-none flex">
          <Image
            src="/home/transparent.webp"
            alt="Taurus Logo Watermark"
            width={600} // ขนาดเล็กลงสำหรับมือถือ
            height={600}
            className="object-contain w-[300px] md:w-full" // กำหนดความกว้างขั้นต่ำ
            priority
          />
        </div> */}

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
          <div className="px-2 md:px-0">
            {" "}
            {/* เพิ่ม padding ข้างในสำหรับมือถือ */}
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
