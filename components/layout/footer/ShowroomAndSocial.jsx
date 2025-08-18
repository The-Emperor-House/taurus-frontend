import { Box, Typography } from "@mui/material";
import { FaMapMarkerAlt, FaLine, FaMailBulk, FaFacebookF, FaTiktok } from "react-icons/fa";
import SocialIcon from "./SocialIcon";
import SectionTitle from "./SectionTitle";

const hoverPrimaryMd = {
  transition: (t) =>
    t.transitions.create("color", { duration: t.transitions.duration.shorter }),
  "&:hover": { color: { xs: "inherit", md: "primary.main" } },
};

export default function ShowroomAndSocial() {
  return (
    <Box>
      <SectionTitle icon={<FaMapMarkerAlt size={18} />}>Showroom :</SectionTitle>

      <Typography
        variant="body1"
        sx={{
          color: "rgba(255,255,255,0.9)",
          fontSize: { xs: "0.98rem", md: "1.05rem" },
          lineHeight: 1.7,
          textAlign: { xs: "center", md: "left" },
        }}
      >
        189/9-10 Ratchada-Ramintra Rd.
        <br />
        Nuanchan , Buengkum , Bangkok 10240
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
        <SocialIcon href="https://line.me/ti/p/~salestaurus" label="Line">
          <FaLine />
        </SocialIcon>

        <SocialIcon href="mailto:taurus@emperorhouse.com" label="Email">
          <FaMailBulk />
        </SocialIcon>

        <Typography
          variant="body1"
          sx={{
            mx: 1,
            color: "rgba(255,255,255,0.9)",
            letterSpacing: "0.02rem",
            textAlign: { xs: "center", md: "left" },
            ...hoverPrimaryMd,
          }}
        >
          ติดตามผลงานเพิ่มเติมของเราได้ที่
        </Typography>

        <SocialIcon href="https://facebook.com/TaurusByEmperor" label="Facebook">
          <FaFacebookF />
        </SocialIcon>

        <SocialIcon href="https://www.tiktok.com/@taurus.by.emperor" label="TikTok">
          <FaTiktok />
        </SocialIcon>

        <Typography
          variant="body1"
          sx={{
            ml: 1,
            color: "rgba(255,255,255,0.9)",
            whiteSpace: "nowrap",
            textAlign: { xs: "center", md: "left" },
            ...hoverPrimaryMd,
          }}
        >
          Taurus
        </Typography>
      </Box>
    </Box>
  );
}
