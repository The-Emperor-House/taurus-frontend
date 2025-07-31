'use client';

import { Box, Grid, Divider, Typography, } from '@mui/material';
import { motion } from 'framer-motion';
import AboutBlock from './AboutBlock';
import ServiceBlock from './ServiceBlock';
import IconListBlock from './IconListBlock';

export default function AboutUsSection() {
  const categories = ['HOME', 'CONDOMINIUM', 'HOTEL', 'OFFICE'];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, type: 'spring', stiffness: 50 },
    }),
  };

  return (
    <Box sx={{ px: 2, py: 6, maxWidth: '1400px', mx: 'auto' }}>
      <Grid container spacing={4} alignItems="flex-start">
        {/* ABOUT */}
        <Grid size={{ xs: 12, md: 4 }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <AboutBlock />
          </motion.div>
        </Grid>

        <Divider flexItem sx={{ display: { xs: 'block', md: 'none' }, my: 2 }} />

        {/* SERVICE */}
        <Grid size={{ xs: 12, md: 4 }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} custom={2}>
            <ServiceBlock />
          </motion.div>
        </Grid>

        <Divider flexItem sx={{ display: { xs: 'block', md: 'none' }, my: 2 }} />

        {/* ICON LIST */}
        <Grid size={{ xs: 12, md: 4 }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} custom={3}>
            <IconListBlock />
          </motion.div>
        </Grid>
      </Grid>

      {/* BOTTOM TEXT */}
      <Box textAlign="center" mt={6}>
        <Typography variant="body2" gutterBottom>
          สร้างใหม่ | ปรับปรุงต่อเติม - ซ่อมแซม | ออกแบบตกแต่งภายใน
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {categories.join('  |  ')}
        </Typography>
      </Box>
    </Box>
  );
}
