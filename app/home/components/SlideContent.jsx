'use client';

import { Typography } from '@mui/material';
import { motion } from 'framer-motion';

export default function SlideContent({ num }) {
  const titleMap = {
    1: 'TAURUS:',
    2: 'TAURUS:',
    3: 'TAURUS:',
    4: 'TAURUS:',
    5: 'TAURUS:',
    6: 'TAURUS:',
    7: 'TAURUS:',
  };

  const subtitleMap = {
    1: 'WE RENEW',
    2: 'INNOVATE SPACES',
    3: 'DESIGN FUTURE',
    4: 'BUILD BETTER',
    5: 'REDEFINE LIVING',
    6: 'CRAFT MEMORIES',
    7: 'YOUR DREAM, OUR WORK',
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.8,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  };

  return (
    <motion.div
      variants={textVariants}
      initial="initial"
      animate="animate"
      transition={textVariants.transition}
      className="p-4"
    >
      <Typography
        variant="h1"
        sx={{
          fontWeight: 'bold',
          fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
          textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
          color: '#cc8f2a',
        }}
      >
        {titleMap[num]}
      </Typography>

      <Typography
        variant="h2"
        sx={{
          fontWeight: 'bold',
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
          textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
          color: '#fdfdfd',
        }}
      >
        {subtitleMap[num]}
      </Typography>

      <Typography
        variant="h3"
        sx={{
          fontWeight: 'medium',
          fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' },
          color: '#fdfdfd',
          textShadow: '0 4px 6px rgba(0,0,0,0.5)',
          mt: { xs: 1, sm: 2 },
        }}
      >
        "สร้างบ้านหลังใหม่ ในที่อยู่อาศัยเดิมของคุณ"
      </Typography>
    </motion.div>
  );
}