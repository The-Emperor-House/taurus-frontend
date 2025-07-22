import { Box, Stack, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';

export default function ServiceBlock() {
  const servicesMain = [
    { title: 'REBUILD', subtitle: 'สร้างใหม่' },
    { title: 'RENOVATE', subtitle: 'ปรับปรุง ต่อเติม - ซ่อมแซม' },
    { title: 'REDESIGN & DECORATE', subtitle: 'ออกแบบตกแต่งภายใน' },
  ];

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6" color="primary" fontWeight="bold" mb={2}>
        OUR SERVICE
      </Typography>
      <Stack spacing={3} alignItems="center">
        {servicesMain.map((item, idx) => (
          <Box key={idx}>
            <Button
              variant="contained"
              disableElevation
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              sx={{
                bgcolor: '#f5ede5',
                color: 'black',
                fontWeight: 'bold',
                borderRadius: 10,
                px: 4,
                py: 1,
                '&:hover': { bgcolor: '#e5dbcf' },
              }}
            >
              {item.title}
            </Button>
            <Typography variant="subtitle2" mt={1}>
              {item.subtitle}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
