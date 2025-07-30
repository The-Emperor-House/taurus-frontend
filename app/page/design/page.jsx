'use client';

import {
  Box,
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from '@mui/material';
import Link from 'next/link';
import { motion } from 'framer-motion';

const designCategories = [
  {
    id: 'architectural',
    title: 'ARCHITECTURAL DESIGN',
    image: '/mock/architectural-cover.jpg',
    link: '/design/architectural',
  },
  {
    id: 'interior',
    title: 'INTERIOR DESIGN',
    image: '/mock/interior-cover.jpg',
    link: '/design/interior',
  },
];

export default function DesignLanding() {
  return (
    <Box sx={{ px: 2, py: 6, maxWidth: '1200px', mx: 'auto' }}>
      {/* <Typography variant="h4" fontWeight="light" textAlign="center" mb={4}>
        DESIGN
      </Typography> */}

      <Grid container spacing={4} justifyContent="center">
        {designCategories.map((cat, index) => (
          <Grid
            key={cat.id}
            size={{ xs: 12, sm: 6, md: 4 }}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6, ease: 'easeOut' }}
              style={{ width: '100%', maxWidth: 350, height: '100%' }}
              whileHover={{ scale: 1.05 }}
            >
              <Link href={cat.link} passHref>
                <Card
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: 'background.paper',
                    boxShadow: 6,
                    transition: 'box-shadow 0.3s',
                    '&:hover': { boxShadow: 12 },
                  }}
                >
                  <CardActionArea sx={{ flex: 1 }}>
                    <CardMedia
                      component="img"
                      height="240"
                      image={cat.image}
                      alt={cat.title}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
                      <Typography
                        variant="h6"
                        textAlign="center"
                        sx={{ fontWeight: 'bold', color: 'text.primary' }}
                      >
                        {cat.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
