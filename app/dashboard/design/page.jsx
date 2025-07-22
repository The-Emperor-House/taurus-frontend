'use client';

import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

const mockArchitectural = [
  { id: 1, title: 'House A', img: '/mock/arch1.jpg' },
  { id: 2, title: 'Villa B', img: '/mock/arch2.jpg' },
];

const mockInterior = [
  { id: 1, title: 'Living Room', img: '/mock/interior1.jpg' },
  { id: 2, title: 'Office Space', img: '/mock/interior2.jpg' },
];

export default function DashboardDesign() {
  return (
    <Box sx={{ px: 2, py: 4, maxWidth: '1400px', mx: 'auto' }}>
      <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
        Dashboard: Design Management
      </Typography>

      <SectionBlock title="Architectural Design" items={mockArchitectural} />
      <Box my={4} />
      <SectionBlock title="Interior Design" items={mockInterior} />
    </Box>
  );
}

function SectionBlock({ title, items }) {
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} color="primary">
          Add New
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {items.map((item, index) => (
          <Grid
            key={item.id}
            size={{ xs: 12, sm: 6, md: 4 }}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{ width: '100%', maxWidth: 350 }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  boxShadow: 4,
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={item.img}
                  alt={item.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {item.title}
                  </Typography>
                </CardContent>
                <Stack direction="row" spacing={1} p={2} justifyContent="flex-end">
                  <Button variant="outlined" size="small" startIcon={<EditIcon />}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="error" size="small" startIcon={<DeleteIcon />}>
                    Delete
                  </Button>
                </Stack>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
