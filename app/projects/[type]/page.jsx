"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import { useParams } from "next/navigation";

import DesignGridCard from "../components/DesignGridCard";
import DesignGalleryModal from "../components/DesignGalleryModal";

export default function DesignTypePage() {
  const { type } = useParams();

  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDesign, setSelectedDesign] = useState(null);

  const sidebarLabel = type ? `${type.toUpperCase()} DESIGN` : "DESIGN";

  useEffect(() => {
    if (!type) {
      setLoading(false);
      return;
    }
    const loadDesigns = async () => {
      setLoading(true);
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/projects?type=${type.toUpperCase()}`;
        const res = await fetch(apiUrl);
        const data = await res.json();
        if (Array.isArray(data)) setDesigns(data);
        else if (data && Array.isArray(data.data)) setDesigns(data.data);
        else setDesigns([]);
      } catch (err) {
        console.error("Failed to load designs for type:", type, err);
        setDesigns([]);
      } finally {
        setLoading(false);
      }
    };
    loadDesigns();
  }, [type]);

  const handleCardClick = (design) => setSelectedDesign(design);
  const handleModalClose = () => setSelectedDesign(null);

  // 2 ใบแรก = 6 คอลัมน์ (ครึ่งจอ), ที่เหลือ = 4 คอลัมน์ (หนึ่งในสาม)
  const spanForIndex = (i) => (i < 2 ? 6 : 4);

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        px: { xs: 2, sm: 3, md: 4 },
        pt: { xs: "120px", md: "160px" },   // ขยับลงจาก navbar
        pb: { xs: 8, md: 10 },
        maxWidth: "1400px",
        mx: "auto",
      }}
    >
      {/* ชั้นวางป้ายด้านขวา: จัดกึ่งกลางแนวตั้งของคอนเทนต์ และดันออกนอกขวาเล็กน้อย */}
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: { xs: "none", lg: "flex" },
        justifyContent: "flex-end",
        alignItems: "center",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <Typography
        sx={{
          position: "relative",
          top: { lg: 24, xl: 350 },
          transform: "rotate(90deg)",
          transformOrigin: "right center",
          whiteSpace: "nowrap",
          mr: { lg: "-28px", xl: "-40px" },
          letterSpacing: ".35em",
          fontSize: { lg: "3.2rem", xl: "3.6rem" },
          fontWeight: 300,
          color: "#111",
          lineHeight: 1,
        }}
      >
        {sidebarLabel}
      </Typography>
    </Box>


      {/* กริดการ์ด */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,                                 // ให้อยู่เหนือป้าย
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(12, 1fr)",
          },
          gap: { xs: 3, md: 4 },                    // ระยะห่างแต่ละการ์ด
          alignItems: "stretch",
        }}
      >
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Box
                key={i}
                sx={{
                  gridColumn: {
                    xs: "span 1",
                    sm: "span 1",
                    md: `span ${spanForIndex(i)}`,
                  },
                }}
              >
                <Skeleton
                  variant="rectangular"
                  sx={{
                    width: "100%",
                    height: { xs: 220, md: i < 2 ? 340 : 300 }, // บนสูงกว่าเล็กน้อย
                  }}
                />
                <Skeleton width="70%" height={28} sx={{ mt: 1.5, mx: "auto" }} />
              </Box>
            ))
          : designs.map((design, i) => (
              <Box
                key={design.id ?? i}
                sx={{
                  gridColumn: {
                    xs: "span 1",
                    sm: "span 1",
                    md: `span ${spanForIndex(i)}`,
                  },
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <DesignGridCard design={design} onClick={handleCardClick} />
                <Typography
                  sx={{
                    mt: 1.5,
                    textAlign: "center",
                    fontSize: { xs: "1.1rem", md: "1.6rem" },
                    letterSpacing: ".18em",
                    fontWeight: 300,
                  }}
                >
                  {design.title || design.name || "Perspective 3 D"}
                </Typography>
              </Box>
            ))}
      </Box>

      {selectedDesign && (
        <DesignGalleryModal
          open={Boolean(selectedDesign)}
          onClose={handleModalClose}
          design={selectedDesign}
        />
      )}
    </Box>
  );
}
