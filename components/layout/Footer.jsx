"use client";

import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaLine,
  FaMailBulk,
  FaFacebookF,
  FaTiktok,
} from "react-icons/fa";
import { Box, Container, Grid, Typography, IconButton } from "@mui/material";

export default function Footer() {
  const logoSrc = "/navbar/logo webp/taurusWhite.webp";

  return (
    <Box
      component="footer"
      alignItems="center"
      sx={{
        py: { xs: 4, md: 5 },
        backgroundColor: "#404040",
        color: "#fff",
        "& a": { color: "#fff", textDecoration: "none" },
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          alignItems="center"
          spacing={{ xs: 3, md: 4 }}
          wrap="nowrap"
          sx={{ overflowX: "auto" }}
        >
          {/* Logo */}
          <Grid size={{ xs: 6, md: 2 }} offset={{ xs: 3, md: 0 }}>
            <Box
              sx={{
                position: "relative",
                width: { xs: 140, sm: 160, md: 200 },
                height: { xs: 90, sm: 100, md: 120 },
              }}
            >
              <Image
                src={logoSrc}
                alt="Taurus Logo"
                fill
                sizes="(max-width: 600px) 140px, (max-width: 900px) 160px, 200px"
                style={{ objectFit: "contain" }}
                priority
              />
            </Box>
          </Grid>

          {/* Head Office */}
          <Grid size="auto" sx={{ pl: { md: 2 } /* ดันห่างจากโลโก้เล็กน้อย */ }}>
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontWeight: 700,
                letterSpacing: "0.03rem",
                mb: 0.75,
              }}
            >
              <FaMapMarkerAlt size={18} />
              Head Office :
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "rgba(255,255,255,0.9)",
                fontSize: { xs: "1rem", md: "1.05rem" },
                lineHeight: 1.7,
              }}
            >
              288/18 Phaholyothin Rd.
              <br />
              Anusawaree , Bangkhen , Bangkok 10220
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <FaPhoneAlt />
              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255,255,255,0.9)",
                  letterSpacing: "0.18rem", // แผ่ตัวเลขให้คล้ายในภาพ
                  fontSize: { xs: "1rem", md: "1.05rem" },
                }}
              >
                (66) 2 970 3080 - 3  /  (66) 61 0596111
              </Typography>
            </Box>
          </Grid>

          {/* Vertical Divider */}
          <Grid
            sx={{
              display: { xs: "none", md: "block" },
              width: "1px",
              alignSelf: "stretch",
              mx: { md: 3 },
              backgroundColor: "rgba(255,255,255,0.45)",
            }}
          />

          {/* Showroom + Social */}
          <Grid size="auto" sx={{ pr: { md: 1 } }}>
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontWeight: 700,
                letterSpacing: "0.03rem",
                mb: 0.75,
              }}
            >
              <FaMapMarkerAlt size={18} />
              Showroom :
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "rgba(255,255,255,0.9)",
                fontSize: { xs: "1rem", md: "1.05rem" },
                lineHeight: 1.7,
              }}
            >
              189/9-10 Ratchada-Ramintra Rd.
              <br />
              Nuanchan , Buengkum , Bangkok 10240
            </Typography>

            {/* Social row */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mt: 1.5,
                flexWrap: "wrap",
              }}
            >
              <IconButton
                aria-label="Line"
                href="https://line.me/ti/p/~salestaurus"
                target="_blank"
                color="inherit"
                disableRipple
                sx={{ p: 0.5 }}
              >
                <FaLine />
              </IconButton>

              <IconButton
                aria-label="Email"
                href="mailto:taurus@emperorhouse.com"
                color="inherit"
                disableRipple
                sx={{ p: 0.5 }}
              >
                <FaMailBulk />
              </IconButton>

              <Typography
                variant="body1"
                sx={{
                  mx: 1,
                  color: "rgba(255,255,255,0.9)",
                  letterSpacing: "0.02rem",
                }}
              >
                ติดตามผลงานเพิ่มเติมของเราได้ที่
              </Typography>

              <IconButton
                aria-label="Facebook"
                href="https://facebook.com/TaurusByEmperor"
                target="_blank"
                color="inherit"
                disableRipple
                sx={{ p: 0.5 }}
              >
                <FaFacebookF />
              </IconButton>

              <IconButton
                aria-label="TikTok"
                href="https://www.tiktok.com/@taurus.by.emperor"
                target="_blank"
                color="inherit"
                disableRipple
                sx={{ p: 0.5 }}
              >
                <FaTiktok />
              </IconButton>

              <Typography
                variant="body1"
                sx={{
                  ml: 1,
                  color: "rgba(255,255,255,0.9)",
                  whiteSpace: "nowrap",
                }}
              >
                Taurus by Emperor
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
