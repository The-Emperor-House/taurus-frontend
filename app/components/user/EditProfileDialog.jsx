'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useModalContext } from '../modals/useModalContext';

export default function EditProfileDialog({ open, onClose, user, token, onUpdated }) {
  const { showModal, closeModal } = useModalContext();
  const [form, setForm] = useState({ name: '', email: '' });
  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
      });
      setFormError({});
    }
  }, [open, user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const validateForm = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = 'กรุณากรอกชื่อ';
    if (!form.email.trim()) errors.email = 'กรุณากรอกอีเมล';
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email))
      errors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  const submitData = async () => {
    const startTime = Date.now();
    setLoading(true);
    try {
      showModal('loading', { message: 'กำลังอัปเดตข้อมูล...' });

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const elapsed = Date.now() - startTime;
      const minDelay = 500;
      if (elapsed < minDelay) await new Promise((r) => setTimeout(r, minDelay - elapsed));

      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: 'เกิดข้อผิดพลาด' }));
        throw new Error(err.message || 'เกิดข้อผิดพลาด');
      }

      const updatedUser = await res.json();

      closeModal();
      showModal('success', { message: 'อัปเดตข้อมูลสำเร็จ!' });

      setTimeout(() => {
        onUpdated(updatedUser); // ✅ ส่ง user จริงจาก backend
        onClose();
      }, 1500);
    } catch (error) {
      closeModal();
      showModal('error', { message: error.message || 'เกิดข้อผิดพลาด' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitWithConfirm = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    showModal('confirm', {
      message: 'คุณแน่ใจหรือไม่ว่าต้องการบันทึกการเปลี่ยนแปลง?',
      onConfirm: submitData,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setFormError({});
        onClose();
      }}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: (theme) => ({
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }),
      }}
    >
      <DialogTitle sx={{ fontWeight: 600 }}>แก้ไขโปรไฟล์</DialogTitle>
      <DialogContent>
        <form id="edit-profile-form" onSubmit={handleSubmitWithConfirm}>
          <TextField
            label="ชื่อ"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            margin="dense"
            error={!!formError.name}
            helperText={formError.name}
          />
          <TextField
            label="อีเมล"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            margin="dense"
            error={!!formError.email}
            helperText={formError.email}
          />
          <DialogActions sx={{ mt: 2 }}>
            <Button onClick={() => { setFormError({}); onClose(); }}>
              ยกเลิก
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ fontWeight: 600 }}
            >
              บันทึก
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
