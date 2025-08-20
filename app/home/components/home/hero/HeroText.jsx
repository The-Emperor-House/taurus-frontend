"use client";

import { Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

const fadeVariant = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1, delay, ease: "easeInOut" },
});

export default function HeroText() {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        maxWidth: { xs: "100%", sm: "90%", md: "80%" },
        mx: "auto",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* กลุ่มข้อความบน ชิดซ้าย */}
      {/* กลุ่มข้อความบน ชิดซ้าย */}
      <motion.div
        variants={fadeVariant(0)}
        initial="initial"
        animate="animate"
        style={{
          position: "absolute",
          top: "50%",
          left: "5%",
          transform: "translateY(-50%)",
          maxWidth: "40%",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: 600,
            fontSize: { xs: "3rem", sm: "4rem", md: "6rem" },
            color: "#cc8f2a",
            textShadow: "0px 4px 12px rgba(0, 0, 0, 0.8)",
            letterSpacing: { xs: "0.1rem", sm: "0.2rem", md: "1rem" },
          }}
        >
          TAURUS:
        </Typography>

        <Typography
          variant="h2"
          sx={{
            fontWeight: 100,
            fontSize: { xs: "1.9rem", sm: "3rem", md: "3.5rem", lg: "5rem" },
            color: "#ffffff",
            textShadow: "0px 4px 12px rgba(0, 0, 0, 0.8)",
            letterSpacing: { xs: "0.1rem", sm: "0.2rem", md: "0.8rem" },
            mt: 1,
          }}
        >
          WE RENEW
        </Typography>

        {/* เส้นบางสีขาว */}
        <Box
          sx={{
            width: { xs: "100%", sm: "100%", md: "100%" },
            height: "2px",
            background: "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.8), rgba(255,255,255,0))",
            mt: 1,
          }}
        />

        <Typography
          variant="h3"
          sx={{
            fontWeight: 100,
            fontSize: { xs: "0.9rem", sm: "1.1rem", md: "1.2rem" }, // เล็กมาก
            color: "#fdfdfd",
            textShadow: "0px 4px 12px rgba(0, 0, 0, 0.8)",
            letterSpacing: { xs: "0.1rem", sm: "0.2rem", md: "0.3rem" },
            mt: { xs: 1.5, sm: 2 },
            whiteSpace: "nowrap",
          }}
        >
          "สร้างบ้านหลังใหม่ ในที่อยู่อาศัยเดิมของคุณ"
        </Typography>
      </motion.div>

      {/* ข้อความล่างสุด อยู่กึ่งกลางล่าง */}
      <motion.div variants={fadeVariant(1)} initial="initial" animate="animate">
        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            width: { xs: "90%", sm: "80%", md: "70%" },
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: 300,
              fontSize: { xs: "1rem", sm: "1.3rem", md: "1.6rem" },
              opacity: 0.3,
              color: "#ffffffff",
              textShadow: "0px 4px 12px rgba(0, 0, 0, 0.8)",
              letterSpacing: "0.05rem",
            }}
          >
            RECRAFTING SPACES. REVIVING LIVING.
          </Typography>
        </Box>
      </motion.div>
    </Box>
  );
}