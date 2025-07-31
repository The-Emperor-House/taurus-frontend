import { Typography } from '@mui/material';

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

  return (
    <div>
      <Typography
        variant="h1"
        sx={{
          fontWeight: 'bold',
          fontSize: '3rem',
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
          fontSize: '2.5rem',
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
          fontSize: '1.5rem',
          color: '#fdfdfd',
          textShadow: '0 4px 6px rgba(0,0,0,0.5)',
          mt: 2,
        }}
      >
        "สร้างบ้านหลังใหม่ ในที่อยู่อาศัยเดิมของคุณ"
      </Typography>
    </div>
  );
}
