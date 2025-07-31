"use client";

import { Box } from "@mui/material";

import DesignCategoryCard from "./components/DesignCategoryCard";
import AnimatedHeading from "@/app/home/components/AnimatedHeading";

const designCategories = [
  {
    id: "architectural",
    title: "ARCHITECTURAL DESIGN",
    image: "/mock/architectural-cover.jpg",
    link: "/design/architectural",
  },
  {
    id: "interior",
    title: "INTERIOR DESIGN",
    image: "/mock/interior-cover.jpg",
    link: "/design/interior",
  },
];

export default function DesignPage() {
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
      {/* ส่วนหัว DESIGN */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <AnimatedHeading
          title="DESIGN"
          textColor="text.primary" // สีตัวอักษรของ Header (ใช้จาก Theme)
          lineColor="primary.main" // สีเส้น (ใช้จาก Theme)
          fontSize={{ mobile: "text-4xl", desktop: "text-6xl" }} // ขนาดตัวอักษร
          fontWeight="font-light" // น้ำหนักตัวอักษร
          animationDelay={0.1}
        />
      </Box>

      {/* Flex Container สำหรับ Design Category Cards */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          flexWrap: "wrap",
          justifyContent: "center",
          gap: { xs: 4, md: 6 }, // Spacing ระหว่าง Card
          width: "100%",
        }}
      >
        {designCategories.map((category, index) => (
          <Box
            key={category.id}
            sx={{
              width: "100%",
              flexBasis: {
                xs: "100%",
                sm: "calc(50% - 24px)",
                md: "calc(50% - 24px)",
              }, // 2 Cards ต่อแถวบน md:
              maxWidth: { xs: "none", sm: 500, md: 500 }, // Max width per card (ปรับให้ใหญ่ขึ้น)
              display: "flex",
              justifyContent: "center",
              alignItems: "stretch", // ทำให้ Card มีความสูงเท่ากันในแถว
            }}
          >
            <DesignCategoryCard
              id={category.id}
              title={category.title}
              image={category.image}
              link={category.link}
              index={index}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
