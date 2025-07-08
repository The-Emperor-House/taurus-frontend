'use client';

import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
  typography: {
    fontFamily: [
      'Prompt', // ใส่ชื่อฟอนต์ 'Prompt' ที่คุณโหลดมาเป็นอันดับแรก
      'sans-serif', // ฟอนต์สำรอง
    ].join(','),
    // คุณสามารถปรับแต่งรูปแบบตัวอักษรของปุ่มได้โดยเฉพาะถ้าต้องการ
    button: {
      textTransform: 'none', // มักจะต้องการให้ข้อความบนปุ่มไม่เป็นตัวพิมพ์ใหญ่ทั้งหมด
      // fontWeight: 500, // ตัวอย่าง: กำหนดน้ำหนักฟอนต์ของปุ่ม
    },
  },
  // คุณสามารถเพิ่มการปรับแต่งอื่นๆ ของ Material-UI ได้ที่นี่ (เช่น palette, components)
});

export default customTheme;