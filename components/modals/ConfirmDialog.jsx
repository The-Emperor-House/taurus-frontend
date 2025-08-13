"use client";

import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Typography, Button
} from "@mui/material";

export default function ConfirmDialog({
  open,
  title = "Confirm",
  message = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onClose,
}) {
  return (
    <Dialog open={open} onClose={() => onClose?.(false)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography sx={{ mt: .5 }}>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose?.(false)}> {cancelText} </Button>
        <Button variant="contained" color="error" onClick={() => onClose?.(true)}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
