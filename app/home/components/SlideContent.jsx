"use client";

import { Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import ResponsiveDivider from "@/app/home/components/ResponsiveDivider";

const fadeVariant = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1, delay, ease: "easeInOut" },
});

export default function SlideContent() {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        maxWidth: { xs: '100%', sm: '90%', md: '80%' },
        mx: 'auto',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
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
            fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
            color: "#cc8f2a",
            textShadow: "2px 2px 2px rgba(0, 0, 0, 1)",
            letterSpacing: { xs: "0.1rem", sm: "0.2rem", md: "0.3rem" },
          }}
        >
          TAURUS:
        </Typography>

        <Typography
          variant="h2"
          sx={{
            fontWeight: 300,
            fontSize: { xs: "1.5rem", sm: "2.5rem", md: "3.5rem" },
            color: "#ffffff",
            textShadow: "2px 2px 2px rgba(0, 0, 0, 1)",
            letterSpacing: { xs: "0.2rem", sm: "0.4rem", md: "0.6rem" },
            mt: 1,
          }}
        >
          WE RENEW
        </Typography>

        <Box className="col-span-1 md:flex items-center justify-center">
          <ResponsiveDivider />
        </Box>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 100,
            fontSize: { xs: "1.2rem", sm: "1.8rem", md: "2.5rem" },
            color: "#fdfdfd",
            textShadow: "2px 2px 2px rgba(0, 0, 0, 1)",
            letterSpacing: { xs: "0.1rem", sm: "0.2rem", md: "0.3rem" },
            mt: { xs: 1.5, sm: 2 },
            whiteSpace: 'nowrap',
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
              opacity: 0.9,
              color: "#ffffffff",
              textShadow: "1px 1px 1px rgba(0, 0, 0, 1)",
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
