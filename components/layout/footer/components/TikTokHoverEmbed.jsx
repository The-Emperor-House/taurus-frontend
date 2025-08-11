"use client";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { FaTiktok } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function TikTokHoverEmbed() {
  const [show, setShow] = useState(false);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  useEffect(() => {
    if (
      show &&
      !document.querySelector('script[src*="https://www.tiktok.com/embed.js"]')
    ) {
      const script = document.createElement("script");
      script.src = "https://www.tiktok.com/embed.js";
      script.async = true;
      script.onload = () => {
        if (window.tiktokEmbedLoad) window.tiktokEmbedLoad();
      };
      document.body.appendChild(script);
    } else if (show && window.tiktokEmbedLoad) {
      window.tiktokEmbedLoad();
    }
  }, [show]);

  return (
    <Box
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      position="relative"
    >
      <IconButton
        href="https://www.tiktok.com/@taurus.by.emperor"
        target="_blank"
        sx={{
          color: "#fe2c55",
          transition: "transform 0.2s",
          "&:hover": { transform: "scale(1.2)" },
        }}
      >
        <FaTiktok />
      </IconButton>

      {show && (
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
            style={{ width: "100%", height: "auto", maxWidth: "250px" }}
          >
            <a href="https://www.tiktok.com/@taurus.by.emperor?refer=creator_embed">
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
  );
}