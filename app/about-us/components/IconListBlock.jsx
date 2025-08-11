import { Box, Stack, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import HandshakeIcon from '@mui/icons-material/Handshake';
import EngineeringIcon from '@mui/icons-material/Engineering';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { motion } from 'framer-motion';

export default function IconListBlock() {
  const servicesDetail = [
    { icon: <SearchIcon />, text: 'Survey Area' },
    { icon: <LightbulbIcon />, text: 'Concept Design & Estimate Price' },
    { icon: <HandshakeIcon />, text: 'Perspective & Sign Contract' },
    { icon: <EngineeringIcon />, text: 'Construction In Progress & Material Approve' },
    { icon: <AssignmentTurnedInIcon />, text: 'Handover' },
  ];

  return (
    <Stack spacing={2} alignItems="flex-start">
      {servicesDetail.map((item, idx) => (
        <Stack
          key={idx}
          direction="row"
          alignItems="center"
          spacing={2}
          component={motion.div}
          whileHover={{ scale: 1.05 }}
          sx={{ width: '100%', maxWidth: '400px' }}
        >
          {/* Icon */}
          <Box
            sx={{
              width: 48,
              height: 48,
              bgcolor: '#ab9685',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              flexShrink: 0,
            }}
          >
            {item.icon}
          </Box>

          {/* Text */}
          <Typography
            variant="body2"
            sx={{
              letterSpacing: '0.05rem', // กระจายตัวอักษร
              color: '#000',
              fontWeight: 600,
              textAlign: 'center',      // จัดกลางแนวนอน
              width: '100%'              // ให้กินเต็มความกว้าง Stack
            }}
          >
            {item.text}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}
