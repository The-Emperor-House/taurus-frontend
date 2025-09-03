import { Box, Typography } from "@mui/material";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import SectionTitle from "./SectionTitle";


export default function HeadOffice() {
  return (
    <Box>
      <SectionTitle icon={<IoLocationSharp size={18} />}>Head Office :</SectionTitle>

      <Typography
        variant="body1"
        sx={{
          color: "rgba(255,255,255,0.9)",
          fontSize: { xs: "0.98rem", md: "1.05rem" },
          lineHeight: 1.7,
          textAlign: { xs: "center", md: "left" },
        }}
      >
        288/18 Phaholyothin Rd.
        <br />
        Anusawaree , Bangkhen , Bangkok 10220
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "center", md: "flex-start" },
          gap: 1,
          mt: 1.5,
          flexWrap: "wrap",
        }}
      >
        <FaPhoneAlt />
        <Typography
          variant="body1"
          sx={{
            color: "rgba(255,255,255,0.9)",
            letterSpacing: { xs: "0.08rem", md: "0.18rem" },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          (66) 2 970 3080 - 3
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "center", md: "flex-start" },
          gap: 1,
          mt: 1,
        }}
      >
        <FaPhoneAlt />
        <Typography
          variant="body1"
          sx={{
            color: "rgba(255,255,255,0.9)",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          (66) 61 0596111
        </Typography>
      </Box>
    </Box>
  );
}
