'use client';

import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function AnimatedHeading ({ title }) {
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { margin: "-20%", amount: 0.5 });

  return (
    <h2 
      ref={headingRef}
      className="text-4xl font-bold px-6 inline-flex items-center gap-4 relative"
    >
      {/* เส้นสีทองด้านซ้าย */}
      <span 
        className={`block h-0.5 bg-[#cc8f2a] transition-all duration-700 ease-out ${isHeadingInView ? 'w-16 opacity-100' : 'w-0 opacity-0 -translate-x-2'}`}
      ></span>
      
      {/* ข้อความ */}
      <span 
        className={`transition-all duration-500 ${isHeadingInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
      >
        {title}
      </span>
      
      {/* เส้นสีทองด้านขวา */}
      <span 
        className={`block h-0.5 bg-[#cc8f2a] transition-all duration-700 ease-out ${isHeadingInView ? 'w-16 opacity-100' : 'w-0 opacity-0 translate-x-2'}`}
      ></span>
    </h2>
  );
}