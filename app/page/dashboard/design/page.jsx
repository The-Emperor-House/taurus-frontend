"use client";

import { useEffect, useState, useRef } from "react";
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
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";

export default function DashboardDesign() {
  const [architectural, setArchitectural] = useState([]);
  const [interior, setInterior] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({ id: null, name: "", type: "ARCHITECTURAL" });
  const [isEditing, setIsEditing] = useState(false);
  const coverInputRef = useRef(null);
  const imagesInputRef = useRef(null);

  const fetchDesigns = async () => {
    try {
      const session = await import("next-auth/react").then((mod) => mod.getSession());
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/designs`, {
        headers: {
          Authorization: `Bearer ${session?.backendToken}`,
        },
      });
      const data = await res.json();
      const arch = data.filter((d) => d.type === "ARCHITECTURAL");
      const inter = data.filter((d) => d.type === "INTERIOR");
      setArchitectural(arch);
      setInterior(inter);
    } catch (err) {
      console.error("Failed to load designs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDesigns();
  }, []);

  const handleOpenAdd = () => {
    setFormData({ id: null, name: "", type: "ARCHITECTURAL" });
    setIsEditing(false);
    setOpenForm(true);
  };

  const handleEdit = (item) => {
    setFormData(item);
    setIsEditing(true);
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this design?")) return;
    try {
      const session = await import("next-auth/react").then((mod) => mod.getSession());
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/designs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session?.backendToken}`,
        },
      });
      fetchDesigns();
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  const handleSubmit = async () => {
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

    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/designs/${formData.id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/designs`;

    try {
      const session = await import("next-auth/react").then((mod) => mod.getSession());
      await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${session?.backendToken}`,
        },
        body: form,
      });
      setOpenForm(false);
      fetchDesigns();
    } catch (err) {
      console.error("Failed to submit:", err);
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

      <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth maxWidth="sm">
        <DialogTitle>{isEditing ? "Edit Design" : "Add New Design"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
          />
          <TextField
            select
            label="Type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            fullWidth
          >
            <MenuItem value="ARCHITECTURAL">ARCHITECTURAL</MenuItem>
            <MenuItem value="INTERIOR">INTERIOR</MenuItem>
          </TextField>

          <InputLabel shrink>Cover Image</InputLabel>
          <input type="file" ref={coverInputRef} accept="image/*" />

          <InputLabel shrink>Additional Images</InputLabel>
          <input type="file" ref={imagesInputRef} accept="image/*" multiple />
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
              style={{ width: "100%", maxWidth: 350 }}
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
                    <CardContent>
                      <Skeleton width="60%" />
                    </CardContent>
                  </>
                ) : (
                  <>
                    <CardMedia
                      component="img"
                      height="180"
                      image={item.coverUrl || "/no-image.jpg"}
                      alt={item.name}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {item?.name || <Skeleton width="60%" />}
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
