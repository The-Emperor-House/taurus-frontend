'use client';

import { useEffect, useMemo, useState } from 'react';
import { Box, Card, CardActionArea, Skeleton } from '@mui/material';
import Image from 'next/image';

export default function GridCard({ data, onClick }) {
  const [loaded, setLoaded] = useState(false);
  const srcCandidate = useMemo(() => {
    return (
      data?.coverUrl ||
      data?.imageUrl ||
      data?.images?.[0]?.imageUrl ||
      data?.image ||
      '/images/default-data.jpg'
    );
  }, [data]);

  const [imgSrc, setImgSrc] = useState(srcCandidate);
  useEffect(() => setImgSrc(srcCandidate), [srcCandidate]);

  return (
    <Card
      elevation={0}
      sx={{ width: '100%', borderRadius: 0, boxShadow: 'none', overflow: 'hidden' }}
      onClick={() => onClick?.(data)}
    >
      <CardActionArea sx={{ p: 0 }}>
        <Box sx={{ position: 'relative', width: '100%' }}>
          <Box sx={{ pt: { xs: '60%', md: '56.25%' } }} />
          {!loaded && (
            <Skeleton variant="rectangular" sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
          )}
          <Image
            src={imgSrc}
            alt={data?.name || data?.title || 'project'}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            unoptimized
            onLoad={() => setLoaded(true)}
            onError={() => {
              if (imgSrc !== '/images/default-data.jpg') {
                setImgSrc('/images/default-data.jpg');
              }
            }}
            priority={false}
          />
        </Box>
      </CardActionArea>
    </Card>
  );
}
