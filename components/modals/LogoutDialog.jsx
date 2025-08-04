'use client';

import { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Slide,
} from '@mui/material';
import { signOut } from 'next-auth/react';

const Transition = Slide;

export default function LogoutDialog({ isOpen, onClose }) {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleLogout = () => {
    onClose();
    signOut({ callbackUrl: '/auth/login' });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      maxWidth="xs"
      sx={{
        '& .MuiPaper-root': {
          borderRadius: 3,
        },
        backdropFilter: 'blur(4px)',
      }}
    >
      <DialogTitle>Are you sure you want to log out?</DialogTitle>
      <DialogContent>
        <Typography color="text.secondary">
          If you log out, you will need to log in again.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleLogout}
          variant="contained"
          sx={{ bgcolor: '#cc8f2a', '&:hover': { bgcolor: '#e0a040' } }}
        >
          Log Out
        </Button>
      </DialogActions>
    </Dialog>
  );
}
