"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

export default function AnimatedHeading({ title }) {
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, {
    margin: "-20%",
    amount: 0.5,
  });

  return (
    <h2
      ref={headingRef}
      className="text-4xl font-bold px-6 inline-flex items-center gap-4 relative"
    >
      {/* เส้นสีขาวด้านซ้าย */}
      <span
        className={`block h-[2px] bg-white transition-all duration-700 ease-out ${
          isHeadingInView ? "w-24 opacity-100" : "w-0 opacity-0 -translate-x-4"
        }`}
      ></span>

      {/* ข้อความ */}
      <span
        className={`text-white text-6xl font-light tracking-widest transition-all duration-500 ${
          isHeadingInView
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2"
        }`}
      >
        {title}
      </span>

      {/* เส้นสีขาวด้านขวา */}
      <span
        className={`block h-0.5 bg-white transition-all duration-700 ease-out ${
          isHeadingInView ? "w-24 opacity-100" : "w-0 opacity-0 translate-x-4"
        }`}
      ></span>
    </h2>
  );
}
