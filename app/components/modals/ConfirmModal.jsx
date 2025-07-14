import { Dialog, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export default function ConfirmModal({ open, onClose, message, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogContent sx={{ textAlign: 'center', p: 4, backgroundColor: '#212121' }}>
        <HelpOutlineIcon sx={{ fontSize: 80, color: '#cc8f2a', mb: 2, animation: 'scaleUp 0.6s ease' }} />
        <Typography sx={{ color: 'white' }}>{message}</Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', backgroundColor: '#212121' }}>
        <Button onClick={onClose} variant="outlined" sx={{ color: 'white', borderColor: 'white', mr: 1, '&:hover': { borderColor: '#cc8f2a' } }}>
          ยกเลิก
        </Button>
        <Button onClick={() => { onConfirm(); onClose(); }} variant="contained" sx={{ backgroundColor: '#cc8f2a', '&:hover': { backgroundColor: '#e0a040' } }}>
          ยืนยัน
        </Button>
      </DialogActions>
    </Dialog>
  );
}
