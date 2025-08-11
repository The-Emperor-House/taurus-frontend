'use client';

import {
  Box,
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
import { useState } from "react";

const initialState = {
  fullName: "",
  email: "",
  phone: "",
  budget: "",
  areaSize: "",
  location: "",
  details: "",
  services: { renovate: false, interior: false, construction: false },
  accept: false,
};

const services = {
  renovate: { label: "รีโนเวท ปรับปรุง/ต่อเติม", value: "RENOVATION" },
  interior: { label: "ออกแบบตกแต่งภายใน", value: "INTERIOR" },
  construction: { label: "ก่อสร้าง โครงสร้าง", value: "CONSTRUCTION" },
};

const BAR = "#404040";
const ACCENT = "#ab9685";

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
    if (isNaN(parseFloat(formData.budget)) || parseFloat(formData.budget) <= 0) return "งบประมาณต้องเป็นตัวเลขมากกว่า 0";
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
    const needs = Object.entries(formData.services).filter(([, v]) => v).map(([k]) => services[k].value);
    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      budget: parseFloat(formData.budget),
      areaSize: parseFloat(formData.areaSize),
      location: formData.location,
      needs,
      details: formData.details || "",
    };
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contacts`, {
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
    <Box sx={{ width: "100%", bgcolor: "#fff" }}>
      {/* Top bar */}
      <Box
        sx={{
          bgcolor: BAR,
          color: ACCENT,
          py: { xs: 2.5, md: 3 },
          textAlign: "center",
          letterSpacing: ".6rem",
          fontSize: { xs: "1.4rem", md: "1.8rem" },
          fontWeight: 600,
        }}
      >
        CONTACT&nbsp;US
      </Box>

      {/* Content */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 2, md: 4 },
          py: { xs: 4, md: 6 },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 4, md: 8 } }}>
          {/* Left */}
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
            <Field label="ชื่อ-นามสกุล ติดต่อกลับ" name="fullName" value={formData.fullName} onChange={handleChange} />
            <Field label="อีเมลล์" name="email" value={formData.email} onChange={handleChange} />
            <Field label="เบอร์โทรติดต่อ" name="phone" value={formData.phone} onChange={handleChange} />

            <Typography sx={{ mt: 1, mb: 1, fontSize: { xs: 18, md: 20 } }}>แจ้งความต้องการ</Typography>
            <FormGroup sx={{ gap: 1 }}>
              {Object.keys(formData.services).map((k) => (
                <FormControlLabel
                  key={k}
                  control={
                    <Checkbox
                      name={k}
                      checked={formData.services[k]}
                      onChange={handleChange}
                      sx={{
                        color: "#000",
                        '&.Mui-checked': { color: ACCENT },
                        '& .MuiSvgIcon-root': { fontSize: 26, borderRadius: 1 },
                      }}
                    />
                  }
                  label={services[k].label}
                  sx={{ m: 0 }}
                />
              ))}
            </FormGroup>
          </Box>

          {/* Right */}
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
            <Field label="งบประมาณ" name="budget" value={formData.budget} onChange={handleChange} />
            <Field label="ขนาดพื้นที่ใช้สอย / ขนาดที่ดิน" name="areaSize" value={formData.areaSize} onChange={handleChange} />
            <Field label="สถานที่ก่อสร้าง" name="location" value={formData.location} onChange={handleChange} />
            <Field label="รายละเอียดข้อมูลเพิ่มเติม" name="details" value={formData.details} onChange={handleChange} multiline minRows={4} />
          </Box>
        </Box>

        {/* Accept + Submit row */}
        <Box sx={{ display: "flex", alignItems: "center", mt: { xs: 3, md: 4 }, gap: 2, flexWrap: "wrap" }}>
          <FormControlLabel
            control={
              <Checkbox
                name="accept"
                checked={formData.accept}
                onChange={handleChange}
                sx={{
                  color: "#000",
                  '&.Mui-checked': { color: ACCENT },
                  '& .MuiSvgIcon-root': { fontSize: 28, borderRadius: 1 },
                }}
              />
            }
            label={
              <Typography variant="body1">
                ยอมรับข้อตกลงในการใช้งานและ{" "}
                <Link href="/privacy" underline="hover" color="inherit">
                  นโยบายความเป็นส่วนตัว
                </Link>
              </Typography>
            }
            sx={{ m: 0, flex: 1 }}
          />

          <Button
            type="submit"
            sx={{
              bgcolor: ACCENT,
              color: "#fff",
              px: 6,
              py: 1.4,
              borderRadius: 9999,
              fontWeight: 700,
              letterSpacing: ".05rem",
              minWidth: 140,
              '&:hover': { bgcolor: '#9a8574' },
            }}
          >
            ส่งข้อมูล
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

/* --------- ช่องกรอกแบบเส้นใต้ ---------- */
function Field(props) {
  const { label, ...rest } = props;
  return (
    <TextField
      variant="standard"
      label={label}
      fullWidth
      InputLabelProps={{ shrink: true, sx: { fontSize: { xs: 18, md: 20 } } }}
      sx={{
        '& .MuiInputBase-root': { fontSize: { xs: 18, md: 20 } },
        '& .MuiInput-underline:before': { borderColor: '#c7c7c7', borderBottomWidth: 2 },
        '& .MuiInput-underline:hover:before': { borderColor: '#a9a9a9' },
        '& .MuiInput-underline:after': { borderColor: '#000', borderBottomWidth: 2 },
      }}
      {...rest}
    />
  );
}
