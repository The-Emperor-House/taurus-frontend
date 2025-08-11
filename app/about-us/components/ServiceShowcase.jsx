"use client";

import { Box, Typography, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import { serviceItems } from "../_data/services";

const BG = "#f2e8df";       // พื้นครีมอ่อน
const ACCENT = "#b89d8b";   // สีเลข/หัวข้อ
const BODY = "#8b7e72";     // สีข้อความยาว
const LINE = "#d9cec3";     // สีเส้นบาง

function ServiceItem({ item, align = "left", overlay }) {
  return (
    <Box sx={{ textAlign: { xs: "center", md: align } }}>
      {/* เลขใหญ่ */}
      <Typography
        component="div"
        sx={{
          fontSize: { xs: "4.5rem", md: "7rem" },
          fontWeight: 700,
          color: ACCENT,
          lineHeight: 1,
          mb: 1.5,
        }}
      >
        {item.no}
      </Typography>

      {/* EN title กระจายตัว */}
      <Typography
        variant="h6"
        sx={{
          letterSpacing: ".6rem",
          fontWeight: 800,
          color: "#4e4e4e",
          textIndent: ".6rem",
        }}
      >
        {item.title}
      </Typography>

      {/* TH subtitle หนา */}
      <Typography
        variant="h6"
        sx={{ mt: 0.75, color: ACCENT, fontWeight: 800, letterSpacing: ".12rem" }}
      >
        {item.subtitleTH}
      </Typography>

      {/* คำอธิบายยาว */}
      <Typography
        variant="body1"
        sx={{ mt: 2, color: BODY, lineHeight: 1.95, letterSpacing: ".02rem" }}
      >
        {item.descriptionTH}
      </Typography>

      {/* รูป + ลายประกอบจาง ๆ */}
      <Box sx={{ position: "relative", mt: 3 }}>
        {overlay && (
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${overlay})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center top",
              backgroundSize: { xs: "90% auto", md: "85% auto" },
              opacity: 0.18,
              pointerEvents: "none",
            }}
          />
        )}
        <Box sx={{ position: "relative", width: "100%", borderRadius: 2, overflow: "hidden" }}>
          <Box sx={{ pt: "56.25%" }} />
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 900px) 100vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default function ServiceShowcase() {
  const s1 = serviceItems[0]; // REBUILD
  const s2 = serviceItems[1]; // RENOVATE
  const s3 = serviceItems[2]; // REDESIGN & DECORATE

  return (
    <Box sx={{ bgcolor: BG, py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        {/* หัวข้อกลาง + เส้นซ้าย/ขวา + บรรทัดรอง */}
        <Box sx={{ mb: { xs: 6, md: 8 } }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
            <Box sx={{ flex: 1, height: 3, bgcolor: LINE }} />
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, letterSpacing: ".06em", color: "#3a3a3a", textAlign: "center" }}
            >
              บริการรีโนเวทแบบครบวงจร
            </Typography>
            <Box sx={{ flex: 1, height: 3, bgcolor: LINE }} />
          </Box>
          <Typography
            variant="h6"
            sx={{ textAlign: "center", letterSpacing: ".08em", color: "#3a3a3a" }}
          >
            สร้างใหม่ | ปรับปรุงต่อเติม - ซ่อมแซม | ออกแบบตกแต่งภายใน
          </Typography>
        </Box>

        {/* แถวบน: 1 ซ้าย, 3 ขวา */}
        <Grid container columns={12} spacing={{ xs: 6, md: 10 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <ServiceItem
              item={s1}
              align="left"
              overlay="/about-us/overlays/blueprint-left.svg"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ServiceItem
              item={s3}
              align="right"
              overlay="/about-us/overlays/plan-right.svg"
            />
          </Grid>

          {/* แถวล่าง: 2 กึ่งกลาง */}
          <Grid size={{ xs: 12, md: 6 }} offset={{ xs: 0, md: 3 }}>
            <ServiceItem item={s2} align="center" overlay="/about-us/overlays/cranes.svg" />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
