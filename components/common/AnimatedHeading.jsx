"use client";

import { useInView } from "framer-motion";
import { useMemo, useRef } from "react";

/**
 * AnimatedHeading (reusable)
 * ------------------------------------------------------------------
 * Props:
 * - title, subtitle
 * - align: "center" | "left" | "right"
 * - titleColor: CSS color (default: "#fff")
 * - textColorClass: tailwind class ของ title (default: "text-white")
 * - mobileSize: tailwind class (default: "text-3xl")
 * - desktopSize: tailwind class (default: "text-4xl")
 * - subtitleMobileSize, subtitleDesktopSize: tailwind class
 * - showLines: แสดงเส้นซ้าย/ขวา (default: true)
 * - showSubtitle: แสดง subtitle (default: true ถ้ามีค่า)
 * - lineColor: CSS color สำหรับเส้น (default: "rgba(255,255,255,0.7)")
 * - lineThickness: px (default: 1)
 * - lineLengthPx: { xs: number, md: number } (default: { xs: 48, md: 96 })
 * - gap: ระยะห่างระหว่างเส้นกับตัวอักษร (px, default: { xs: 8, md: 16 })
 * - className: class ของ container
 * - disableSelection: ปิดการ select (default: false)
 */
export default function AnimatedHeading({
  title = "PROJECT",
  subtitle = "RECRAFTING SPACES. REVIVING LIVING.",
  align = "center",
  titleColor = "#fff",
  textColorClass = "text-white",
  mobileSize = "text-3xl",
  desktopSize = "text-4xl",
  subtitleMobileSize = "text-sm",
  subtitleDesktopSize = "text-base",
  showLines = true,
  showSubtitle, // ถ้าไม่ส่ง จะอิงว่ามี subtitle ไหม
  lineColor = "rgba(255,255,255,0.7)",
  lineThickness = 1,
  lineLengthPx = { xs: 48, md: 96 },
  gap = { xs: 8, md: 16 },
  className = "",
  disableSelection = false,
}) {
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { margin: "-10%", amount: 0.3 });

  const containerAlign = useMemo(() => {
    if (align === "left") return "items-start text-left";
    if (align === "right") return "items-end text-right";
    return "items-center text-center";
  }, [align]);

  const computedShowSubtitle = useMemo(() => {
    if (typeof showSubtitle === "boolean") return showSubtitle;
    return Boolean(subtitle);
  }, [showSubtitle, subtitle]);

  // สร้างสไตล์สำหรับเส้นซ้าย/ขวาแบบยืดหยุ่น
  const commonLineStyle = {
    height: lineThickness,
    transition: "width 500ms ease, opacity 500ms ease, transform 500ms ease",
    backgroundImage: `linear-gradient(to right, transparent, ${lineColor}, rgba(255,255,255,0))`,
  };
  const leftLineStyle = {
    ...commonLineStyle,
    backgroundImage: `linear-gradient(to right, transparent, ${lineColor}, rgba(255,255,255,0))`,
    width: isHeadingInView ? `clamp(${lineLengthPx.xs}px, 6vw, ${lineLengthPx.md}px)` : 0,
    opacity: isHeadingInView ? 1 : 0,
    transform: isHeadingInView ? "translateX(0)" : "translateX(-8px)",
  };
  const rightLineStyle = {
    ...commonLineStyle,
    backgroundImage: `linear-gradient(to left, transparent, ${lineColor}, rgba(255,255,255,0))`,
    width: isHeadingInView ? `clamp(${lineLengthPx.xs}px, 6vw, ${lineLengthPx.md}px)` : 0,
    opacity: isHeadingInView ? 1 : 0,
    transform: isHeadingInView ? "translateX(0)" : "translateX(8px)",
  };

  // คลาสตัวอักษรหลัก/รอง
  const titleClass = `${mobileSize} md:${desktopSize} font-light tracking-widest inline-flex items-center`;
  const subtitleClass = `mt-2 ${subtitleMobileSize} md:${subtitleDesktopSize} font-light tracking-[0.15rem]`;

  return (
    <div
      ref={headingRef}
      className={[
        "flex flex-col",
        containerAlign,
        disableSelection ? "select-none" : "",
        className,
      ].join(" ")}
      style={{ willChange: "opacity, transform" }}
    >
      {/* Title + lines */}
      <h2
        className={`${titleClass} ${textColorClass}`}
        style={{
          color: titleColor,
          gap: `clamp(${gap.xs || 8}px, 2vw, ${gap.md || 16}px)`,
          paddingLeft: "clamp(16px, 3vw, 24px)",
          paddingRight: "clamp(16px, 3vw, 24px)",
          opacity: isHeadingInView ? 1 : 0,
          transform: isHeadingInView ? "translateY(0)" : "translateY(6px)",
          transition: "opacity 300ms ease, transform 300ms ease",
        }}
      >
        {/* left line */}
        {showLines && <span style={leftLineStyle} />}

        {/* text */}
        <span>{title}</span>

        {/* right line */}
        {showLines && <span style={rightLineStyle} />}
      </h2>

      {/* Subtitle */}
      {computedShowSubtitle && (
        <span
          className={subtitleClass}
          style={{
            color: "rgba(253,253,253,0.9)",
            opacity: isHeadingInView ? 0.35 : 0,
            transform: isHeadingInView ? "translateY(0)" : "translateY(4px)",
            transition: "opacity 500ms ease, transform 500ms ease",
            letterSpacing: "0.15rem",
          }}
        >
          {subtitle}
        </span>
      )}
    </div>
  );
}