"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardActionArea, Typography, Box, Skeleton } from "@mui/material";
import { useState, useEffect } from "react";

const fetchProjectsData = async () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "REBUILD",
          description: "สร้างใหม่",
          image: "/home/projects/transform.webp",
          link: "/projects/REBUILD",
        },
        {
          id: 2,
          title: "RENOVATE",
          description: "ปรับปรุงต่อเติม - ซ่อมแซม",
          image: "/home/projects/decorate.webp",
          link: "/projects/RENOVATE",
        },
        {
          id: 3,
          title: "REDESIGN & DECORATE",
          description: "ออกแบบตกแต่งภายใน",
          image: "/home/projects/construction.webp",
          link: "/projects/REDESIGN",
        },
      ]);
    }, 500)
  );
};

const glowMotion = {
  animate: { opacity: [0.2, 0.5, 0.2] },
  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
};

export default function ProjectCards() {
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      setLoadingProjects(true);
      const data = await fetchProjectsData();
      setProjects(data);
      setLoadingProjects(false);
    };
    loadProjects();
  }, []);

  if (loadingProjects) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-4 mx-auto max-w-7xl">
        {[...Array(3)].map((_, i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            height={550}
            sx={{ borderRadius: "12px" }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4 mx-auto max-w-8xl">
      {projects.map((p) => (
        <ImageCard key={p.id} project={p} />
      ))}
    </div>
  );
}

function ImageCard({ project }) {
  const [loading, setLoading] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const check = window.matchMedia(
        "(hover: none) and (pointer: coarse)"
      ).matches;
      setIsTouchDevice(check);
    }
  }, []);

  return (
    <motion.div
      whileHover={isTouchDevice ? undefined : { scale: 1.05 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className="overflow-hidden relative shadow-lg"
      style={{ height: "550px" }}
    >
      <Card
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: 0,
        }}
      >
        <Link href={project.link} style={{ textDecoration: "none" }}>
          <CardActionArea
            sx={{
              width: "100%",
              height: "100%",
              "&:hover .fade-image": {
                filter: "brightness(0.5)",
                transition: "filter 0.5s ease",
              },
            }}
          >
            {loading && (
              <Skeleton
                variant="rectangular"
                sx={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: 0,
                }}
              />
            )}
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover transition-opacity duration-700 ${
                loading ? "opacity-0" : "opacity-100"
              }`}
              style={{ borderRadius: 0 }}
              onLoad={() => setLoading(false)}
            />

            {/* Glow Layer */}
            <motion.div
              {...glowMotion}
              className="absolute inset-0 z-10"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(204,143,42,0.3), transparent)",
              }}
            />

            {/* Overlay Layer - แสดงตลอด */}
            <div
              className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-4"
              style={{ background: "rgba(0, 0, 0, 0.5)" }}
            >
              {/* ข้อความหลัก: กระจายตัวอักษร */}
              <Typography
                variant="h5"
                sx={{
                  color: "#fff",
                  mb: 1,
                  fontWeight: 700,
                  letterSpacing: {
                    xs: "0.15rem",
                    sm: "0.25rem",
                    md: "0.35rem",
                  }, // กระจายตัว
                  textTransform: "uppercase",
                  textShadow: "0 4px 12px rgba(0,0,0,0.6)",
                }}
              >
                {project.title}
              </Typography>

              {/* เส้นบาง ไล่สี จางๆ */}
              <Box
                sx={{
                  width: { xs: "42%", sm: "38%", md: "34%" },
                  height: "1px", // บางลง
                  background:
                    "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.55), rgba(255,255,255,0))",
                  mb: 1.2,
                }}
              />

              {/* ข้อความรอง: เล็กและบาง */}
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255,255,255,0.9)",
                  fontWeight: 300, // บาง
                  fontSize: { xs: "0.85rem", sm: "0.9rem", md: "0.95rem" }, // เล็กลง
                  letterSpacing: "0.04rem",
                  textShadow: "0 3px 8px rgba(0,0,0,0.5)",
                }}
              >
                {project.description}
              </Typography>
            </div>
          </CardActionArea>
        </Link>
      </Card>
    </motion.div>
  );
}
