import { Box, Typography } from '@mui/material';

export default function AboutBlock() {
  return (
    <Box sx={{ textAlign: { xs: 'center', md: 'left' }, maxWidth: { xs: '700px', md: 'none' }, mx: 'auto' }}>
      <Typography variant="h4" fontWeight="light" gutterBottom>
        ABOUT US
      </Typography>
      <Typography variant="subtitle1" color="primary" fontWeight="bold">
        TAURUS : WE RENEW
      </Typography>
      <Typography variant="body2" mt={2}>
        “สร้างบ้านหลังใหม่ ในที่อยู่อาศัยเดิมของคุณ”
      </Typography>
      <Typography variant="body2" mt={2} color="primary" fontWeight="bold">
        TAURUS
      </Typography>
      <Typography variant="body2" mt={2} sx={{ whiteSpace: 'pre-line' }}>
        “ทอรัส” ผู้เชี่ยวชาญด้านการปรับโฉมบ้านพักอาศัย อาคารต่างๆ อย่างมีสไตล์
        ด้วยประสบการณ์มากกว่า 30 ปี บริการครบวงจรตั้งแต่สร้างใหม่
        ต่อเติม ตกแต่งภายใน งานระบบวิศวกรรม โดยทีมงานมืออาชีพ
      </Typography>
    </Box>
  );
}
