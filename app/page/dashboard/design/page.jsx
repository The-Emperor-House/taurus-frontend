"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  InputLabel,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";

export default function DashboardDesign() {
  const [architectural, setArchitectural] = useState([]);
  const [interior, setInterior] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    type: "ARCHITECTURAL",
    coverUrl: "",
    images: [], // Existing images from backend: { id, imageUrl }
  });
  const [isEditing, setIsEditing] = useState(false);

  // Preview States
  const [coverPreview, setCoverPreview] = useState(null);
  const [imagesPreview, setImagesPreview] = useState([]); // Mixed: existing image URLs + new files as URL
  const [deleteImageIds, setDeleteImageIds] = useState(new Set()); // IDs of images marked for deletion

  // Refs for file inputs
  const coverInputRef = useRef(null);
  const imagesInputRef = useRef(null);

  // Snackbar for feedback
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Fetch all designs from API
  const fetchDesigns = async () => {
    setLoading(true);
    try {
      const { getSession } = await import("next-auth/react");
      const session = await getSession();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/designs`,
        {
          headers: { Authorization: `Bearer ${session?.backendToken}` },
        }
      );
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();

      setArchitectural(data.filter((d) => d.type === "ARCHITECTURAL"));
      setInterior(data.filter((d) => d.type === "INTERIOR"));
    } catch (err) {
      console.error("Failed to load designs:", err);
      setSnackbar({
        open: true,
        message: "Failed to load designs",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDesigns();
  }, []);

  // Open Add Form
  const handleOpenAdd = () => {
    setFormData({
      id: null,
      name: "",
      type: "ARCHITECTURAL",
      coverUrl: "",
      images: [],
    });
    setCoverPreview(null);
    setImagesPreview([]);
    setDeleteImageIds(new Set());
    setIsEditing(false);
    setOpenForm(true);
    resetFileInputs();
  };

  // Open Edit Form
  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      name: item.name,
      type: item.type,
      coverUrl: item.coverUrl || "",
      images: item.images || [], // array of {id, imageUrl}
    });
    setCoverPreview(item.coverUrl || null);
    setImagesPreview(item.images ? item.images.map((img) => img.imageUrl) : []);
    setDeleteImageIds(new Set());
    setIsEditing(true);
    setOpenForm(true);
    resetFileInputs();
  };

  // Reset file inputs manually
  const resetFileInputs = () => {
    if (coverInputRef.current) coverInputRef.current.value = null;
    if (imagesInputRef.current) imagesInputRef.current.value = null;
  };

  // Handle Delete Design
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this design?")) return;
    try {
      const { getSession } = await import("next-auth/react");
      const session = await getSession();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/designs/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${session?.backendToken}` },
        }
      );
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      setSnackbar({
        open: true,
        message: "Design deleted successfully",
        severity: "success",
      });
      fetchDesigns();
    } catch (err) {
      console.error("Failed to delete design:", err);
      setSnackbar({
        open: true,
        message: "Failed to delete design",
        severity: "error",
      });
    }
  };

  // Cover Image Change (preview)
  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) setCoverPreview(URL.createObjectURL(file));
    else setCoverPreview(isEditing ? formData.coverUrl : null);
  };

  // Additional Images Change (preview + accumulate new files)
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setImagesPreview((prev) => [...prev, ...newPreviews]);
    }
  };

  // Remove cover image (clear preview and file input)
  const handleRemoveCover = () => {
    setCoverPreview(null);
    if (coverInputRef.current) coverInputRef.current.value = null;
  };

  // Remove one image from preview (existing or new)
  // For existing image URLs, mark for deletion by id
  // For new files, remove from preview and also from input.files
  const handleRemoveImage = (index) => {
    if (!isEditing) {
      // Simple case: just remove from previews (new images only)
      const updated = imagesPreview.filter((_, i) => i !== index);
      setImagesPreview(updated);
      updateFilesInput(imagesInputRef.current, updated);
      return;
    }

    const urlToRemove = imagesPreview[index];

    // Check if this URL matches an existing image
    const existingImage = formData.images.find(
      (img) => img.imageUrl === urlToRemove
    );

    if (existingImage) {
      // Mark this image id for deletion
      setDeleteImageIds((prev) => new Set(prev).add(existingImage.id));

      // Remove URL from preview
      const updated = imagesPreview.filter((_, i) => i !== index);
      setImagesPreview(updated);
    } else {
      // It's a new uploaded image (preview URL)
      const updated = imagesPreview.filter((_, i) => i !== index);
      setImagesPreview(updated);
      updateFilesInput(imagesInputRef.current, updated);
    }
  };

  // Helper: update input files based on remaining preview URLs (only for new files)
  const updateFilesInput = (inputRef, updatedPreviews) => {
    if (!inputRef?.current) return;
    const dt = new DataTransfer();
    const currentFiles = inputRef.current.files;

    // Filter currentFiles by matching their preview URLs in updatedPreviews
    for (let i = 0; i < currentFiles.length; i++) {
      const file = currentFiles[i];
      const url = URL.createObjectURL(file);
      if (updatedPreviews.includes(url)) {
        dt.items.add(file);
      } else {
        URL.revokeObjectURL(url);
      }
    }
    inputRef.current.files = dt.files;
  };

  // Handle Submit (create/update)
  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      setSnackbar({
        open: true,
        message: "Name is required",
        severity: "warning",
      });
      return;
    }

    const form = new FormData();
    form.append("name", formData.name);
    form.append("type", formData.type);

    // Append cover image only if selected (new)
    if (coverInputRef.current?.files[0]) {
      form.append("cover", coverInputRef.current.files[0]);
    }

    // Append additional images (newly selected)
    if (imagesInputRef.current?.files?.length) {
      Array.from(imagesInputRef.current.files).forEach((file) => {
        form.append("images", file);
      });
    }

    // Append deleteImageIds as comma-separated string (if any)
    if (deleteImageIds.size > 0) {
      form.append("deleteImageIds", Array.from(deleteImageIds).join(","));
    }

    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/designs/${formData.id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/designs`;

    try {
      const { getSession } = await import("next-auth/react");
      const session = await getSession();

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${session?.backendToken}`,
        },
        body: form,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${res.status}`
        );
      }

      setSnackbar({
        open: true,
        message: isEditing
          ? "Design updated successfully"
          : "Design created successfully",
        severity: "success",
      });
      setOpenForm(false);
      fetchDesigns();
    } catch (err) {
      console.error("Failed to submit design:", err);
      setSnackbar({
        open: true,
        message: "Failed to submit design",
        severity: "error",
      });
    }
  };

  return (
    <Box sx={{ px: 2, py: 4, maxWidth: "1400px", mx: "auto" }}>
      <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
        Dashboard: Design Management
      </Typography>

      <SectionBlock
        title="Architectural Design"
        items={architectural}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleOpenAdd}
      />
      <Box my={4} />
      <SectionBlock
        title="Interior Design"
        items={interior}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleOpenAdd}
      />

      <Dialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {isEditing ? "Edit Design" : "Add New Design"}
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
            required
          />
          <TextField
            select
            label="Type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            fullWidth
            required
          >
            <MenuItem value="ARCHITECTURAL">ARCHITECTURAL</MenuItem>
            <MenuItem value="INTERIOR">INTERIOR</MenuItem>
          </TextField>

          {/* Cover Image */}
          <InputLabel shrink sx={{ mt: 2 }}>
            Cover Image
          </InputLabel>
          <input
            type="file"
            accept="image/*"
            ref={coverInputRef}
            onChange={handleCoverChange}
            style={{ display: "none" }}
            id="cover-file-input"
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            {coverPreview ? (
              <Box
                sx={{
                  position: "relative",
                  width: 200,
                  height: 120,
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: 1,
                }}
              >
                <img
                  src={coverPreview}
                  alt="Cover Preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <IconButton
                  size="small"
                  onClick={handleRemoveCover}
                  sx={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    bgcolor: "rgba(0,0,0,0.5)",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                  }}
                >
                  <CloseIcon fontSize="small" sx={{ color: "white" }} />
                </IconButton>
              </Box>
            ) : null}

            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => coverInputRef.current?.click()}
              sx={{ height: 40 }}
            >
              {coverPreview ? "Change Cover" : "Add Cover"}
            </Button>
          </Box>

          {/* Additional Images */}
          <InputLabel shrink sx={{ mt: 2 }}>
            Additional Images
          </InputLabel>
          <input
            type="file"
            accept="image/*"
            multiple
            ref={imagesInputRef}
            onChange={handleImagesChange}
            style={{ display: "none" }}
            id="additional-files-input"
          />
          <Stack
            direction="row"
            spacing={1}
            mt={1}
            flexWrap="wrap"
            alignItems="center"
          >
            {imagesPreview.map((src, index) => (
              <Box
                key={index}
                sx={{
                  position: "relative",
                  width: 100,
                  height: 80,
                  borderRadius: 1,
                  overflow: "hidden",
                  boxShadow: 1,
                }}
              >
                <img
                  src={src}
                  alt={`Preview ${index + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <IconButton
                  size="small"
                  onClick={() => handleRemoveImage(index)}
                  sx={{
                    position: "absolute",
                    top: 2,
                    right: 2,
                    bgcolor: "rgba(0,0,0,0.5)",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                  }}
                >
                  <CloseIcon fontSize="small" sx={{ color: "white" }} />
                </IconButton>
              </Box>
            ))}

            {/* ปุ่ม + สำหรับเพิ่มรูปเพิ่มเติม */}
            <Box
              onClick={() => imagesInputRef.current?.click()}
              sx={{
                cursor: "pointer",
                width: 100,
                height: 80,
                borderRadius: 1,
                border: "2px dashed #ccc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "gray",
                "&:hover": {
                  borderColor: "primary.main",
                  color: "primary.main",
                },
              }}
            >
              <AddIcon fontSize="large" />
            </Box>
          </Stack>
        </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenForm(false)}>Cancel</Button>
            <Button 
              variant="contained" 
              onClick={handleSubmit} 
              disabled={!coverPreview}
            >
              {isEditing ? "Update" : "Create"}
            </Button>
          </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

