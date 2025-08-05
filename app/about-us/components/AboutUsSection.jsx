// app/about-us/components/AboutUsSection.jsx
'use client';

import { Box, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import AboutBlock from './AboutBlock';
import ServiceBlock from './ServiceBlock';
import IconListBlock from './IconListBlock';
import CategoryButton from './CategoryButton';
import ResponsiveDivider from './ResponsiveDivider';

// กำหนดรายการบริการ
const servicesList = [
  'สร้างใหม่',
  'ปรับปรุงต่อเติม - ซ่อมแซม',
  'ออกแบบตกแต่งภายใน',
];

// กำหนด Animation Variant
const fadeInUpVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      type: 'spring',
      stiffness: 80,
      damping: 15,
      duration: 1.0,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  }),
};

export default function AboutUsSection() {
  const categories = [
    { name: 'HOME', href: '/' },
    { name: 'CONDOMINIUM', href: '/condominium' },
    { name: 'HOTEL', href: '/hotel' },
    { name: 'OFFICE', href: '/office' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 px-4 md:px-8 lg:px-16">
      {/* 1. ABOUT BLOCK */}
      {/* md:col-span-auto หรือ md:col-span-1 เพื่อให้ AboutBlock ใช้ 1 คอลัมน์ใน Grid 5 คอลัมน์ */}
      <Box className="col-span-1" sx={{ display: 'flex', flexDirection: 'column' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUpVariant}
          custom={1} // Block แรก
          style={{ width: '100%', height: '100%' }}
        >
          <AboutBlock />
        </motion.div>
      </Box>

      {/* Responsive Divider 1 (คอลัมน์ 2 ใน Grid 5 คอลัมน์) */}
      <Box className="col-span-1 md:flex items-center justify-center">
        <ResponsiveDivider />
      </Box>

      {/* 2. SERVICE BLOCK */}
      {/* md:col-span-auto หรือ md:col-span-1 เพื่อให้ ServiceBlock ใช้ 1 คอลัมน์ใน Grid 5 คอลัมน์ */}
      <Box className="col-span-1" sx={{ display: 'flex', flexDirection: 'column' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUpVariant}
          custom={2} // Block ที่สอง
          style={{ width: '100%', height: '100%' }}
        >
          <ServiceBlock />
        </motion.div>
      </Box>

      {/* Responsive Divider 2 (คอลัมน์ 4 ใน Grid 5 คอลัมน์) */}
      <Box className="col-span-1 md:flex items-center justify-center">
        <ResponsiveDivider />
      </Box>

      {/* 3. ICON LIST BLOCK */}
      {/* md:col-span-auto หรือ md:col-span-1 เพื่อให้ IconListBlock ใช้ 1 คอลัมน์ใน Grid 5 คอลัมน์ */}
      <Box className="col-span-1" sx={{ display: 'flex', flexDirection: 'column' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUpVariant}
          custom={3} // Block ที่สาม
          style={{ width: '100%', height: '100%' }}
        >
          <IconListBlock />
        </motion.div>
      </Box>

      {/* BOTTOM TEXT & CATEGORY BUTTONS */}
      {/* col-span-full เพื่อให้ครอบคลุมทั้ง 5 คอลัมน์ของ Grid */}
      <Box className="col-span-full mt-6" sx={{ textAlign: 'center' }}>
        <Typography variant="body1" sx={{ fontWeight: 'medium', mb: 1.5 }}>
          {servicesList.join(' | ')}
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          flexWrap="wrap"
          useFlexGap
          sx={{ mt: 2 }}
        >
          {categories.map(({ name, href }) => (
            <CategoryButton key={name} category={name} href={href} />
          ))}
        </Stack>
      </Box>
    </div>
  );
}