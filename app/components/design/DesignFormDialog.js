"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  InputLabel,
  Slide,
  Snackbar,
  Alert,
  CircularProgress,
  IconButton,
  Box,
  Typography
} from "@mui/material";
import { useRef, forwardRef, useState } from "react";
import Image from "next/image";
import { Delete } from "@mui/icons-material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DesignFormDialog({ open, onClose, onSubmit, formData, setFormData, isEditing, onSuccess }) {
  const coverInputRef = useRef(null);
  const imagesInputRef = useRef(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [previewCover, setPreviewCover] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);

  const handleFilePreview = (e, setPreview) => {
    const files = e.target.files;
    if (!files?.length) return;
    const previews = Array.from(files).map(file => URL.createObjectURL(file));
    setPreview(previews);
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.type.trim()) errs.type = "Type is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    const form = new FormData();
    form.append("name", formData.name);
    form.append("type", formData.type);
    if (coverInputRef.current?.files[0]) {
      form.append("cover", coverInputRef.current.files[0]);
    }
    if (imagesInputRef.current?.files?.length) {
      Array.from(imagesInputRef.current.files).forEach((file) => {
        form.append("images", file);
      });
    }
    await onSubmit(form);
    setLoading(false);
    setSnackbarOpen(true);
    onSuccess?.();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" TransitionComponent={Transition} keepMounted>
        <DialogTitle>{isEditing ? "Edit Design" : "Add New Design"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={Boolean(errors.name)}
            helperText={errors.name}
            fullWidth
          />
          <TextField
            select
            label="Type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            error={Boolean(errors.type)}
            helperText={errors.type}
            fullWidth
          >
            <MenuItem value="ARCHITECTURAL">ARCHITECTURAL</MenuItem>
            <MenuItem value="INTERIOR">INTERIOR</MenuItem>
          </TextField>

          <InputLabel shrink>Cover Image</InputLabel>
          <input
            type="file"
            ref={coverInputRef}
            accept="image/*"
            onChange={(e) => handleFilePreview(e, setPreviewCover)}
          />
          {previewCover && (
            <Box mt={1}>
              <Image src={previewCover[0]} alt="cover" width={200} height={120} style={{ borderRadius: 8 }} />
            </Box>
          )}

          <InputLabel shrink>Additional Images</InputLabel>
          <input
            type="file"
            ref={imagesInputRef}
            accept="image/*"
            multiple
            onChange={(e) => handleFilePreview(e, setPreviewImages)}
          />
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {previewImages.map((src, i) => (
              <Box key={i} position="relative">
                <Image src={src} alt={`preview-${i}`} width={100} height={80} style={{ borderRadius: 6 }} />
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={loading} startIcon={loading && <CircularProgress size={18} />}>
            {isEditing ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
        <Alert severity="success" sx={{ width: "100%" }}>
          {isEditing ? "Design updated successfully!" : "Design created successfully!"}
        </Alert>
      </Snackbar>
    </>
  );
}
