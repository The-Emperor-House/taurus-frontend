"use client";

import { useEffect, useLayoutEffect, useState } from "react";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * วัดความสูงของ element (เช่น #main-navbar) แล้วอัปเดตเมื่อขนาดเปลี่ยน
 * @param {string|HTMLElement|null} target - selector เช่น "#main-navbar" หรือส่ง element ตรง ๆ
 * @returns {number} height (px)
 */
export default function useElementHeight(target) {
  const [height, setHeight] = useState(0);

  useIsoLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const el =
      typeof target === "string"
        ? document.querySelector(target)
        : target || null;

    if (!el) return; // ไม่เจอ element ก็ไม่ทำอะไร

    const measure = () => {
      const rect = el.getBoundingClientRect();
      setHeight(rect.height || 0);
    };

    // วัดครั้งแรก
    measure();

    // อัปเดตเมื่อ element resize / หน้าต่าง resize / scroll
    const ro = new ResizeObserver(measure);
    ro.observe(el);

    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
    };
  }, [target]);

  return height;
}
