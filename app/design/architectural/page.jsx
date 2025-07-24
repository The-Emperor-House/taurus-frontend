"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Skeleton,
  Dialog,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import CloseIcon from "@mui/icons-material/Close";

export default function ArchitecturalPage() {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDesign, setSelectedDesign] = useState(null);

  useEffect(() => {
    const loadDesigns = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/designs?type=ARCHITECTURAL`
        );
        const data = await res.json();

        const validData = Array.isArray(data)
          ? data
          : Array.isArray(data.data)
          ? data.data
          : [];

        setDesigns(validData);
      } catch (err) {
        console.error("Failed to load designs:", err);
        setDesigns([]);
      } finally {
        setLoading(false);
      }
    };

    loadDesigns();
  }, []);

  const renderSkeletonCard = (key) => (
    <Grid key={key} size={{ xs: 12, sm: 6, md: 4 }}>
      <Card sx={{ borderRadius: 2 }}>
        <Skeleton variant="rectangular" height={200} />
        <Box p={2}>
          <Skeleton width="60%" />
        </Box>
      </Card>
    </Grid>
  );

  const renderDesignCard = (item) => (
    <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4 }}>
      <motion.div whileHover={{ scale: 1.05 }}>
        <Card
          sx={{ borderRadius: 2, overflow: "hidden" }}
          onClick={() => setSelectedDesign(item)}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              image={item.coverUrl}
              alt={item.name || "design"}
              sx={{
                aspectRatio: "4 / 3",
                width: "100%",
                objectFit: "cover",
                background: "#eee",
              }}
            />
            <CardContent>
              <Typography variant="subtitle2" textAlign="center">
                {item.name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </motion.div>
    </Grid>
  );

  return (
    <Box sx={{ px: 2, py: 4, maxWidth: "1200px", mx: "auto" }}>
      <Typography variant="h4" fontWeight="light" textAlign="center" mb={4}>
        ARCHITECTURAL DESIGN
      </Typography>

      <Grid container spacing={4}>
        {loading
          ? Array.from({ length: 6 }).map((_, idx) => renderSkeletonCard(idx))
          : designs.map((item) => renderDesignCard(item))}
      </Grid>

      {/* Dialog สำหรับดูภาพเพิ่มเติม */}
      <Dialog
        open={Boolean(selectedDesign)}
        onClose={() => setSelectedDesign(null)}
        fullScreen
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            width: "100%",
            m: { xs: 0, sm: 2 },
            maxWidth: { xs: "100vw", sm: "700px" },
            borderRadius: { xs: 0, sm: 2 },
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            p: { xs: 1, sm: 2 },
            maxHeight: { xs: "100vh", sm: "80vh" },
            overflowY: "auto",
          }}
        >
          <IconButton
            onClick={() => setSelectedDesign(null)}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" textAlign="center" mb={2}>
            {selectedDesign?.name}
          </Typography>

          {selectedDesign?.images?.length > 0 ? (
            <ImageGallery
              items={selectedDesign.images.map((img) => ({
                original: img.imageUrl || "/fallback.jpg",
                thumbnail: img.imageUrl || "/fallback.jpg",
                originalClass: "gallery-img-equal",
                thumbnailClass: "gallery-thumb-equal",
              }))}
              showThumbnails
              showPlayButton={false}
              showFullscreenButton
              additionalClass="gallery-equal-wrapper"
            />
          ) : (
            <Typography textAlign="center" color="text.secondary">
              ไม่มีภาพเพิ่มเติม
            </Typography>
          )}
        </Box>
      </Dialog>

      <style jsx global>{`
        .gallery-equal-wrapper .image-gallery-slide img.gallery-img-equal {
          object-fit: cover;
          width: 100%;
          height: 400px;
          background: #eee;
        }
        @media (max-width: 600px) {
          .gallery-equal-wrapper .image-gallery-slide img.gallery-img-equal {
            height: 220px;
          }
        }
        .gallery-equal-wrapper
          .image-gallery-thumbnail
          img.gallery-thumb-equal {
          object-fit: cover;
          width: 100px;
          height: 75px;
          background: #eee;
        }
        @media (max-width: 600px) {
          .gallery-equal-wrapper
            .image-gallery-thumbnail
            img.gallery-thumb-equal {
            width: 60px;
            height: 45px;
          }
        }
      `}</style>
    </Box>
  );
}
