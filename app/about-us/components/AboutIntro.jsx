"use client";

import { Container, Box, Typography } from "@mui/material";
import { ABOUT_INTRO_TITLE, ABOUT_INTRO_TEXT } from "../_data/aboutIntro";

export default function AboutIntro() {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
      <Box sx={{ textAlign: "center", maxWidth: 800, mx: "auto" }}>
        <Typography
          variant="h5"
          color="primary"
          fontWeight="bold"
          sx={{ mb: 2, letterSpacing: "0.1em" }}
        >
          {ABOUT_INTRO_TITLE}
        </Typography>
        <Typography variant="body1" color="#ab9685" lineHeight={1.8}>
          {ABOUT_INTRO_TEXT}
        </Typography>
      </Box>
    </Container>
  );
}
