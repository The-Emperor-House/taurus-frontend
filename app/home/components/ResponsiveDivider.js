import { Box, Divider } from "@mui/material";

export default function ResponsiveDivider() {
  return (
    <Box
      sx={{
        display: { xs: "block", md: "flex" },
        alignItems: "center",
        justifyContent: "center",
        mx: 2,
        my: { xs: 2, md: 0 },
        height: { xs: 'auto', md: '100%' },
        py: { xs: 0, md: 2 },
        px: { xs: 2, md: 0 },
      }}
    >
      {/* Horizontal Divider for mobile */}
      <Box sx={{ display: { xs: "block", md: "none" }, width: '100%' }}>
        <Divider sx={{ borderColor: 'rgba(0,0,0,0.1)' }} />
      </Box>

      {/* Vertical Divider for desktop */}
      <Box sx={{ display: { xs: "none", md: "flex" }, height: '100%' }}>
        <Divider orientation="vertical" flexItem sx={{ borderColor: 'rgba(0,0,0,0.1)' }} />
      </Box>
    </Box>
  );
}