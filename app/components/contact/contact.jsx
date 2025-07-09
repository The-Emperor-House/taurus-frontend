'use client';

import {
  Box,
  Grid,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  Snackbar,
  Alert,
  Link,
} from '@mui/material';
import { useState } from 'react';

const initialState = {
  name: '',
  email: '',
  phone: '',
  budget: '',
  area: '',
  location: '',
  details: '',
  services: {
    renovate: false,
    interior: false,
    construction: false,
  },
  accept: false,
};

const serviceMap = {
  renovate: 1,
  interior: 2,
  construction: 3,
};

const serviceLabels = {
  renovate: 'รีโนเวท ปรับปรุง/ต่อเติม',
  interior: 'ออกแบบตกแต่งภายใน',
  construction: 'ก่อสร้าง โครงสร้าง',
};

export default function ContactForm() {
  const [formData, setFormData] = useState(initialState);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{9,10}$/;

    if (!formData.name.trim()) return 'กรุณากรอกชื่อ';
    if (!formData.email.trim()) return 'กรุณากรอกอีเมล';
    if (!formData.phone.trim()) return 'กรุณากรอกเบอร์โทร';
    if (!formData.services.renovate && !formData.services.interior && !formData.services.construction) {
      return 'กรุณาเลือกบริการที่ต้องการ';
    }
    if (!formData.budget.trim()) return 'กรุณากรอกงบประมาณ';
    if (!formData.location.trim()) return 'กรุณากรอกสถานที่ก่อสร้าง';
    if (!formData.area.trim()) return 'กรุณากรอกขนาดพื้นที่/ขนาดที่ดิน';
    if (!emailRegex.test(formData.email)) return 'รูปแบบอีเมลไม่ถูกต้อง';
    if (!phoneRegex.test(formData.phone)) return 'เบอร์โทรควรเป็นตัวเลข 9-10 หลัก';
    if (parseFloat(formData.budget || 0) <= 0) return 'งบประมาณต้องมากกว่า 0';
    if (formData.budget && isNaN(parseFloat(formData.budget))) return 'งบประมาณต้องเป็นตัวเลข';
    if (formData.area && isNaN(parseFloat(formData.area))) return 'ขนาดพื้นที่/ขนาดที่ดินต้องเป็นตัวเลข';
    if (!formData.accept) return 'กรุณายอมรับนโยบายความเป็นส่วนตัว';
    return '';
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name in formData.services) {
      setFormData(prev => ({ ...prev, services: { ...prev.services, [name]: checked } }));
    } else if (name === 'accept') {
      setFormData(prev => ({ ...prev, accept: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMsg = validateForm();
    if (errorMsg) {
      setSnackbar({ open: true, message: errorMsg, severity: 'error' });
      return;
    }

    const selectedServices = Object.entries(formData.services)
      .filter(([_, v]) => v)
      .map(([k]) => serviceMap[k]);

    const payload = {
      fullName: formData.name,
      email: formData.email,
      phone: formData.phone,
      budget: parseFloat(formData.budget),
      area: parseFloat(formData.area) || 0,
      location: formData.location,
      additionalDetails: formData.details || '',
      acceptTerms: formData.accept,
      services: selectedServices,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact-requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('ส่งข้อมูลไม่สำเร็จ');

      setSnackbar({ open: true, message: 'ส่งข้อมูลสำเร็จ', severity: 'success' });
      setFormData(initialState);
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 4 }}>
      <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        CONTACT US
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container columns={12} spacing={4}>
          <Grid columnSpan={{ xs: 12, md: 6 }}>
            <TextField label="ชื่อ-นามสกุล" name="name" value={formData.name} onChange={handleChange} fullWidth variant="standard" />
            <TextField label="อีเมล" name="email" value={formData.email} onChange={handleChange} fullWidth variant="standard" sx={{ mt: 3 }} />
            <TextField label="เบอร์โทรติดต่อ" name="phone" value={formData.phone} onChange={handleChange} fullWidth variant="standard" sx={{ mt: 3 }} />

            <FormControl component="fieldset" sx={{ mt: 4 }}>
              <FormLabel component="legend">แจ้งความต้องการ</FormLabel>
              <FormGroup>
                {Object.keys(formData.services).map((key) => (
                  <FormControlLabel
                    key={key}
                    control={<Checkbox checked={formData.services[key]} onChange={handleChange} name={key} />}
                    label={serviceLabels[key]}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Grid>

          <Grid columnSpan={{ xs: 12, md: 6 }}>
            <TextField label="งบประมาณ" name="budget" value={formData.budget} onChange={handleChange} fullWidth variant="standard" />
            <TextField label="ขนาดพื้นที่ / ขนาดที่ดิน" name="area" value={formData.area} onChange={handleChange} fullWidth variant="standard" sx={{ mt: 3 }} />
            <TextField label="สถานที่ก่อสร้าง" name="location" value={formData.location} onChange={handleChange} fullWidth variant="standard" sx={{ mt: 3 }} />
            <TextField label="รายละเอียดเพิ่มเติม" name="details" value={formData.details} onChange={handleChange} fullWidth multiline minRows={4} variant="standard" sx={{ mt: 3 }} />
          </Grid>

          <Grid columnSpan={12} sx={{ textAlign: 'center' }}>
            <FormControlLabel
              control={<Checkbox checked={formData.accept} onChange={handleChange} name="accept" />}
              label={
                <Typography variant="body2">
                  ยอมรับข้อตกลงและ{' '}
                  <Link href="/privacy" underline="hover">
                    นโยบายความเป็นส่วนตัว
                  </Link>
                </Typography>
              }
            />
            <Box sx={{ mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: '#a08976', '&:hover': { backgroundColor: '#8c7466' }, px: 4, py: 1.5 }}
              >
                ส่งข้อมูล
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
