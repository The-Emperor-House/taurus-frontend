import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Typography,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useState, useEffect } from 'react';

export default function EditProfileDialog({ open, onClose, user, token, onUpdated }) {
  const [form, setForm] = useState({
    username: '',
    fname: '',
    lname: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formError, setFormError] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (open && user && !showConfirm) {
      setForm({
        username: user.username || '',
        fname: user.fname || '',
        lname: user.lname || '',
        email: user.email || '',
      });
      setFormError({});
      setErrorMsg('');
    }
  }, [open, user, showConfirm]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError({ ...formError, [e.target.name]: '' });
  };

  const validateForm = () => {
    const errors = {};
    if (!form.username.trim()) errors.username = 'กรุณากรอกชื่อผู้ใช้';
    if (!form.fname.trim()) errors.fname = 'กรุณากรอกชื่อจริง';
    if (!form.lname.trim()) errors.lname = 'กรุณากรอกนามสกุล';
    if (!form.email.trim()) {
      errors.email = 'กรุณากรอกอีเมล';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      errors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
    }
    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'เกิดข้อผิดพลาด');
      }

      const updatedUser = await res.json();
      onUpdated(updatedUser);      // แจ้ง parent ว่าอัปเดตเสร็จ
      setShowConfirm(true);        // ✅ แสดง confirm dialog
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);           // ✅ ปิด loading
    }
  };

  const handleCancel = () => {
    setForm({
      username: user.username || '',
      fname: user.fname || '',
      lname: user.lname || '',
      email: user.email || '',
    });
    setFormError({});
    onClose();
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
    onClose();
  };

  return (
    <>
      {/* Main Edit Dialog */}
      <Dialog open={open && !showConfirm} onClose={handleCancel} fullWidth maxWidth="sm">
        <DialogTitle>แก้ไขโปรไฟล์</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="dense"
              label="ชื่อผู้ใช้"
              name="username"
              value={form.username}
              onChange={handleChange}
              fullWidth
              error={!!formError.username}
              helperText={formError.username}
            />
            <TextField
              margin="dense"
              label="ชื่อจริง"
              name="fname"
              value={form.fname}
              onChange={handleChange}
              fullWidth
              error={!!formError.fname}
              helperText={formError.fname}
            />
            <TextField
              margin="dense"
              label="นามสกุล"
              name="lname"
              value={form.lname}
              onChange={handleChange}
              fullWidth
              error={!!formError.lname}
              helperText={formError.lname}
            />
            <TextField
              margin="dense"
              label="อีเมล"
              name="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              error={!!formError.email}
              helperText={formError.email}
            />
          </form>
          {errorMsg && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errorMsg}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} disabled={loading}>
            ยกเลิก
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            sx={{ backgroundColor: '#cc8f2a', '&:hover': { backgroundColor: '#e0a040' } }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'บันทึก'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ✅ Confirm Dialog */}
      <Dialog open={showConfirm} onClose={handleCloseConfirm} fullWidth maxWidth="xs">
        <DialogContent sx={{ textAlign: 'center', p: 4 }}>
          <CheckCircleOutlineIcon
            sx={{
              fontSize: 80,
              color: 'success.main',
              animation: 'scaleUp 0.6s ease',
            }}
          />
          <Typography variant="h6" sx={{ mt: 2, fontWeight: 600 }}>
            ✅ อัปเดตข้อมูลสำเร็จแล้ว!
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button
            variant="contained"
            onClick={handleCloseConfirm}
            sx={{ backgroundColor: '#4caf50', '&:hover': { backgroundColor: '#43a047' } }}
          >
            ปิด
          </Button>
        </DialogActions>
      </Dialog>

      {/* ✅ CSS Animation */}
      <style jsx global>{`
        @keyframes scaleUp {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  );
}
