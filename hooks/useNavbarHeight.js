import { useEffect, useState } from "react";

function useElementHeight(selector) {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = typeof selector === "string" ? document.querySelector(selector) : selector;
    if (!el) return;

    const update = () => setHeight(el.getBoundingClientRect().height);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [selector]);

  return height;
}
