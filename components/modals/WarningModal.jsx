'use client';

import { Dialog, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export default function WarningModal({ open, onClose, message }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogContent sx={{ textAlign: 'center', p: 4, backgroundColor: '#212121' }}>
        <WarningAmberIcon sx={{ fontSize: 80, color: '#ff9800', mb: 2, animation: 'scaleUp 0.6s ease' }} />
        <Typography sx={{ color: 'white' }}>{message}</Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', backgroundColor: '#212121' }}>
        <Button variant="contained" onClick={onClose} sx={{ backgroundColor: '#ff9800', '&:hover': { backgroundColor: '#fb8c00' } }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
