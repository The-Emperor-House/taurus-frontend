"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Box, Typography, Button, Skeleton, Alert, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import MediaEmbed from "@/components/common/MediaEmbed";

const ACCENT = "#BFA68A";
const FRAME = "#333";
const FALLBACK_COVER = "/images/default-news.jpg";
const PAGE_SIZE = 5;

function resolveUrl(u) {
  if (!u) return null;
  if (u.startsWith("https://")) return u;
  if (u.startsWith("//")) return "https:" + u;
  if (u.startsWith("http://")) return u.replace(/^http:\/\//i, "https://");
  if (u.startsWith("/")) {
    const base = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");
    return base ? `${base}${u}` : u;
  }
  return u;
}
function dateLine(d) {
  if (!d) return "";
  const dt = new Date(d);
  const opts = { day: "numeric", month: "long", year: "numeric" };
  return dt.toLocaleDateString("en-GB", opts).toUpperCase();
}
function extractLabel(h1 = "") {
  const s = String(h1).trim();
  if (!s) return "NEWS :";
  if (s.includes(":")) return `${s.split(":")[0].trim().toUpperCase()} :`;
  return `${s.split(/\s+/)[0].toUpperCase()} :`;
}

export default function NewsListPage() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // ดึงข้อมูล (รองรับทั้งกรณี API มี/ไม่มี limit & offset)
  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setErr("");
        // ลองเรียกแบบมี query ก่อน
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/news?limit=${PAGE_SIZE}&offset=${(page - 1) * PAGE_SIZE}`;
        let res = await fetch(url, { signal: ctrl.signal });
        let data = [];
        if (res.ok) {
          data = await res.json();
          if (!Array.isArray(data)) data = [];
        } else {
          // ถ้าแบ็กเอนด์ยังไม่รองรับ ให้โหลดทั้งหมดแล้ว slice หน้าเอง
          const resAll = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news`, { signal: ctrl.signal });
          const all = resAll.ok ? await resAll.json() : [];
          data = (Array.isArray(all) ? all : []).slice(0, page * PAGE_SIZE);
        }
        setItems(data);
      } catch (e) {
        if (e.name !== "AbortError") setErr(e.message || "โหลดข้อมูลไม่สำเร็จ");
      } finally {
        setLoading(false);
      }
    })();
    return () => ctrl.abort();
  }, [page]);

  const canNext = items.length === page * PAGE_SIZE; // ถ้ายังเท่าจำนวนต่อหน้า แสดงว่าอาจมีหน้าถัดไป

  return (
    <Box sx={{ bgcolor: "#000", color: "#fff", minHeight: "100svh", pt: { xs: "120px", md: "160px" } }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 3 }, pb: 8 }}>
        {/* หัวข้อใหญ่ */}
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: 2, mb: 4 }}>
          <Box sx={{ height: 1, bgcolor: "rgba(255,255,255,.2)" }} />
          <Typography
            sx={{
              fontWeight: 900,
              letterSpacing: ".12em",
              fontSize: { xs: "1.6rem", md: "2.4rem" },
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            News & Events
          </Typography>
          <Box sx={{ height: 1, bgcolor: "rgba(255,255,255,.2)" }} />
        </Box>

        {err && <Alert severity="error" sx={{ mb: 2 }}>{err}</Alert>}

        {/* รายการข่าว (แนวตั้ง) */}
        {loading && items.length === 0
          ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <Box key={i} sx={{ mb: 5 }}>
                <Grid container spacing={{ xs: 2, md: 4 }}>
                  <Grid size={{ xs: 12, md: 7 }}>
                    <Box sx={{ border: `10px solid ${FRAME}`, borderRadius: 1 }}>
                      <Box sx={{ position: "relative", aspectRatio: "16 / 9", bgcolor: "#111" }}>
                        <Skeleton variant="rectangular" sx={{ position: "absolute", inset: 0 }} />
                      </Box>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, md: 5 }}>
                    <Skeleton width="70%" height={32} sx={{ mb: 1 }} />
                    <Skeleton width="35%" height={22} sx={{ mb: 2 }} />
                    <Skeleton width="80%" height={20} />
                    <Skeleton width="65%" height={20} />
                    <Skeleton width="50%" height={20} sx={{ mb: 2 }} />
                    <Skeleton width={160} height={40} />
                  </Grid>
                </Grid>
              </Box>
            ))
          : items.map((it) => {
              const cover = resolveUrl(it.coverUrl) || FALLBACK_COVER;
              return (
                <Box key={it.id} sx={{ mb: 6 }}>
                  <Grid container spacing={{ xs: 2, md: 4 }} alignItems="flex-start">
                    {/* ซ้าย: สื่อหลักในกรอบเข้ม */}
                    <Grid size={{ xs: 12, md: 7 }}>
                      <Box sx={{ border: `10px solid ${FRAME}`, borderRadius: 1 }}>
                        <Box sx={{ position: "relative", aspectRatio: "16 / 9", overflow: "hidden", bgcolor: "#111" }}>
                          {it.videoUrl ? (
                            <MediaEmbed url={it.videoUrl} />
                          ) : (
                            <img
                              src={cover}
                              alt={it.heading1 || "news cover"}
                              onError={(e) => (e.currentTarget.src = FALLBACK_COVER)}
                              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                            />
                          )}
                        </Box>
                      </Box>
                    </Grid>

                    {/* ขวา: ข้อความ */}
                    <Grid size={{ xs: 12, md: 5 }}>
                      <Typography sx={{ fontWeight: 800, fontSize: { xs: "1rem", md: "1.1rem" }, mb: 1 }}>
                        {dateLine(it.createdAt)}
                      </Typography>

                      <Typography sx={{ color: ACCENT, fontWeight: 800, letterSpacing: ".06em", textTransform: "uppercase" }}>
                        {extractLabel(it.heading1)}
                      </Typography>

                      <Typography sx={{ fontWeight: 900, fontSize: { xs: "1.2rem", md: "1.4rem" }, lineHeight: 1.25, mb: 1.5 }}>
                        {it.heading2 || it.heading1}
                      </Typography>

                      {it.body && (
                        <Typography sx={{ color: "rgba(255,255,255,.85)", lineHeight: 1.7, mb: 2 }}>
                          {it.body.length > 140 ? it.body.slice(0, 140) + "…" : it.body}
                        </Typography>
                      )}

                      <Button
                        component={Link}
                        href={`/news/${it.id}`}
                        variant="contained"
                        sx={{
                          px: 3,
                          py: 1.2,
                          borderRadius: 999,
                          bgcolor: ACCENT,
                          color: "#000",
                          fontWeight: 800,
                          letterSpacing: ".12em",
                          "&:hover": { bgcolor: "#a88e72" },
                        }}
                      >
                        READ MORE
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              );
            })}

        {/* ปุ่ม Next */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <Button
            onClick={() => setPage((p) => p + 1)}
            disabled={!canNext || loading}
            endIcon={<span style={{ fontSize: 18 }}>→</span>}
            sx={{
              px: 4,
              py: 1.4,
              borderRadius: 999,
              bgcolor: canNext ? ACCENT : "rgba(255,255,255,.2)",
              color: canNext ? "#000" : "rgba(255,255,255,.6)",
              fontWeight: 800,
              letterSpacing: ".18em",
              textTransform: "none",
              "&:hover": canNext ? { bgcolor: "#a88e72" } : {},
            }}
          >
            Next
          </Button>
        </Box>

        <Divider sx={{ mt: 6, borderColor: "rgba(255,255,255,.12)" }} />
      </Box>
    </Box>
  );
}
