"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Box,
  Skeleton,
  useTheme,
} from "@mui/material";
import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "TRANSFORM",
    description: "ปรับปรุง ต่อเติม",
    image: "/home/projects/transform.webp",
    link: "/projects/1",
  },
  {
    id: 2,
    title: "DECORATE",
    description: "ตกแต่งภายใน",
    image: "/home/projects/decorate.webp",
    link: "/projects/2",
  },
  {
    id: 3,
    title: "CONSTRUCTION",
    description: "การก่อสร้าง",
    image: "/home/projects/construction.webp",
    link: "/projects/3",
  },
];

// motion configs
const overlayMotion = {
  initial: { opacity: 0, y: 30 },
  hover: { opacity: 1, y: 0 },
};

const glowMotion = {
  animate: { opacity: [0.2, 0.5, 0.2] },
  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
};

export default function ProjectCards() {
  return (
    <Grid container spacing={2}>
      {projects.map((p) => (
        <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <ImageCard project={p} />
        </Grid>
      ))}
    </Grid>
  );
}

function ImageCard({ project }) {
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      style={{ borderRadius: 12, overflow: "hidden", position: "relative" }}
    >
      <Card sx={{ position: "relative", width: "100%", height: { xs: 300, sm: 400, md: 450 } }}>
        <Link href={project.link} style={{ textDecoration: "none" }}>
          <CardActionArea sx={{ width: "100%", height: "100%" }}>
            {/* Image Layer */}
            {loading && (
              <Skeleton
                variant="rectangular"
                sx={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
              />
            )}
            <CardMedia
              component="img"
              src={project.image}
              alt={project.title}
              onLoad={() => setLoading(false)}
              sx={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                borderRadius: "12px",
                objectFit: "cover",
                opacity: loading ? 0 : 1,
                transition: theme.transitions.create("opacity", {
                  duration: theme.transitions.duration.standard,
                }),
              }}
            />

            {/* Glow Layer */}
            <motion.div
              {...glowMotion}
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at center, rgba(204,143,42,0.3), transparent)",
                zIndex: 1,
              }}
            />

            {/* Overlay Layer */}
            <motion.div
              variants={overlayMotion}
              initial="initial"
              whileHover="hover"
              transition={{ duration: 0.5 }}
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.6)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: theme.spacing(2),
                textAlign: "center",
                zIndex: 2,
              }}
            >
              <Typography variant="h5" sx={{ color: "white", mb: 1 }}>
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
