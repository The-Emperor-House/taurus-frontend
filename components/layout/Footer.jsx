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
import { Box, Container, Typography, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";

export default function Footer() {
  const logoSrc = "/navbar/logo webp/taurusWhite.webp";

  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 4, md: 5 },
        bgcolor: "#404040",
        color: "#fff",
        "& a": { color: "#fff", textDecoration: "none" },
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={{ xs: 3, md: 4 }}
          alignItems="center"
          sx={{ flexWrap: { xs: "wrap", md: "nowrap" } }}
        >
          {/* Logo */}
          <Grid size={{ xs: 12, md: 2 }} offset={{ xs: 0, md: 0 }}>
            <Box
              sx={{
                position: "relative",
                width: { xs: 120, sm: 140, md: 200 },
                height: { xs: 80, sm: 90, md: 120 },
                mx: { xs: "auto", md: 0 }, // center on mobile
              }}
            >
              <Image
                src={logoSrc}
                alt="Taurus Logo"
                fill
                sizes="(max-width: 600px) 120px, (max-width: 900px) 140px, 200px"
                style={{ objectFit: "contain" }}
                priority
              />
            </Box>
          </Grid>

          {/* Head Office */}
          <Grid size={{ xs: 12, md: "auto" }} sx={{ pl: { md: 2 } }}>
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "center", md: "flex-start" },
                gap: 1,
                fontWeight: 700,
                letterSpacing: "0.03rem",
                mb: 0.75,
                textAlign: { xs: "center", md: "left" },
              }}
            >
              <FaMapMarkerAlt size={18} />
              Head Office :
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "rgba(255,255,255,0.9)",
                fontSize: { xs: "0.98rem", md: "1.05rem" },
                lineHeight: 1.7,
                textAlign: { xs: "center", md: "left" },
              }}
            >
              288/18 Phaholyothin Rd.
              <br />
              Anusawaree , Bangkhen , Bangkok 10220
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "center", md: "flex-start" },
                gap: 1,
                mt: 1,
              }}
            >
              <FaPhoneAlt />
              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255,255,255,0.9)",
                  letterSpacing: { xs: "0.08rem", md: "0.18rem" },
                  fontSize: { xs: "0.98rem", md: "1.05rem" },
                }}
              >
                (66) 2 970 3080 - 3  /  (66) 61 0596111
              </Typography>
            </Box>
          </Grid>

          {/* Divider: vertical on desktop, horizontal on mobile */}
          <Grid
            sx={{
              display: { xs: "none", md: "block" },
              width: "1px",
              alignSelf: "stretch",
              mx: { md: 3 },
              bgcolor: "rgba(255,255,255,0.45)",
            }}
          />
          <Grid size={12} sx={{ display: { xs: "block", md: "none" } }}>
            <Box sx={{ borderBottom: "1px solid rgba(255,255,255,0.35)" }} />
          </Grid>

          {/* Showroom + Social */}
          <Grid size={{ xs: 12, md: "auto" }} sx={{ pr: { md: 1 } }}>
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "center", md: "flex-start" },
                gap: 1,
                fontWeight: 700,
                letterSpacing: "0.03rem",
                mb: 0.75,
                textAlign: { xs: "center", md: "left" },
              }}
            >
              <FaMapMarkerAlt size={18} />
              Showroom :
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "rgba(255,255,255,0.9)",
                fontSize: { xs: "0.98rem", md: "1.05rem" },
                lineHeight: 1.7,
                textAlign: { xs: "center", md: "left" },
              }}
            >
              189/9-10 Ratchada-Ramintra Rd.
              <br />
              Nuanchan , Buengkum , Bangkok 10240
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "center", md: "flex-start" },
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
                  textAlign: { xs: "center", md: "left" },
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
                  textAlign: { xs: "center", md: "left" },
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
