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
        mb={3}
        sx={{ letterSpacing: '0.4rem' }}
      >
        OUR SERVICE
      </Typography>

      <Stack spacing={3} alignItems="center" width="100%">
        {servicesMain.map((item, idx) => (
          <Stack
            key={idx}
            spacing={1}
            alignItems="center"
            sx={{ width: "100%", maxWidth: 300 }}
          >
            <Button
              variant="contained"
              disableElevation
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              sx={{
                width: "100%",
                minHeight: 48,
                bgcolor: "#f5ede5",
                color: "black",
                fontWeight: "bold",
                borderRadius: 10,
                px: 4,
                letterSpacing: "0.35em",
                textAlign: "center",
                "&:hover": { bgcolor: "#e5dbcf" },
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
