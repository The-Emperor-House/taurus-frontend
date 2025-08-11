"use client";

import { Box, Typography, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import { serviceItems } from "../_data/services";

const BG   = "#f2e8df";              // พื้นหลัง section
const ACC  = "#b89d8b";              // สีเลข/หัวข้อ
const BODY = "#8b7e72";              // สีเนื้อความ
const DIV  = "rgba(0,0,0,0.06)";     // สีเส้นแบ่ง/กรอบ

function Heading({ item, align = "left" }) {
  return (
    <Box sx={{ textAlign: { xs: "center", md: align }, mb: { xs: 2, md: 3 } }}>
      <Typography
        component="div"
        sx={{
          fontSize: { xs: "3.75rem", md: "6rem" },
          fontWeight: 700,
          color: ACC,
          lineHeight: 1,
          mb: 1,
        }}
      >
        {item.no}
      </Typography>
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
      <Typography
        variant="h6"
        sx={{ mt: 0.5, color: ACC, fontWeight: 800, letterSpacing: ".12rem" }}
      >
        {item.subtitleTH}
      </Typography>
    </Box>
  );
}

function Image16x9({ src, alt, overlay, objectPosition = "center" }) {
  return (
    <Box sx={{ position: "relative" }}>
      {overlay && (
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${overlay})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center top",
            backgroundSize: { xs: "92% auto", md: "85% auto" },
            opacity: 0.18,
            pointerEvents: "none",
          }}
        />
      )}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <Box sx={{ pt: "56.25%" }} />
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 900px) 100vw, 33vw"
          style={{ objectFit: "cover", objectPosition }}
        />
      </Box>
    </Box>
  );
}

function TextBody({ children, align = "left" }) {
  return (
    <Typography
      variant="body1"
      sx={{
        color: BODY,
        lineHeight: 1.95,
        letterSpacing: ".02rem",
        textAlign: { xs: "center", md: align },
      }}
    >
      {children}
    </Typography>
  );
}

export default function ServiceShowcase() {
  const s1 = serviceItems[0];
  const s2 = serviceItems[1];
  const s3 = serviceItems[2];

  return (
    <Box
        sx={{
          bgcolor: BG,
          minHeight: { xs: '100dvh', md: '100vh' },
          width: '100%',
          py: { xs: 6, md: 10 },
        }}
      >
      <Container maxWidth="lg">
        {/* หัวเรื่องส่วนนี้ (ตามเดิม) */}
        <Box sx={{ mb: { xs: 5, md: 7 } }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
            <Box sx={{ flex: 1, height: 2, bgcolor: DIV }} />
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, letterSpacing: ".06em", color: "#3a3a3a", textAlign: "center" }}
            >
              บริการรีโนเวทแบบครบวงจร
            </Typography>
            <Box sx={{ flex: 1, height: 2, bgcolor: DIV }} />
          </Box>
          <Typography
            variant="h6"
            sx={{ textAlign: "center", letterSpacing: ".08em", color: "#3a3a3a" }}
          >
            สร้างใหม่ | ปรับปรุงต่อเติม - ซ่อมแซม | ออกแบบตกแต่งภายใน
          </Typography>
        </Box>

        {/* กล่องเดียว ครอบทั้ง 3 ส่วน */}
        <Box
          sx={{
            bgcolor: BG,
            p: { xs: 3, md: 4 },
          }}
        >
          <Grid container columns={12} spacing={{ xs: 3, md: 4 }}>
            {/* คอลัมน์ 1 (ซ้าย) : หัวข้อ → ข้อความ → รูป */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  height: "100%",
                  pr: { md: 3 },
                  pb: { xs: 3, md: 0 },
                }}
              >
                <Heading item={s1} align="left" />
                <TextBody align="left">{s1.descriptionTH}</TextBody>
                <Box sx={{ mt: 2.5 }}>
                  <Image16x9
                    src={s1.image}
                    alt={s1.title}
                    objectPosition="left"
                  />
                </Box>
              </Box>
            </Grid>

            {/* คอลัมน์ 2 (กลาง) : หัวข้อ → รูป (มาก่อน) → ข้อความ */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  height: "100%",
                  px: { md: 3 },
                  py: { xs: 3, md: 0 },
                }}
              >
                <Image16x9
                  src={s2.image}
                  alt={s2.title}
                />
                <Heading item={s2} align="center" />
                <Box sx={{ mt: 2.5 }}>
                  <TextBody align="center">{s2.descriptionTH}</TextBody>
                </Box>
              </Box>
            </Grid>

            {/* คอลัมน์ 3 (ขวา) : หัวข้อ → ข้อความ → รูป */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  height: "100%",
                  pl: { md: 3 },
                  pt: { xs: 3, md: 0 },
                }}
              >
                <Heading item={s3} align="right" />
                <TextBody align="right">{s3.descriptionTH}</TextBody>
                <Box sx={{ mt: 2.5 }}>
                  <Image16x9
                    src={s3.image}
                    alt={s3.title}
                    objectPosition="right"
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
