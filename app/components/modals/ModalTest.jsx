'use client';

import { useModalContext } from './useModalContext';
import { Button, Box, Typography } from '@mui/material';

export default function ModalTest() {
  const { showModal, closeModal } = useModalContext();

  const handleLoadingExample = () => {
    showModal('loading', { message: 'กำลังโหลด...' });
    setTimeout(() => {
      closeModal();
      showModal('success', { message: 'โหลดเสร็จแล้ว!' });
    }, 2000);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        🌟 Modal System Test
      </Typography>

      <Button
        variant="contained"
        color="success"
        onClick={() => showModal('success', { message: 'บันทึกสำเร็จ!' })}
      >
        แสดง Success Modal
      </Button>

      <Button
        variant="contained"
        color="error"
        onClick={() => showModal('error', { message: 'เกิดข้อผิดพลาด!' })}
      >
        แสดง Error Modal
      </Button>

      <Button
        variant="contained"
        color="warning"
        onClick={() => showModal('warning', { message: 'ระวัง! กรุณาตรวจสอบข้อมูล' })}
      >
        แสดง Warning Modal
      </Button>

      <Button
        variant="contained"
        color="secondary"
        onClick={() =>
          showModal('confirm', {
            message: 'คุณแน่ใจหรือไม่?',
            onConfirm: () => alert('✅ ยืนยันแล้ว!'),
          })
        }
      >
        แสดง Confirm Modal
      </Button>

      <Button
        variant="contained"
        color="info"
        onClick={handleLoadingExample}
      >
        แสดง Loading Modal (2 วิ)
      </Button>
    </Box>
  );
}
