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

        if (Array.isArray(data)) {
          setDesigns(data);
        } else if (Array.isArray(data.data)) {
          setDesigns(data.data);
        } else {
          console.warn("Unexpected API format", data);
          setDesigns([]);
        }
      } catch (err) {
        console.error("Failed to load designs:", err);
        setDesigns([]);
      } finally {
        setLoading(false);
      }
    };

    loadDesigns();
  }, []);

  return (
    <Box sx={{ px: 2, py: 4, maxWidth: "1200px", mx: "auto" }}>
      <Typography variant="h4" fontWeight="light" textAlign="center" mb={4}>
        ARCHITECTURAL DESIGN
      </Typography>

      <Grid container spacing={4}>
        {loading
          ? Array.from({ length: 6 }).map((_, idx) => (
              <Grid key={idx} size={{ xs: 12, sm: 6, md: 4 }}>
                <Skeleton variant="rectangular" height={200} />
                <Skeleton width="60%" />
              </Grid>
            ))
          : designs.map((item) => (
              <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Card
                    sx={{ borderRadius: 2, overflow: "hidden" }}
                    onClick={() => setSelectedDesign(item)}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="200"
                        image={item.coverUrl}
                        alt={item.name}
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
            ))}
      </Grid>

      {/* Modal Gallery */}
      <Dialog
        open={Boolean(selectedDesign)}
        onClose={() => setSelectedDesign(null)}
        fullWidth
        maxWidth="md"
      >
        <Box sx={{ position: "relative", p: 2 }}>
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
                original: img.imageUrl,
                thumbnail: img.imageUrl,
              }))}
              showThumbnails={true}
              showPlayButton={false}
              showFullscreenButton={false}
            />
          ) : (
            <Typography textAlign="center" color="text.secondary">
              ไม่มีภาพเพิ่มเติม
            </Typography>
          )}
        </Box>
      </Dialog>
    </Box>
  );
}
