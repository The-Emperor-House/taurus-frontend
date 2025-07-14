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
import { useRouter } from 'next/navigation';
import { useModalContext } from '../modals/useModalContext';

export default function EditProfileDialog({ open, onClose, user, token, onUpdated }) {
  const { showModal, closeModal } = useModalContext();
  const router = useRouter();

  const [form, setForm] = useState({ username: '', fname: '', lname: '', email: '' });
  const [formError, setFormError] = useState({});

  useEffect(() => {
    if (open && user) {
      setForm({
        username: user.username || '',
        fname: user.fname || '',
        lname: user.lname || '',
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

  const submitData = async () => {
    const startTime = Date.now();
    console.log('[submitData] เริ่มอัปเดตข้อมูล...');

    try {
      showModal('loading', { message: 'กำลังอัปเดตข้อมูล...' });
      console.log('[modal] แสดง loading modal');

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const elapsed = Date.now() - startTime;
      console.log(`[fetch] ตอบกลับภายใน ${elapsed} ms`);

      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: 'เกิดข้อผิดพลาด' }));
        console.warn('[fetch] response ไม่ ok:', err);
        throw new Error(err.message || 'เกิดข้อผิดพลาด');
      }

      const updatedUser = await res.json();
      console.log('[fetch] อัปเดตสำเร็จ:', updatedUser);

      // ให้ loading อยู่ไม่น้อยกว่า 500ms
      const minDelay = 500;
      if (elapsed < minDelay) {
        await new Promise((res) => setTimeout(res, minDelay - elapsed));
      }

      closeModal();
      console.log('[modal] ปิด loading modal');

      showModal('success', { message: 'อัปเดตข้อมูลสำเร็จ!' });
      console.log('[modal] แสดง success modal');

      // แสดง success modal 1.5 วินาที
      setTimeout(() => {
        closeModal();
        onUpdated(updatedUser);
        router.refresh();
        onClose();
        console.log('[system] อัปเดต state / refresh / ปิด dialog');
      }, 1500);
    } catch (error) {
      closeModal();
      console.error('[error] เกิดข้อผิดพลาด:', error);
      showModal('error', { message: error.message || 'เกิดข้อผิดพลาด' });
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
    <Dialog open={open} onClose={() => { setFormError({}); onClose(); }} fullWidth maxWidth="sm">
      <DialogTitle>แก้ไขโปรไฟล์</DialogTitle>
      <DialogContent>
        <form id="edit-profile-form" onSubmit={handleSubmitWithConfirm}>
          <TextField
            id="username"
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
            id="fname"
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
            id="lname"
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
            id="email"
            margin="dense"
            label="อีเมล"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            error={!!formError.email}
            helperText={formError.email}
          />
          <DialogActions sx={{ mt: 2 }}>
            <Button onClick={() => { setFormError({}); onClose(); }}>ยกเลิก</Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: '#cc8f2a', '&:hover': { backgroundColor: '#e0a040' } }}
            >
              บันทึก
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
