'use client';

import { Box, Grid, Typography, Button, Divider, Stack } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BuildIcon from '@mui/icons-material/Build';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import SearchIcon from '@mui/icons-material/Search';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import HandshakeIcon from '@mui/icons-material/Handshake';
import EngineeringIcon from '@mui/icons-material/Engineering';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

export default function AboutUs() {
  const services = [
    { icon: <SearchIcon />, text: 'Survey Area' },
    { icon: <LightbulbIcon />, text: 'Concept Design & Estimate Price' },
    { icon: <HandshakeIcon />, text: 'Perspective & Sign Contract' },
    { icon: <EngineeringIcon />, text: 'Construction In Progress & Material Approve' },
    { icon: <AssignmentTurnedInIcon />, text: 'Handover' },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 6 }, maxWidth: '1200px', mx: 'auto' }}>
      <Grid container spacing={4}>
        {/* Left Side */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" fontWeight="light" gutterBottom>
            ABOUT US
          </Typography>

          <Typography variant="subtitle1" color="primary" fontWeight="bold">
            TAURUS : WE RENEW
          </Typography>
          <Typography variant="body1" mt={1} mb={2} sx={{ fontStyle: 'italic' }}>
            “สร้างบ้านหลังใหม่ ในที่อยู่อาศัยเดิมของคุณ”
          </Typography>

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            TAURUS
          </Typography>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
            “ทอรัส” ผู้เชี่ยวชาญด้านการปรับโฉมบ้านพักอาศัย อาคารต่างๆ อย่างมีสไตล์
            ด้วยประสบการณ์มากกว่า 30 ปี ให้บริการแบบครบวงจร ตั้งแต่ สร้างบ้านใหม่
            ปรับปรุงต่อเติม งานออกแบบตกแต่งภายใน บ้านพักอาศัย คอนโดมิเนียม โรงแรม
            สำนักงาน และอาคารทั่วไป รวมถึงงานระบบวิศวกรรม สถาปัตย์
            โดยทีมผู้เชี่ยวชาญในทุกสาขา ทั้งด้านงานออกแบบสถาปัตยกรรมและตกแต่งภายใน
            และระบบวิศวกรรม ภายใต้กระบวนการทำงานอย่างมืออาชีพ เพื่อร่วมขับเคลื่อน
            และควบคุมให้ได้ผลงานปลายทางตามมาตรฐาน
          </Typography>

          <Typography variant="caption" display="block" mt={3}>
            สร้างใหม่ | ปรับปรุงต่อเติม - ซ่อมแซม | ออกแบบตกแต่งภายใน
          </Typography>

          <Typography variant="caption" display="block" mt={1}>
            HOME | CONDOMINIUM | HOTEL | OFFICE
          </Typography>
        </Grid>

        {/* Right Side */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color="primary"
            mb={2}
          >
            RECRAFTING SPACES . REVIVING LIVING.
          </Typography>

          <Typography variant="h6" gutterBottom>
            OUR SERVICE
          </Typography>

          <Stack direction="row" spacing={1} mb={2}>
            <Button variant="outlined" startIcon={<HomeIcon />}>
              สร้างใหม่
            </Button>
            <Button variant="outlined" startIcon={<BuildIcon />}>
              ต่อเติม - ซ่อมแซม
            </Button>
            <Button variant="outlined" startIcon={<DesignServicesIcon />}>
              ออกแบบตกแต่งภายใน
            </Button>
          </Stack>

          <Divider sx={{ mb: 2 }} />

          <Stack spacing={2}>
            {services.map((item, idx) => (
              <Stack
                key={idx}
                direction="row"
                alignItems="center"
                spacing={2}
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

          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 3, borderRadius: 5, px: 4 }}
          >
            READ MORE
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
