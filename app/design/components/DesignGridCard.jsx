'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Skeleton,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function DesignGridCard({ design, onClick }) {
  const [loadingImage, setLoadingImage] = useState(true);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <Card
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: 3,
          transition: 'box-shadow 0.3s',
          '&:hover': { boxShadow: 6 },
        }}
        onClick={() => onClick(design)}
      >
        <CardActionArea sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ position: 'relative', width: '100%', height: 200, overflow: 'hidden' }}>
            {loadingImage && (
              <Skeleton variant="rectangular" sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
            )}
            <Image
              src={design.coverUrl}
              alt={design.name}
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              className={`transition-opacity duration-500 ${loadingImage ? 'opacity-0' : 'opacity-100'}`}
              onLoad={() => setLoadingImage(false)}
              priority={false}
            />
          </Box>

          <CardContent sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
            <Typography variant="subtitle1" textAlign="center" sx={{ fontWeight: 'medium' }}>
              {design.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </motion.div>
  );
}