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
    <Stack spacing={2} alignItems="center">
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
          <Box
            sx={{
              width: 40,
              height: 40,
              bgcolor: 'primary.light',
              color: 'primary.contrastText',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
            }}
          >
            {item.icon}
          </Box>
          <Typography variant="body2">{item.text}</Typography>
        </Stack>
      ))}
    </Stack>
  );
}
