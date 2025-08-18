"use client";

import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Grid";

import FooterLogo from "./footer/FooterLogo";
import HeadOffice from "./footer/HeadOffice";
import ShowroomAndSocial from "./footer/ShowroomAndSocial";
import ResponsiveDivider from "./footer/ResponsiveDivider";

export default function Footer() {
  const logoSrc = "/navbar/logo webp/taurusWhite.webp";

  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 4, md: 5 },
        bgcolor: "#404040",
        color: "#fff",
        "& a": { color: "#fff", textDecoration: "none" },
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={{ xs: 3, md: 4 }}
          alignItems="center"
          sx={{ flexWrap: { xs: "wrap", md: "nowrap" } }}
        >
          {/* Logo */}
          <Grid size={{ xs: 12, md: 2 }} offset={{ xs: 0, md: 0 }}>
            <FooterLogo src={logoSrc} />
          </Grid>

          {/* Head Office */}
          <Grid size={{ xs: 12, md: "auto" }} sx={{ pl: { md: 2 } }}>
            <HeadOffice />
          </Grid>

          {/* Divider (vertical on desktop / horizontal on mobile) */}
          <ResponsiveDivider />

          {/* Showroom + Social */}
          <Grid size={{ xs: 12, md: "auto" }} sx={{ pr: { md: 1 } }}>
            <ShowroomAndSocial />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
