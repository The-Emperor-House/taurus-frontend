"use client";

import Link from "next/link";
import { Box } from "@mui/material";
import { alpha } from "@mui/material/styles";

export default function NavLinkItem({ href, label, active, onClick }) {
  return (
    <Box
      component={Link}
      href={href}
      onClick={onClick}
      sx={(t) => ({
        position: "relative",
        textDecoration: "none",
        fontSize: "1.05rem",
        lineHeight: 1.6,
        color: "common.white",
        transition: "color .25s ease",
        px: 0.75,
        py: 0.25,
        borderRadius: 1,
        "&:hover": { color: "primary.main" },
        "&::after": {
          content: '""',
          position: "absolute",
          left: 0,
          right: 0,
          bottom: -6,
          height: 2,
          backgroundColor: t.palette.primary.main,
          transform: "scaleX(0)",
          transformOrigin: "left center",
          transition: "transform .25s ease",
          borderRadius: 1,
        },
        ...(active && {
          color: "primary.main",
          "&::after": { transform: "scaleX(1)" },
        }),
        "&:focus-visible": {
          outline: `2px solid ${alpha(t.palette.primary.main, 0.5)}`,
          outlineOffset: 2,
        },
      })}
    >
      {label}
    </Box>
  );
}
