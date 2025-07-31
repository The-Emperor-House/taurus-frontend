"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Skeleton } from "@mui/material";

import DesignGridCard from "../components/DesignGridCard";
import DesignGalleryModal from "../components/DesignGalleryModal";
import AnimatedHeading from "@/app/home/components/AnimatedHeading"; // นำ AnimatedHeading กลับมาใช้

import { useParams } from "next/navigation";

export default function DesignTypePage() {
  const { type } = useParams();

  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDesign, setSelectedDesign] = useState(null);

  const displayTitle = type
    ? type.charAt(0).toUpperCase() + type.slice(1).toLowerCase() + " Designs"
    : "All Designs";

  useEffect(() => {
    if (!type) {
      setLoading(false);
      return;
    }

    const loadDesigns = async () => {
      setLoading(true);
      try {
        const apiUrl = `${
          process.env.NEXT_PUBLIC_API_URL
        }/api/designs?type=${type.toUpperCase()}`;
        const res = await fetch(apiUrl);
        const data = await res.json();

        if (Array.isArray(data)) {
          setDesigns(data);
        } else if (data && Array.isArray(data.data)) {
          setDesigns(data.data);
        } else {
          setDesigns([]);
        }
      } catch (err) {
        console.error("Failed to load designs for type:", type, err);
        setDesigns([]);
      } finally {
        setLoading(false);
      }
    };

    loadDesigns();
  }, [type]);

  const handleCardClick = (design) => {
    setSelectedDesign(design);
  };

  const handleModalClose = () => {
    setSelectedDesign(null);
  };

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 6, sm: 8 },
        pt: { xs: "56px", md: "64px" }, // Padding Top เพื่อหลบ Navbar
        minHeight: "100vh", // ความสูงขั้นต่ำเท่า Viewport
        maxWidth: "1200px", // ความกว้างสูงสุดของเนื้อหา
        mx: "auto", // จัดกึ่งกลางในแนวนอน
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: { xs: 4, md: 8 }, // ระยะห่างระหว่าง Heading กับ Cards
      }}
    >

      <Box sx={{ textAlign: "center", mb: 4 }}>
        <AnimatedHeading
          title={displayTitle}
          textColor="text.primary" // สีตัวอักษรของ Header (ใช้จาก Theme)
          lineColor="primary.main" // สีเส้น (ใช้จาก Theme)
          fontSize={{ mobile: "text-4xl", desktop: "text-6xl" }} // ขนาดตัวอักษร
          fontWeight="font-light" // น้ำหนักตัวอักษร
          animationDelay={0.1}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          flexWrap: "wrap",
          justifyContent: "center",
          gap: { xs: 4, md: 6 },
          width: "100%",
        }}
      >
        {loading ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <Box
              key={idx}
              sx={{
                width: "100%",
                flexBasis: {
                  xs: "100%",
                  sm: "calc(50% - 24px)",
                  md: "calc(33.33% - 32px)",
                },
                maxWidth: { xs: "none", sm: 350, md: 350 },
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Skeleton
                variant="rectangular"
                height={200}
                sx={{ borderRadius: 2 }}
              />
              <Skeleton width="80%" height={24} sx={{ mt: 1, mx: "auto" }} />
            </Box>
          ))
        ) : designs.length > 0 ? (
          designs.map((design) => (
            <Box
              key={design.id}
              sx={{
                width: "100%",
                flexBasis: {
                  xs: "100%",
                  sm: "calc(50% - 24px)",
                  md: "calc(33.33% - 32px)",
                },
                maxWidth: { xs: "none", sm: 350, md: 350 },
                display: "flex",
                justifyContent: "center",
              }}
            >
              <DesignGridCard design={design} onClick={handleCardClick} />
            </Box>
          ))
        ) : (
          <Box
            sx={{
              p: 4,
              textAlign: "center",
              color: "text.secondary",
              width: "100%",
            }}
          >
            <Typography variant="h6">ไม่พบ {displayTitle}</Typography>
            <Typography variant="body1">
              โปรดลองอีกครั้งในภายหลัง หรือติดต่อเรา
            </Typography>
          </Box>
        )}
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
