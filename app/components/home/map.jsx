'use client';

import Image from 'next/image';

const Map = () => {
  return (
    <div className="flex flex-col md:flex-row h-full">
        {/* Left Side: Team Image - แสดงบน Mobile และ Desktop */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-screen p-0 order-1 md:order-none">
        <div className="relative w-full h-full">
            <Image 
            src="/home/team/104096.webp"
            alt="Taurus Team"
            width={800}
            height={800}
            priority
            className="w-full h-full object-cover object-center md:object-[center_30%] rounded-none shadow-none"
            />
        </div>
        </div>

        {/* Right Side: Google Map - แสดงบน Mobile และ Desktop */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-screen p-0 order-2 md:order-none">
        <iframe
            title="Emperor House Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242.07300574276522!2d100.6055748477894!3d13.888895372048676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e282bda8af42d7%3A0xcf30461c6ca7347e!2z4LiU4Li0IOC5gOC4reC5h-C4oeC5gOC4nuC4reC5gOC4o-C5iOC4reC4o-C5jCDguYDguK7guYnguLLguKrguYwgVGhlIEVtcGVyb3IgSG91c2UgQ28uLEx0ZA!5e0!3m2!1sth!2sth!4v1751340363165!5m2!1sth!2sth"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full border-0"
        />
        <noscript>
          <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
            โปรดเปิด JavaScript เพื่อดูแผนที่
          </p>
        </noscript>
        </div>
    </div>
  );
};

export default Map;