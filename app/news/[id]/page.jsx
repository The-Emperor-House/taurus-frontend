"use client";
import { useEffect, useState } from "react";
import { Box, Typography, Grid, Chip } from "@mui/material";

export default function NewsDetail({ params }) {
  const { id } = params;
  const [item, setItem] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/${id}`);
      if (res.ok) setItem(await res.json());
    })();
  }, [id]);

  if (!item) {
    return (
      <Box sx={{ bgcolor: "#000", color: "#fff", minHeight: "100svh", pt: { xs: "140px", md: "170px" } }} />
    );
  }

  return (
    <Box sx={{ bgcolor: "#000", color: "#fff", minHeight: "100svh", width: "100%", pt: { xs: "140px", md: "170px" } }}>
      <Box sx={{ maxWidth: 1000, mx: "auto", px: 2, pb: 8 }}>
        {/* Cover */}
        <Box sx={{ position: "relative", width: "100%", overflow: "hidden", borderRadius: 2, mb: 3 }}>
          <Box sx={{ pt: "56.25%" }} />
          <img src={item.coverUrl} alt={item.heading1}
               style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        </Box>

        <Typography variant="h4" fontWeight={800} sx={{ mb: .5 }}>{item.heading1}</Typography>
        {item.heading2 && <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>{item.heading2}</Typography>}

        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 3 }}>
          {new Date(item.createdAt).toLocaleString("th-TH", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}
        </Typography>

        {item.videoUrl && (
          <Box sx={{ mb: 3, aspectRatio: "16/9" }}>
            {/* รองรับลิงก์ YouTube/Vimeo แบบ embed หรือ mp4 ตรง ๆ */}
            <iframe src={item.videoUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen />
          </Box>
        )}

        {item.body && (
          <Typography sx={{ whiteSpace: "pre-wrap", lineHeight: 1.8, mb: 3 }}>{item.body}</Typography>
        )}

        {!!item.images?.length && (
          <>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Gallery</Typography>
            <Grid container spacing={2}>
              {item.images.map((img) => (
                <Grid item xs={6} sm={4} md={3} key={img.id}>
                  <Box sx={{ position: "relative", borderRadius: 1, overflow: "hidden" }}>
                    <Box sx={{ pt: "100%" }} />
                    <img src={img.imageUrl} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>
    </Box>
  );
}
