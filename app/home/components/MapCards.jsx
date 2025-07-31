'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Box, Typography, Skeleton } from '@mui/material';
import { motion } from 'framer-motion';

export default function MapCards() {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Left: Team Image */}
      <div
        className="relative overflow-hidden rounded-3xl"
        style={{ height: "70vh" }}
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full h-full"
        >
          <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image
              src="/home/team/104096.webp"
              alt="Taurus Team"
              fill
              priority={false}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center rounded-3xl"
            />
          </Box>
        </motion.div>
      </div>

      {/* Right: Google Map */}
        <div
          className="relative overflow-hidden rounded-3xl"
          style={{ height: "70vh" }}
        >
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full h-full"
        >
          <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
            {!mapLoaded && (
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bgcolor: 'grey.300',
                  zIndex: 1,
                }}
              />
            )}
            <iframe
              title="Emperor House Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242.07300574276522!2d100.6055748477894!3d13.888895372048676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e282bda8af42d7%3A0xcf30461c6ca7347e!2z4LiU4Li0IOC5gOC4reC5h-C4oeC5gOC4nuC4reC5gOC4o-C5iOC4reC4o-C5jCDguYDguK7guYnguLLguKrguYwgVGhlIEVtcGVyb3IgSG91c2UgQ28uLEx0ZA!5e0!3m2!1sth!2sth!4v1751340363165!5m2!1sth!2sth"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="border-0 w-full h-full absolute top-0 left-0"
              onLoad={() => setMapLoaded(true)}
            />
            <noscript>
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  bgcolor: 'rgba(0,0,0,0.7)',
                  p: 2,
                  borderRadius: 1,
                }}
              >
                <Typography variant="body2" color="white">
                  โปรดเปิด JavaScript เพื่อดูแผนที่
                </Typography>
              </Box>
            </noscript>
          </Box>
        </motion.div>
        </div>
      </div>
  );
}