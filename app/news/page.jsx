"use client";
import { useEffect, useState } from "react";
import { Box, Grid, Typography, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NewsCard from "./components/NewsCard";
import { useRouter } from "next/navigation";

export default function NewsListPage() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news${q ? `?q=${encodeURIComponent(q)}` : ""}`, { signal: ctrl.signal });
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } finally {
        setLoading(false);
      }
    })();
    return () => ctrl.abort();
  }, [q]);

  return (
    <Box sx={{ bgcolor: "#000", color: "#fff", minHeight: "100svh", width: "100%", pt: { xs: "140px", md: "170px" } }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, pb: 8 }}>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>News & Events</Typography>

        <TextField
          placeholder="ค้นหาข่าว..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          sx={{
            mb: 3, maxWidth: 420,
            "& .MuiOutlinedInput-root": { bgcolor: "#111", color: "#fff" },
            "& .MuiInputLabel-root": { color: "#bbb" },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start"><SearchIcon /></InputAdornment>
            ),
          }}
        />

        <Grid container spacing={3}>
          {(loading ? Array.from({ length: 6 }) : items).map((it, i) => (
            <Grid item xs={12} sm={6} md={4} key={it?.id || i}>
              {loading ? (
                <Box sx={{ height: 260, bgcolor: "#111", borderRadius: 3 }} />
              ) : (
                <NewsCard item={it} onClick={(x) => router.push(`/news/${x.id}`)} />
              )}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
