import { Box, Stack, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";

export default function ServiceBlock() {
  const servicesMain = [
    { title: "REBUILD", subtitle: "สร้างใหม่" },
    { title: "RENOVATE", subtitle: "ปรับปรุง ต่อเติม - ซ่อมแซม" },
    { title: "REDESIGN & DECORATE", subtitle: "ออกแบบตกแต่งภายใน" },
  ];

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography
        variant="h6"
        color="black"
        fontWeight="light"
        mb={4}
        sx={{ letterSpacing: "0.4rem" }}
      >
        OUR SERVICE
      </Typography>

      <Stack spacing={{ xs: 3, md: 4 }} alignItems="center" width="100%">
        {servicesMain.map((item, idx) => (
          <Stack
            key={idx}
            spacing={{ xs: 6, md: 8 }}
            alignItems="center"
            sx={{ width: "100%", maxWidth: { xs: 360, sm: 420, md: 520 } }}
          >
            <Button
              variant="contained"
              disableElevation
              component={motion.button}
              whileHover={{ scale: 1.03 }}
              sx={{
                width: "100%",
                minHeight: { xs: 56, md: 64 },
                bgcolor: "#f5ede5",
                color: "black",
                fontWeight: 700,
                px: { xs: 5, md: 7 },           // padding มากขึ้นให้ทรงแคปซูลสมส่วน
                letterSpacing: "0.35em",
                textAlign: "center",
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                borderRadius: "9999px",         // << แคปซูล
                border: "1px solid #e5dbcf",    // เส้นขอบจางๆ
                "&:hover": { bgcolor: "#e5dbcf" }
              }}
            >
              {item.title}
            </Button>

            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                textAlign: "center",
                letterSpacing: "0.2em",
                fontSize: { xs: "0.9rem", md: "1rem" },
                opacity: 0.9,
              }}
            >
              {item.subtitle}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
