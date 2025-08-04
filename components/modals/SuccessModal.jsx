'use client';

import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function SuccessModal({ open, onClose, message }) {
  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: 3,
          backgroundColor: '#212121',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
        },
      }}
    >
      <DialogContent sx={{ textAlign: 'center', p: 4 }}>
        <Box
          sx={{
            width: 100,
            height: 100,
            mx: 'auto',
            mb: 2,
            borderRadius: '50%',
            backgroundColor: 'success.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'scaleUp 0.5s ease',
          }}
        >
          <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'white' }} />
        </Box>

        <Typography
          variant="h6"
          sx={{ mt: 1, fontWeight: 700, color: 'white' }}
        >
          {typeof message === 'string' ? message : 'Success'}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            backgroundColor: 'success.main',
            fontWeight: 600,
            px: 4,
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            '&:hover': { backgroundColor: 'success.dark' },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
