'use client';

import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export default function ConfirmModal({ open, onClose, message, onConfirm }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
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
            backgroundColor: '#cc8f2a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'scaleUp 0.5s ease',
          }}
        >
          <HelpOutlineIcon sx={{ fontSize: 60, color: 'white' }} />
        </Box>

        <Typography
          variant="h6"
          sx={{ mt: 1, fontWeight: 700, color: 'white' }}
        >
          {typeof message === 'string' ? message : 'คุณแน่ใจหรือไม่?'}
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: 'center',
          pb: 3,
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            color: 'white',
            borderColor: 'white',
            fontWeight: 600,
            px: 3,
            borderRadius: 2,
            '&:hover': { borderColor: '#cc8f2a', color: '#cc8f2a' },
          }}
        >
          ยกเลิก
        </Button>
        <Button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          variant="contained"
          sx={{
            backgroundColor: '#cc8f2a',
            fontWeight: 600,
            px: 3,
            borderRadius: 2,
            ml: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            '&:hover': { backgroundColor: '#e0a040' },
          }}
        >
          ยืนยัน
        </Button>
      </DialogActions>
    </Dialog>
  );
}
