'use client';

import { Box, Grid, Typography, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import { motion } from 'framer-motion';

const mockArchitectural = [
  { id: 1, title: 'Perspective 3D', img: '/mock/arch1.jpg' },
  { id: 2, title: 'Perspective 3D', img: '/mock/arch2.jpg' },
  { id: 3, title: 'Perspective 3D', img: '/mock/arch3.jpg' },
];

export default function ArchitecturalPage() {
  return (
    <Box sx={{ px: 2, py: 4, maxWidth: '1200px', mx: 'auto' }}>
      <Typography variant="h4" fontWeight="light" textAlign="center" mb={4}>
        ARCHITECTURAL DESIGN
      </Typography>

      <Grid container spacing={4}>
        {mockArchitectural.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.img}
                    alt={item.title}
                  />
                  <CardContent>
                    <Typography variant="subtitle2" textAlign="center">
                      {item.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
