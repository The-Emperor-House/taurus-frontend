"use client";

import { Dialog, DialogContent, Stack, CircularProgress, Typography } from "@mui/material";

export default function LoadingDialog({ open, text = "Loading..." }) {
  return (
    <Dialog open={open} PaperProps={{ sx: { p: 3 } }}>
      <DialogContent>
        <Stack direction="row" alignItems="center" spacing={2}>
          <CircularProgress size={28} />
          <Typography>{text}</Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
