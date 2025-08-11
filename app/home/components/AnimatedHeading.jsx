"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

export default function AnimatedHeading({
  title = "PROJECT",
  subtitle = "RECRAFTING SPACES. REVIVING LIVING.",
  textColor = "text-white",
  mobileSize = "text-3xl",
  desktopSize = "text-4xl",
}) {
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, {
    margin: "-10%",
    amount: 0.3,
  });

  return (
    <div ref={headingRef} className="flex flex-col items-center">
      {/* หัวข้อหลัก */}
      <h2
        className={`${mobileSize} ${desktopSize} font-light tracking-widest px-4 md:px-6 inline-flex items-center gap-2 md:gap-4 relative ${textColor}`}
      >
        {/* เส้นซ้าย */}
        <span
          className={`block h-[1px] md:h-[1.5px] bg-gradient-to-r from-transparent via-white/70 to-white/0 transition-all duration-500 md:duration-700 ease-out ${
            isHeadingInView
              ? "w-12 md:w-24 opacity-100"
              : "w-0 opacity-0 -translate-x-2 md:-translate-x-4"
          }`}
        ></span>

        {/* ข้อความหลัก */}
        <span
          className={`transition-all duration-300 md:duration-500 ${
            isHeadingInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-1 md:translate-y-2"
          }`}
        >
          {title}
        </span>

        {/* เส้นขวา */}
        <span
          className={`block h-[1px] md:h-[1.5px] bg-gradient-to-l from-transparent via-white/70 to-white/0 transition-all duration-500 md:duration-700 ease-out ${
            isHeadingInView
              ? "w-12 md:w-24 opacity-100"
              : "w-0 opacity-0 translate-x-2 md:translate-x-4"
          }`}
        ></span>
      </h2>

      {/* ข้อความรอง */}
      {subtitle && (
        <span
          className={`mt-2 text-center text-[0.9rem] sm:text-[1rem] text-[#fdfdfd] font-light opacity-10 tracking-[0.15rem] transition-all duration-500 ${
            isHeadingInView
              ? "opacity-10 translate-y-0"
              : "opacity-0 translate-y-1"
          }`}
        >
          {subtitle}
        </span>
      )}
    </div>
  );
}
