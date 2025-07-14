import { Dialog, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function ErrorModal({ open, onClose, message }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogContent sx={{ textAlign: 'center', p: 4, backgroundColor: '#212121' }}>
        <ErrorOutlineIcon sx={{ fontSize: 80, color: '#f44336', mb: 2, animation: 'scaleUp 0.6s ease' }} />
        <Typography sx={{ color: 'white' }}>{message}</Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', backgroundColor: '#212121' }}>
        <Button variant="contained" onClick={onClose} sx={{ backgroundColor: '#f44336', '&:hover': { backgroundColor: '#e53935' } }}>
          ปิด
        </Button>
      </DialogActions>
    </Dialog>
  );
}
