"use client";

import { useCallback } from "react";
import { Box, Stack, Button, Typography } from "@mui/material";
import useModalContext from "@/shared/hooks/useModalContext";
import useNavbarHeight from "@/hooks/useNavbarHeight";

// ปรับให้ตรงกับ id ที่ map ใน ModalProvider.jsx
const MODAL_IDS = {
  confirm: "confirm",
  error: "error",
  warning: "warning",
  success: "success",
  logout: "logout",
  loading: "loading",
  test: "test-modal",
};

export default function ModalTestPage() {
  const { showModal, closeModal } = useModalContext();

  // ความสูง navbar (เช่นถ้า navbar เป็น position: fixed)
  const navbarHeight = useNavbarHeight() || 0;

  const openConfirm = useCallback(() => {
    showModal(MODAL_IDS.confirm, {
      title: "ยืนยันการทำรายการ",
      message: "คุณแน่ใจหรือไม่ว่าจะดำเนินการต่อ?",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        closeModal();
        showModal(MODAL_IDS.success, { title: "สำเร็จ", message: "ดำเนินการเรียบร้อยแล้ว" });
      },
    });
  }, [showModal, closeModal]);

  const openError   = () => showModal(MODAL_IDS.error,   { title: "เกิดข้อผิดพลาด", message: "ตัวอย่างข้อความผิดพลาดเพื่อทดสอบโมดัล", closeText: "ปิด" });
  const openWarning = () => showModal(MODAL_IDS.warning, { title: "คำเตือน", message: "นี่เป็นตัวอย่างคำเตือนสำหรับทดสอบโมดัล", closeText: "รับทราบ" });
  const openSuccess = () => showModal(MODAL_IDS.success, { title: "สำเร็จ", message: "บันทึกข้อมูลเรียบร้อยแล้ว", closeText: "เยี่ยม!" });
  const openLogout  = () => showModal(MODAL_IDS.logout,  {
    title: "ออกจากระบบ?",
    message: "คุณต้องการออกจากระบบตอนนี้หรือไม่",
    confirmText: "ออกจากระบบ",
    cancelText: "ยกเลิก",
    onConfirm: async () => {
      closeModal();
      showModal(MODAL_IDS.success, { title: "ออกจากระบบแล้ว", message: "คุณได้ออกจากระบบเรียบร้อย" });
    },
  });

  const openLoading = () => {
    showModal(MODAL_IDS.loading, { message: "กำลังประมวลผล..." });
    setTimeout(() => {
      closeModal();
      showModal(MODAL_IDS.success, { title: "เสร็จแล้ว", message: "โหลดจำลองครบแล้ว" });
    }, 1500);
  };

  const openTest = () => showModal(MODAL_IDS.test, { title: "ทดสอบโมดัล", message: "สวัสดีจากหน้า ModalTestPage!", closeText: "ปิด" });

  return (
      <Box p={4}         
            sx={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: '#404040'
            }}
        >
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Button variant="contained" onClick={openConfirm}>Open Confirm</Button>
          <Button variant="contained" color="error" onClick={openError}>Open Error</Button>
          <Button variant="contained" color="warning" onClick={openWarning}>Open Warning</Button>
          <Button variant="contained" color="success" onClick={openSuccess}>Open Success</Button>
          <Button variant="outlined" onClick={openLogout}>Open Logout</Button>
          <Button variant="outlined" onClick={openLoading}>Show Loading</Button>
          <Button variant="text" onClick={openTest}>Open Custom (test-modal)</Button>
        </Stack>
      </Box>
  );
}
