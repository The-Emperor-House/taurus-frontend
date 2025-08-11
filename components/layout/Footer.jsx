"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaMailBulk,
  FaPhoneAlt,
  FaTiktok,
  FaLine,
  FaFacebookF,
} from "react-icons/fa";

import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";

export default function Footer() {
  const [showTikTokEmbed, setShowTikTokEmbed] = useState(false);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const logoSrc = isDarkMode
    ? "/navbar/logo webp/taurusOrange.webp"
    : "/navbar/logo webp/taurusDark.webp";

  useEffect(() => {
    if (
      showTikTokEmbed &&
      !document.querySelector('script[src*="https://www.tiktok.com/embed.js"]')
    ) {
      const script = document.createElement("script");
      script.src = "https://www.tiktok.com/embed.js";
      script.async = true;
      script.onload = () => {
        // force TikTok to parse embeds again
        if (window.tiktokEmbedLoad) window.tiktokEmbedLoad();
      };
      document.body.appendChild(script);
    } else if (showTikTokEmbed && window.tiktokEmbedLoad) {
      // in case script already loaded
      window.tiktokEmbedLoad();
    }
  }, [showTikTokEmbed]);

  return (
    <Box
      component="footer"
      sx={{
        py: 8,
        backgroundColor: isDarkMode ? "grey.900" : "common.white"
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Logo */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ position: 'relative', width: 120, height: 80 }}>
              <Image 
                src={logoSrc}
                alt="Taurus Logo"
                fill
                sizes="(max-width: 1200px) 100vw, 120px"
                style={{ objectFit: 'contain' }}
                priority
              />
            </Box>
          </Grid>

          {/* Head Office */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Head Office :
            </Typography>
            <Box display="flex" alignItems="flex-start" gap={1} mb={1}>
              <FaMapMarkerAlt color="#cc8f2a" style={{ marginTop: 4 }} />
              <Typography variant="body2">
                288/18 Phaholyothin Rd,
                <br />
                Anusawaree, Bangkhen, Bangkok 10220
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <FaPhoneAlt color="#cc8f2a" />
              <Typography variant="body2">
                (66) 2 970 3080 - 3 / (66) 61 0596111
              </Typography>
            </Box>
          </Grid>

          {/* Showroom + Social */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Showroom :
            </Typography>
            <Box display="flex" alignItems="flex-start" gap={1} mb={1}>
              <FaMapMarkerAlt color="#cc8f2a" style={{ marginTop: 4 }} />
              <Typography variant="body2">
                189/9-10 Ratchada-Ramintra Rd,
                <br />
                Nuanchan, Buengkum, Bangkok 10240
              </Typography>
            </Box>

            <Typography variant="body2" mt={2} mb={1}>
              ติดตามเรา
            </Typography>

            <Box display="flex" gap={1.5}>
              <IconButton
                href="https://line.me/ti/p/~salestaurus"
                target="_blank"
                sx={{
                  color: "#00c300",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.2)",
                  },
                }}
              >
                <FaLine />
              </IconButton>

              <IconButton
                href="mailto:taurus@emperorhouse.com"
                sx={{
                  color: "#cc8f2a",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.2)",
                  },
                }}
              >
                <FaMailBulk />
              </IconButton>

              <IconButton
                href="https://facebook.com/TaurusByEmperor"
                target="_blank"
                sx={{
                  color: "#1877F2",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.2)",
                  },
                }}
              >
                <FaFacebookF />
              </IconButton>

              <Box
                onMouseEnter={() => setShowTikTokEmbed(true)}
                onMouseLeave={() => setShowTikTokEmbed(false)}
                position="relative"
              >
                <IconButton
                  href="https://www.tiktok.com/@taurus.by.emperor"
                  target="_blank"
                  sx={{
                    color: "#fe2c55",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "scale(1.2)",
                    },
                  }}
                >
                  <FaTiktok />
                </IconButton>

                {showTikTokEmbed && (
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "100%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      mb: 2,
                      zIndex: 10,
                      width: 250,
                      p: 2,
                      bgcolor: isDarkMode ? "grey.900" : "common.white",
                      borderRadius: 2,
                      boxShadow: 4,
                    }}
                  >
                    <Box
                      component="blockquote"
                      className="tiktok-embed"
                      data-video-id="7200000000000000000"
                      style={{
                        width: "100%",
                        height: "auto",
                        maxWidth: "250px",
                      }}
                    >
                      <a
                        href="https://www.tiktok.com/@taurus.by.emperor?refer=creator_embed"
                      >
                        @taurus.by.emperor
                      </a>
                    </Box>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      sx={{ display: "block", mt: 1 }}
                    >
                      Hover to view TikTok video
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()} Taurus by Emperor. All rights reserved.
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Developed by{" "}
            <a
              href="https://www.emperorhouse.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Emperor House
            </a>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
