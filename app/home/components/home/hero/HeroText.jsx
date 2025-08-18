"use client";

import { Box, Typography } from "@mui/material";

export default function HeroText({
  title = "TAURUS:",
  subtitle = "WE RENEW",
  tagline = '"สร้างบ้านหลังใหม่ ในที่อยู่อาศัยเดิมของคุณ"',
  accent = "primary.main",
  align = "left",
  contentSx = {},
}) {
  const pos =
    align === "center"
      ? { top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", maxWidth: "70%" }
      : { top: "50%", left: "5%", transform: "translateY(-50%)", textAlign: "left", maxWidth: { xs: "88%", md: "42%" } };

  return (
    <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
      <Box
        sx={{
          position: "absolute",
          ...pos,
          ...contentSx,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "2.6rem", md: "5.2rem" },
            color: accent,
            textShadow: "0 4px 12px rgba(0,0,0,0.6)",
            letterSpacing: { xs: ".06em", md: ".2em" },
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="h2"
          sx={{
            fontWeight: 300,
            fontSize: { xs: "1.6rem", md: "3.4rem" },
            color: "common.white",
            textShadow: "0 4px 12px rgba(0,0,0,0.6)",
            letterSpacing: { xs: ".06em", md: ".12em" },
            mt: 0.5,
          }}
        >
          {subtitle}
        </Typography>

        <Box sx={{ width: "100%", height: 2, bgcolor: "common.white", opacity: 0.8, my: 1 }} />

        <Typography
          variant="body2"
          sx={{
            fontWeight: 400,
            color: "grey.100",
            letterSpacing: ".08em",
            whiteSpace: "nowrap",
          }}
        >
          {tagline}
        </Typography>
      </Box>
    </Box>
  );
}
