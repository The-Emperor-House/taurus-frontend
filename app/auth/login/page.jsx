'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  IconButton,
  InputAdornment,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  LinearProgress,
  Fade,
  useTheme,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function LoginPage() {
  const router = useRouter();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successOpen, setSuccessOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
        rememberMe: rememberMe ? 'on' : '',
      });

      if (result?.error) {
        const knownErrors = {
          CredentialsSignin: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
        };
        setError(knownErrors[result.error] || 'เกิดข้อผิดพลาด กรุณาลองใหม่');
      } else if (result.ok) {
        setSuccessOpen(true);
      }
    } catch (err) {
      setError('เกิดข้อผิดพลาดในระบบ กรุณาลองใหม่');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (successOpen) {
      const timer = setTimeout(async () => {
        router.refresh();
        await router.push('/auth/dashboard');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [successOpen, router]);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (e) => e.preventDefault();

  return (
    <Fade in timeout={600}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'background.default',
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: 4,
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 3,
            width: { xs: '90%', sm: 400 },
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            align="center"
            sx={{ fontWeight: 'bold', color: 'text.primary' }}
          >
            เข้าสู่ระบบ
          </Typography>

          {error && (
            <Alert severity="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />

          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                color="warning"
              />
            }
            label="Remember Me"
          />

          <Button
            type="submit"
            variant="contained"
            color="warning"
            fullWidth
            disabled={loading}
            sx={{ fontWeight: 'bold', py: 1.5, borderRadius: 2 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
        </Box>

        {/* ✅ Success Modal */}
        <Dialog open={successOpen} fullWidth maxWidth="xs">
          <DialogTitle>เข้าสู่ระบบสำเร็จ</DialogTitle>
          <DialogContent>
            <Typography sx={{ mb: 2 }}>
              กำลังเปลี่ยนเส้นทางไปยังแดชบอร์ด...
            </Typography>
            <LinearProgress color="warning" />
          </DialogContent>
        </Dialog>
      </Box>
    </Fade>
  );
}
