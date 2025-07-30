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
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon, // Added CloseIcon for image removal
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
    coverUrl: "", // For displaying current cover in edit mode
  });
  const [isEditing, setIsEditing] = useState(false);

  const coverInputRef = useRef(null);
  const imagesInputRef = useRef(null);

  // State for previewing selected images (cover + additional)
  const [coverPreview, setCoverPreview] = useState(null);
  const [imagesPreview, setImagesPreview] = useState([]);

  // Fetch designs from the API
  const fetchDesigns = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const session = await import("next-auth/react").then((mod) =>
        mod.getSession()
      );
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/designs`, {
        headers: {
          Authorization: `Bearer ${session?.backendToken}`,
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      const arch = data.filter((d) => d.type === "ARCHITECTURAL");
      const inter = data.filter((d) => d.type === "INTERIOR");
      setArchitectural(arch);
      setInterior(inter);
    } catch (err) {
      console.error("Failed to load designs:", err);
      // Optionally, display an error message to the user
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch designs on component mount
  useEffect(() => {
    fetchDesigns();
  }, []);

  // Effect to manage image previews when the form is opened/closed or formData changes
  useEffect(() => {
    if (openForm) {
      setCoverPreview(isEditing && formData.coverUrl ? formData.coverUrl : null);
      setImagesPreview(formData.images ? formData.images.map((img) => img.imageUrl) : []);
      if (coverInputRef.current) coverInputRef.current.value = null;
      if (imagesInputRef.current) imagesInputRef.current.value = null;
    }
  }, [openForm, formData.coverUrl, formData.images, isEditing]);

  const handleOpenAdd = () => {
    setFormData({ id: null, name: "", type: "ARCHITECTURAL", coverUrl: "" });
    setIsEditing(false);
    setOpenForm(true);
  };

  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      name: item.name,
      type: item.type,
      coverUrl: item.coverUrl || "",
      images: item.images || [],
    });
    setCoverPreview(item.coverUrl || null);
    setImagesPreview(item.images || []);
    setIsEditing(true);
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this design?")) return;
    try {
      const session = await import("next-auth/react").then((mod) =>
        mod.getSession()
      );
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/designs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session?.backendToken}`,
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      fetchDesigns(); // Re-fetch designs after successful deletion
    } catch (err) {
      console.error("Failed to delete design:", err);
      // Optionally, display an error message to the user
    }
  };

  // Handle new cover image selection for preview
  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverPreview(URL.createObjectURL(file));
    } else {
      // If no file selected, revert to previous coverUrl if editing, or clear
      setCoverPreview(isEditing && formData.coverUrl ? formData.coverUrl : null);
    }
  };

  // Handle new additional images selection for preview
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setImagesPreview((prev) => [...prev, ...newPreviews]);
    } else {
      setImagesPreview([]);
    }
  };

  // Remove selected cover image preview and clear the file input
  const handleRemoveCover = () => {
    setCoverPreview(null);
    if (coverInputRef.current) {
      coverInputRef.current.value = null; // Clear the file input
    }
  };

  // Remove a specific additional image preview and update the file input's files
  const handleRemoveImage = (indexToRemove) => {
    setImagesPreview((prev) => prev.filter((_, i) => i !== indexToRemove));

    // Also update the actual files in the input element
    if (imagesInputRef.current) {
      const dataTransfer = new DataTransfer();
      Array.from(imagesInputRef.current.files)
        .filter((_, i) => i !== indexToRemove)
        .forEach((file) => dataTransfer.items.add(file));
      imagesInputRef.current.files = dataTransfer.files;
    }
  };

  // Handle form submission (create or update)
  const handleSubmit = async () => {
    const form = new FormData();
    form.append("name", formData.name);
    form.append("type", formData.type);

    // Only append cover if a new one is selected
    if (coverInputRef.current?.files[0]) {
      form.append("cover", coverInputRef.current.files[0]);
    }

    // Append all selected additional images
    if (imagesInputRef.current?.files?.length) {
      Array.from(imagesInputRef.current.files).forEach((file) => {
        form.append("images", file);
      });
    }

    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/designs/${formData.id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/designs`;

    try {
      const session = await import("next-auth/react").then((mod) =>
        mod.getSession()
      );
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${session?.backendToken}`,
        },
        body: form,
      });

      if (!res.ok) {
        // You might want to parse the error response from your API
        const errorData = await res.json();
        throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
      }
      setOpenForm(false);
      fetchDesigns(); // Re-fetch designs after successful submission
    } catch (err) {
      console.error("Failed to submit design:", err);
      // Optionally, display an error message to the user (e.g., using a Snackbar)
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
      {/* Spacer between sections */}
      <Box my={4} />
      <SectionBlock
        title="Interior Design"
        items={interior}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleOpenAdd}
      />

      {/* Design Add/Edit Dialog */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth maxWidth="sm">
        <DialogTitle>{isEditing ? "Edit Design" : "Add New Design"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
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

          <InputLabel shrink htmlFor="cover-image-upload">
            Cover Image
          </InputLabel>
          <input
            type="file"
            id="cover-image-upload"
            ref={coverInputRef}
            accept="image/*"
            onChange={handleCoverChange}
          />
          {coverPreview && (
            <Box
              sx={{
                position: "relative",
                width: 200,
                height: 120,
                mt: 1,
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
          )}

          <InputLabel shrink sx={{ mt: 2 }} htmlFor="additional-images-upload">
            Additional Images
          </InputLabel>
          <input
            type="file"
            id="additional-images-upload"
            ref={imagesInputRef}
            accept="image/*"
            multiple
            onChange={handleImagesChange}
          />
          {imagesPreview.length > 0 && (
            <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
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
            </Stack>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {isEditing ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

// SectionBlock component for displaying design categories
function SectionBlock({ title, items, loading, onEdit, onDelete, onAdd }) {
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
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
              style={{ width: "100%", maxWidth: 350 }}
            >
              <Card
                sx={{
                  height: "100%", // Make card fill the height of its parent motion.div
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
                    <Stack direction="row" spacing={1} p={2} justifyContent="flex-end">
                      <Skeleton variant="rectangular" width={70} height={30} />
                      <Skeleton variant="rectangular" width={70} height={30} />
                    </Stack>
                  </>
                ) : (
                  <>
                    <CardMedia
                      component="img"
                      height="180"
                      image={item.coverUrl || "/no-image.jpg"} // Fallback image
                      alt={item.name}
                      sx={{ objectFit: "cover" }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {item.name}
                      </Typography>
                    </CardContent>
                    <Stack direction="row" spacing={1} p={2} justifyContent="flex-end">
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