'use client';

import { useState , useEffect } from 'react';
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
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function LoginPage() {
  const router = useRouter();

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
    const timer = setTimeout(() => {
      router.refresh(); // sync session
      router.push('/auth/dashboard'); // ไปยัง dashboard
    }, 1500); // 1.5 วิ

    return () => clearTimeout(timer);
  }
}, [successOpen, router]);


  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (e) => e.preventDefault();
  const handleDialogClose = () => {
    setSuccessOpen(false);
    router.refresh();
    router.push('/auth/dashboard');
  };

  return (
    <Fade in timeout={600}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#f0f2f5',
          fontFamily: 'Poppins, Prompt, sans-serif',
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: 4,
            bgcolor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            width: { xs: '90%', sm: '400px' },
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#333',
            }}
          >
            เข้าสู่ระบบ
          </Typography>

          {error && (
            <Alert severity="error" sx={{ borderRadius: '8px' }}>
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
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />

          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
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
                sx={{
                  color: '#cc8f2a',
                  '&.Mui-checked': { color: '#e0a040' },
                }}
              />
            }
            label="Remember Me"
            sx={{ '& .MuiTypography-root': { color: '#555' } }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              py: 1.5,
              fontWeight: 'bold',
              borderRadius: '8px',
              bgcolor: '#cc8f2a',
              color: 'white',
              '&:hover': { bgcolor: '#e0a040' },
              '&.Mui-disabled': {
                bgcolor: '#cccccc',
                color: '#666666',
              },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
        </Box>

        {/* ✅ Success Modal */}
        <Dialog open={successOpen} onClose={handleDialogClose} fullWidth maxWidth="xs">
          <DialogTitle>เข้าสู่ระบบสำเร็จ</DialogTitle>
          <DialogContent>
            <Typography>กำลังเปลี่ยนเส้นทางไปยังแดชบอร์ด...</Typography>
            <Box mt={2}>
              <LinearProgress color="secondary" />
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </Fade>
  );
}
