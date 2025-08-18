"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
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

  return (
    <Box
      component={Link}
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        position: "relative",
        width,
        height,
        // เดสก์ท็อป/มือถือ: ควบคุมการแสดงผลด้วย prop
        ...(showOnXs ? {} : { display: { xs: "none", md: "flex" } }),
      }}
    >
      <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
        <Image
          src={lightSrc}
          alt="Logo Light"
          fill
          sizes={`${width}px`}
          priority
          style={{ transition: "opacity .25s ease", opacity: hover ? 0 : 1 }}
        />
        <Image
          src={accentSrc}
          alt="Logo Accent"
          fill
          sizes={`${width}px`}
          priority
          style={{ transition: "opacity .25s ease", opacity: hover ? 1 : 0 }}
        />
      </Box>
    </Box>
  );
}