function SectionBlock({ title, items, loading, onEdit, onDelete, onAdd }) {
  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={onAdd}>
          Add New
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {(loading ? Array.from({ length: 3 }) : items).map((item, index) => (
          <Grid key={item?.id || index} size={{ xs: 12, sm: 6, md: 4 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ width: "100%", maxWidth: 350, margin: "auto" }}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  boxShadow: 4,
                }}
              >
                {loading ? (
                  <>
                    <Skeleton variant="rectangular" height={180} />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Skeleton width="80%" height={24} sx={{ mb: 1 }} />
                      <Skeleton width="60%" height={20} />
                    </CardContent>
                    <Stack
                      direction="row"
                      spacing={1}
                      p={2}
                      justifyContent="flex-end"
                    >
                      <Skeleton variant="rectangular" width={70} height={30} />
                      <Skeleton variant="rectangular" width={70} height={30} />
                    </Stack>
                  </>
                ) : (
                  <>
                    <CardMedia
                      component="img"
                      height="180"
                      image={item.coverUrl || "/no-image.jpg"}
                      alt={item.name}
                      sx={{ objectFit: "cover" }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {item.name}
                      </Typography>
                    </CardContent>
                    <Stack
                      direction="row"
                      spacing={1}
                      p={2}
                      justifyContent="flex-end"
                    >
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => onEdit(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={() => onDelete(item.id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </>
                )}
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
