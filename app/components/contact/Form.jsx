'use client';

import {
  Box,
  Card,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
  FormGroup,
  Snackbar,
  Alert,
  Link,
} from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";

const initialState = {
  fullName: "",
  email: "",
  phone: "",
  budget: "",
  areaSize: "",
  details: "",
  services: {
    renovate: false,
    interior: false,
    construction: false,
  },
  accept: false,
};

const serviceLabels = {
  renovate: "รีโนเวท ปรับปรุง/ต่อเติม",
  interior: "ออกแบบตกแต่งภายใน",
  construction: "ก่อสร้าง โครงสร้าง",
};

export default function ContactForm() {
  const [formData, setFormData] = useState(initialState);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{9,10}$/;

    if (!formData.fullName.trim()) return "กรุณากรอกชื่อ-นามสกุล";
    if (!formData.email.trim()) return "กรุณากรอกอีเมล";
    if (!formData.phone.trim()) return "กรุณากรอกเบอร์โทร";
    if (!Object.values(formData.services).some(v => v)) return "กรุณาเลือกบริการที่ต้องการ";
    if (!formData.budget.trim()) return "กรุณากรอกงบประมาณ";
    if (!formData.areaSize.trim()) return "กรุณากรอกขนาดพื้นที่";
    if (!emailRegex.test(formData.email)) return "รูปแบบอีเมลไม่ถูกต้อง";
    if (!phoneRegex.test(formData.phone)) return "เบอร์โทรควรเป็นตัวเลข 9-10 หลัก";
    if (parseFloat(formData.budget) <= 0) return "งบประมาณต้องมากกว่า 0";
    if (isNaN(parseFloat(formData.budget))) return "งบประมาณต้องเป็นตัวเลข";
    if (isNaN(parseFloat(formData.areaSize))) return "ขนาดพื้นที่ต้องเป็นตัวเลข";
    if (!formData.accept) return "กรุณายอมรับนโยบายความเป็นส่วนตัว";
    return "";
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name in formData.services) {
      setFormData(prev => ({ ...prev, services: { ...prev.services, [name]: checked } }));
    } else if (name === "accept") {
      setFormData(prev => ({ ...prev, accept: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMsg = validateForm();
    if (errorMsg) {
      setSnackbar({ open: true, message: errorMsg, severity: "error" });
      return;
    }

    const selectedNeeds = Object.entries(formData.services)
      .filter(([_, v]) => v)
      .map(([k]) => serviceLabels[k]);

    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      budget: parseFloat(formData.budget),
      areaSize: parseFloat(formData.areaSize),
      needs: selectedNeeds,
      details: formData.details || "",
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("ส่งข้อมูลไม่สำเร็จ");

      setSnackbar({ open: true, message: "ส่งข้อมูลสำเร็จ", severity: "success" });
      setFormData(initialState);
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: "error" });
    }
  };

  return (
    <StyledCard>
      <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        CONTACT US
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >
          {/* Left section */}
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="ชื่อ-นามสกุล" name="fullName" value={formData.fullName} onChange={handleChange} fullWidth />
            <TextField label="อีเมล" name="email" value={formData.email} onChange={handleChange} fullWidth />
            <TextField label="เบอร์โทรติดต่อ" name="phone" value={formData.phone} onChange={handleChange} fullWidth />
            <Typography sx={{ mt: 2, mb: 1 }}>แจ้งความต้องการ</Typography>
            <FormGroup>
              {Object.keys(formData.services).map((key) => (
                <FormControlLabel
                  key={key}
                  control={<Checkbox checked={formData.services[key]} onChange={handleChange} name={key} />}
                  label={serviceLabels[key]}
                />
              ))}
            </FormGroup>
          </Box>

          {/* Right section */}
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="งบประมาณ (บาท)" name="budget" value={formData.budget} onChange={handleChange} fullWidth />
            <TextField label="ขนาดพื้นที่ (ตร.ม.)" name="areaSize" value={formData.areaSize} onChange={handleChange} fullWidth />
            <TextField
              label="รายละเอียดเพิ่มเติม"
              name="details"
              value={formData.details}
              onChange={handleChange}
              fullWidth
              multiline
              minRows={4}
            />
          </Box>
        </Box>

        <FormControlLabel
          sx={{ mt: 3 }}
          control={<Checkbox checked={formData.accept} onChange={handleChange} name="accept" />}
          label={
            <Typography variant="body2">
              ยอมรับข้อตกลงและ{" "}
              <Link href="/privacy" underline="hover">
                นโยบายความเป็นส่วนตัว
              </Link>
            </Typography>
          }
        />

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              px: 5,
              py: 1.5,
              fontWeight: 600,
              bgcolor: "primary.main",
              color: "primary.contrastText",
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            ส่งข้อมูล
          </Button>
        </Box>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          sx={{ width: "100%" }}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </StyledCard>
  );
}

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 900,
  margin: "0 auto",
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[3],
  backgroundColor: theme.palette.background.paper,
}));
