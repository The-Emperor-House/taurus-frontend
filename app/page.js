'use client';

import Image from 'next/image';
import SwiperCarousel from './components/SwiperCarousel';
import AnimatedHeading from './components/home/AnimatedHeading';
import Project from './components/home/project';
import Map from './components/home/map';

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
        src={`/home/swiper/${String(num).padStart(2,'0')}.webp`}
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
      <section className="h-[calc(100vh-80px)] overflow-hidden">
        <SwiperCarousel slides={carouselSlides} />
      </section>

      <section className="bg-[#404040] py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <AnimatedHeading title="PROJECTS" />
          </div>
          <Project />
        </div>
      </section>

      <section className="bg-white py-0">
        <Map />
      </section>
    </main>
  );
}