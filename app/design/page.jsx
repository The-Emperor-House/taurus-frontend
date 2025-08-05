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
        minHeight: "100vh",
        display: "flex",
        backgroundColor: "#404040",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        pt: { xs: '56px', md: '64px' },
      }}
    >
      {/* ส่วนหัว DESIGN */}
      <Box sx={{ textAlign: "center", mb: 4, pt: { xs: '56px', md: '64px' }, }}>
        <AnimatedHeading
          title="DESIGN"
          color="#FFFFFF"
          fontWeight="font-light"
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
              maxWidth: { xs: "none", sm: 500, md: 500 },
              display: "flex",
              justifyContent: "center",
              alignItems: "stretch",
              marginBottom: { xs: 4, sm: 0 },
            }}
          >
            <DesignCategoryCard
              id={category.id}
              title={category.title}
              image={category.image}
              link={category.link}
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
