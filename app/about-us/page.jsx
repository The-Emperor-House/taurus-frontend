'use client';

import { Box, Typography, Container, Paper } from '@mui/material';

export default function AboutUsPage() {
  return (
    <Box sx={{ width: '100%', overflowX: 'hidden' }}>
      {/* Hero Banner */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          backgroundImage: "url('/about-us/banner.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
        }}
      >
        {/* Black overlay */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          }}
        />

        {/* Hero Texts */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            px: 2,
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            fontWeight="bold"
            sx={{ letterSpacing: '0.05em' }}
          >
            ABOUT US
          </Typography>

          <Typography
            variant="h3"
            color="primary"
            fontWeight="bold"
            sx={{
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              mt: 1,
            }}
          >
            RECREAFTING SPACE.
            <br />
            REVIVING LIVING.
          </Typography>

          <Typography
            variant="h6"
            fontWeight="light"
            color="white"
            sx={{
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              mt: 2,
              maxWidth: 600,
            }}
          >
            "สร้างบ้านหลังใหม่ ในที่อยู่อาศัยเดิมของคุณ"
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
          <Typography
            variant="h5"
            color="primary"
            fontWeight="bold"
            sx={{ mb: 2, letterSpacing: '0.1em' }}
          >
            TAURUS : WE RENEW
          </Typography>

          <Typography variant="body1" color="text.secondary" lineHeight={1.8}>
            "ทอรัส" ผู้เชี่ยวชาญด้านการปรับโฉมบ้านพักอาศัย อาคารต่างๆ อย่างมีรสนิยม 
            ด้วยประสบการณ์ที่มีมากกว่า 30 ปี ให้บริการแบบครบวงจร ตั้งแต่การสร้างบ้านใหม่ ปรับปรุง
            ต่อเติมบ้าน งานออกแบบตกแต่งภายใน บ้านพักอาศัย คอนโดมิเนียม โรงแรม สำนักงาน และอาคารต่างๆ
            รวมไปถึงงานเฟอร์นิเจอร์ลอยตัว ดำเนินงานโดยมีทีมผู้เชี่ยวชาญในทุกสาขา ทั้งด้านงานออกแบบสถาปัตยกรรม
            งานตกแต่งภายใน และงานโครงสร้างวิศวกรรม ภายใต้กระบวนการทำงานอย่างมืออาชีพ
            ที่พร้อมดูแลตั้งแต่แนวคิดไปจนถึงงานก่อสร้างจริง
            และควบคุมงบประมาณไม่ให้บานปลาย
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
