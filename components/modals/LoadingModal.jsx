'use client';

import { Dialog, DialogContent, Typography, CircularProgress } from '@mui/material';

export default function LoadingModal({ open, message }) {
  return (
    <Dialog open={open} fullWidth maxWidth="xs">
      <DialogContent sx={{ textAlign: 'center', p: 4, backgroundColor: '#212121' }}>
        <CircularProgress size={80} sx={{ color: '#cc8f2a', mb: 2 }} />
        <Typography sx={{ color: 'white' }}>
          {typeof message === 'string' ? message : 'กำลังโหลด...'}
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
