'use client';

import { usePathname } from "next/navigation";
import { Button } from "@mui/material";
import Link from "next/link";

export default function CategoryButton({ category, href }) {
  const pathname = usePathname();
  // ตรวจสอบว่าลิงก์ active หรือไม่
  const isActive = pathname === href || (href === '/' && pathname === '/');

  return (
    <Button
      component={Link}
      href={href}
      variant={isActive ? "contained" : "text"}
      size="small"
      disableRipple={!isActive}
      disableElevation={isActive}
      sx={{
        textTransform: "none",
        color: isActive ? "primary.contrastText" : "text.primary",
        backgroundColor: isActive ? "primary.main" : "transparent",
        fontWeight: isActive ? "bold" : "normal",
        border: isActive ? 'none' : '1px solid rgba(0,0,0,0.12)',
        '&:hover': {
          backgroundColor: isActive ? "primary.dark" : "rgba(0,0,0,0.08)",
          color: isActive ? "primary.contrastText" : "text.primary",
          borderColor: isActive ? 'none' : '1px solid rgba(0,0,0,0.2)',
        },
        borderRadius: "9999px",
        px: { xs: 1.5, sm: 2 },
        py: { xs: 0.5, sm: 0.7 },
        minWidth: 0,
      }}
    >
      {category}
    </Button>
  );
}