"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";

export default function LogoSwap({
  href = "/",
  lightSrc = "/navbar/logo webp/taurusWhite.webp",
  accentSrc = "/navbar/logo webp/taurusOrange.webp",
  width = 160,
  height = 60,
  showOnXs = true,
}) {
  const [hover, setHover] = useState(false);

  // อุ่นภาพ accent หลัง mount (ไม่ใช้ <link rel="preload"> จึงไม่เตือน)
  useEffect(() => {
    const img = new window.Image();
    img.decoding = "async";
    img.loading = "eager";
    img.src = accentSrc;
  }, [accentSrc]);

  return (
    <Box
      component={Link}
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{
        position: "relative",
        display: showOnXs ? "flex" : { xs: "none", md: "flex" },
        alignItems: "center",
        textDecoration: "none",
        width,
        height,
      }}
    >
      <Box sx={{ position: "relative", width, height }}>
        {/* รูปหลักที่แสดงทันที → priority เพื่อให้โหลดก่อน */}
        <Image
          src={lightSrc}
          alt="Taurus Logo"
          width={width}
          height={height}
          priority
          draggable={false}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transition: "opacity .25s ease",
            opacity: hover ? 0 : 1,
          }}
        />

        {/* รูปตอน hover → ไม่ใส่ priority เพื่อตัด warning */}
        <Image
          src={accentSrc}
          alt=""
          aria-hidden
          width={width}
          height={height}
          draggable={false}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transition: "opacity .25s ease",
            opacity: hover ? 1 : 0,
          }}
        />
      </Box>
    </Box>
  );
}
