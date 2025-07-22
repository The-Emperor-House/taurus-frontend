'use client';

import Image from 'next/image';
import { Grid, Box, Typography } from '@mui/material';

const MapCards = () => {
  return (
    <Grid container sx={{ height: '100%' }}>
      {/* Left Side: Team Image */}
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{ height: { xs: '50vh', md: '100vh' }, order: { xs: 1, md: 0 } }}
      >
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
          <Image
            src="/home/team/104096.webp"
            alt="Taurus Team"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center 30%',
            }}
          />
        </Box>
      </Grid>

      {/* Right Side: Google Map */}
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{ height: { xs: '50vh', md: '100vh' }, order: { xs: 2, md: 0 } }}
      >
        <Box sx={{ width: '100%', height: '100%' }}>
          <iframe
            title="Emperor House Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242.07300574276522!2d100.6055748477894!3d13.888895372048676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e282bda8af42d7%3A0xcf30461c6ca7347e!2z4LiU4Li0IOC5gOC4reC5h-C4oeC5gOC4nuC4reC5gOC4o-C5iOC4reC4o-C5jCDguYDguK7guYnguLLguKrguYwgVGhlIEVtcGVyb3IgSG91c2UgQ28uLEx0ZA!5e0!3m2!1sth!2sth!4v1751340363165!5m2!1sth!2sth"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            style={{
              border: 0,
              width: '100%',
              height: '100%',
            }}
          />
          <noscript>
            <Typography
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                bgcolor: 'rgba(0,0,0,0.7)',
                p: 2,
                borderRadius: 1,
              }}
            >
              โปรดเปิด JavaScript เพื่อดูแผนที่
            </Typography>
          </noscript>
        </Box>
      </Grid>
    </Grid>
  );
};

export default MapCards;
