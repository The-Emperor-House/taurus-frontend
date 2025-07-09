'use client';

import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function AnimatedHeading({ 
  title = "PROJECTS",
  textColor = "text-white",
  lineColor = "bg-[#cc8f2a]",
  mobileSize = "text-3xl",
  desktopSize = "text-4xl"
}) {
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { margin: "-10%", amount: 0.3 });

  return (
    <h2 
      ref={headingRef}
      className={`${mobileSize} ${desktopSize} text-2xl font-light tracking-widest px-4 md:px-6 inline-flex items-center gap-2 md:gap-4 relative ${textColor}`}
    >
      {/* เส้นซ้าย - ปรับขนาดสำหรับมือถือ */}
      <span 
        className={`block h-[1.5px] md:h-[2px] ${lineColor} transition-all duration-500 md:duration-700 ease-out ${
          isHeadingInView ? 'w-12 md:w-24 opacity-100' : 'w-0 opacity-0 -translate-x-2 md:-translate-x-4'
        }`}
      ></span>
      
      {/* ข้อความ */}
      <span 
        className={`transition-all duration-300 md:duration-500 ${
          isHeadingInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 md:translate-y-2'
        }`}
      >
        {title}
      </span>
      
      {/* เส้นขวา - ปรับขนาดสำหรับมือถือ */}
      <span 
        className={`block h-[1.5px] md:h-[2px] ${lineColor} transition-all duration-500 md:duration-700 ease-out ${
          isHeadingInView ? 'w-12 md:w-24 opacity-100' : 'w-0 opacity-0 translate-x-2 md:translate-x-4'
        }`}
      ></span>
    </h2>
  );
}