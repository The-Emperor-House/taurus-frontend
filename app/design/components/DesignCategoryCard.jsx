'use client';

import { Typography, Card, CardActionArea, CardContent, Box, Skeleton } from '@mui/material';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';


const overlayVariants = {
  initial: { opacity: 0 },
  hover: { opacity: 1 },
};

const cardRevealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function DesignCategoryCard({
  title,
  image,
  link,
  index = 0,
}) {
  const [loadingImage, setLoadingImage] = useState(true);

  return (
    <motion.div
      variants={cardRevealVariants}
      initial="hidden"
      animate="visible"
      transition={{
        delay: index * 0.15,
        duration: 0.6,
        ease: 'easeOut',
        type: 'spring',
        stiffness: 200,
        damping: 20,
      }}
      whileHover={{ scale: 1.03 }}
      style={{
        width: '100%',
        maxWidth: 500,
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Card
        sx={{
          borderRadius: '12px',
          overflow: 'hidden',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.paper',
          boxShadow: 'none',
        }}
      >
        <Link href={link} passHref style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <CardActionArea sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Image Layer: ใช้ Box เพื่อกำหนดขนาดและตำแหน่งของรูปภาพ */}
            <Box sx={{ position: 'relative', width: '100%', paddingTop: '60%' }}> {/* ใช้ paddingTop เพื่อรักษาสัดส่วน 5:3 (Height = 60% of Width) */}
              {loadingImage && (
                <Skeleton
                  variant="rectangular"
                  sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                />
              )}
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
                className={`transition-opacity duration-500 ${loadingImage ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => setLoadingImage(false)}
                priority={index === 0}
              />

              {/* Overlay (เฉพาะ darken เมื่อ Hover) */}
              <motion.div
                variants={overlayVariants} // ใช้ variants ที่กำหนดไว้ด้านบน
                initial="initial"
                whileHover="hover"
                whileTap="hover" // ทำให้ Mobile Tap มี Effect เหมือน Hover
                transition={{ duration: 0.3, ease: 'easeOut' }}
                sx={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0,0,0,0.0)', // เริ่มต้นโปร่งใส
                  zIndex: 2, // อยู่เหนือรูปภาพ
                }}
              />
            </Box>

            {/* CardContent: สำหรับข้อความ Title ที่อยู่ด้านล่างรูปภาพ */}
            <CardContent
              sx={{
                flexGrow: 1, // ทำให้ CardContent ขยายเต็มพื้นที่ที่เหลือใน Card
                display: 'flex',
                alignItems: 'center', // จัดกึ่งกลาง Title ในแนวตั้ง
                justifyContent: 'center', // จัดกึ่งกลาง Title ในแนวนอน
                minHeight: '80px', // กำหนดความสูงขั้นต่ำเพื่อให้ Title ไม่เล็กเกินไป
                py: 2, // Padding บน-ล่าง
                px: 2, // Padding ซ้าย-ขวา
              }}
            >
              <Typography
                variant="h6" // ใช้ h6 สำหรับ Title
                textAlign="center"
                sx={{ fontWeight: 'bold', color: 'text.primary' }} // Style ข้อความ Title
              >
                {title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    </motion.div>
  );
}