'use client';

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Card,
  CardActionArea,
  Typography,
  Box,
  Skeleton,
} from "@mui/material";
import { useState, useEffect } from "react";

const fetchProjectsData = async () => {
  return new Promise(resolve => setTimeout(() => {
    resolve([
      { id: 1, title: "TRANSFORM", description: "ปรับปรุง ต่อเติม", image: "/home/projects/transform.webp", link: "/projects/transform" },
      { id: 2, title: "DECORATE", description: "ตกแต่งภายใน", image: "/home/projects/decorate.webp", link: "/projects/decorate" },
      { id: 3, title: "CONSTRUCTION", description: "การก่อสร้าง", image: "/home/projects/construction.webp", link: "/projects/construction" },
    ]);
  }, 500));
};

const overlayMotion = {
  initial: { opacity: 0 },
  hover: { opacity: 1 },
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
          <Skeleton key={i} variant="rectangular" height={550} sx={{ borderRadius: "12px" }} />
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
      const check = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
      setIsTouchDevice(check);
    }
  }, []);

  return (
    <motion.div
      whileHover={isTouchDevice ? undefined : { scale: 1.05 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className="rounded-xl overflow-hidden relative shadow-lg"
      style={{ height: "550px" }}
    >
      <Card sx={{ position: "relative", width: "100%", height: "100%", borderRadius: "12px" }}>
        <Link href={project.link} style={{ textDecoration: "none" }}>
          <CardActionArea 
            sx={{
              width: "100%",
              height: "100%",
              '&:hover .fade-image': {
                filter: 'brightness(0.5)',
                transition: 'filter 0.5s ease',
              }
            }}
          >
            {loading && (
              <Skeleton
                variant="rectangular"
                sx={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
              />
            )}
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
              className={`object-cover rounded-xl transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}
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

            {/* Overlay Layer */}
            <motion.div
              variants={overlayMotion}
              initial="initial"
              animate={isTouchDevice ? "hover" : undefined}
              whileHover={isTouchDevice ? undefined : "hover"}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-4"
              style={{ background: "rgba(0, 0, 0, 0.5)" }}
            >
              <Typography variant="h5" sx={{ color: "white", mb: 1, fontWeight: 'bold' }}>
                {project.title}
              </Typography>
              <Box
                sx={{
                  width: "50px",
                  height: "2px",
                  bgcolor: "white",
                  mb: 1,
                  transform: "scaleX(0)",
                  transition: "transform 0.5s",
                  ".MuiCardActionArea-root:hover &": {
                    transform: "scaleX(1)",
                  },
                }}
              />
              <Typography variant="body2" sx={{ color: "white" }}>
                {project.description}
              </Typography>
            </motion.div>
          </CardActionArea>
        </Link>
      </Card>
    </motion.div>
  );
}
