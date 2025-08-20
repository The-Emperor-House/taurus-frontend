"use client";

import {
  Dialog,
  DialogContent,
  Stack,
  CircularProgress,
  Typography,
} from "@mui/material";

/**
 * LoadingDialog
 * - blocking: true จะกันปิดจาก backdrop/ESC (ค่าเริ่มต้น)
 * - onClose: ใช้เมื่ออยากปล่อยให้ผู้ใช้ปิดเอง (ตั้ง blocking={false})
 * - size: ขนาดวงกลมโหลด (28 by default)
 */
export default function LoadingDialog({
  open,
  text = "Loading...",
  blocking = true,
  onClose,
  size = 28,
}) {
  const handleClose = (event, reason) => {
    if (blocking && (reason === "backdropClick" || reason === "escapeKeyDown")) return;
    onClose?.(event, reason);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      keepMounted
      PaperProps={{ sx: { p: 3, borderRadius: 3 } }}
      sx={{
        "& .MuiBackdrop-root": { backdropFilter: "blur(2px)" },
      }}
    >
      <DialogContent>
        <Stack direction="row" alignItems="center" spacing={2}>
          <CircularProgress size={size} />
          <Typography color="text.secondary">{text}</Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
