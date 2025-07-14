import { Dialog, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function SuccessModal({ open, onClose, message }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogContent sx={{ textAlign: 'center', p: 4, backgroundColor: '#212121' }}>
        <CheckCircleOutlineIcon sx={{ fontSize: 80, color: '#cc8f2a', mb: 2, animation: 'scaleUp 0.6s ease' }} />
        <Typography sx={{ color: 'white' }}>{message}</Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', backgroundColor: '#212121' }}>
        <Button variant="contained" onClick={onClose} sx={{ backgroundColor: '#cc8f2a', '&:hover': { backgroundColor: '#e0a040' } }}>
          ปิด
        </Button>
      </DialogActions>
      <style jsx global>{`
        @keyframes scaleUp {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </Dialog>
  );
}
