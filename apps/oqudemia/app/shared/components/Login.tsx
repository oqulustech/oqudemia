import React, { useState } from 'react';
import LoginExpire from './SessionExpire';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
// import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
import { authorisationService } from '../../core/services/authorisation';

import bg01 from '../../assets/images/bg-01.jpg';


const Login: React.FC = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [expireModalOpen, setExpireModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (!form.email || !form.password) {
        setError('Email and password are required');
        setLoading(false);
        return;
      }
  const user = await authorisationService.login(form);
  // Simulate token (replace with real token from backend if available)
  localStorage.setItem('token', user.id || 'dummy-token');
  // Set token expiry (5 seconds from now for testing)
  const expiresAt = Date.now() + 5 * 1000;
  localStorage.setItem('token_expires_at', expiresAt.toString());
  setLoading(false);
  window.location.href = '/app';
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed');
      setLoading(false);
    }
  };

  // Token expiry warning logic
  React.useEffect(() => {
    const checkExpiry = () => {
      const token = localStorage.getItem('token');
      const expiresAt = parseInt(localStorage.getItem('token_expires_at') || '0', 10);
      if (!token || !expiresAt) {
        setExpireModalOpen(false);
        window.sessionStorage.removeItem('token_expiry_alerted');
        return;
      }
      const timeLeft = expiresAt - Date.now();
      if (timeLeft <= 0) {
        // Session expired: clear everything and reload to login
        localStorage.removeItem('token');
        localStorage.removeItem('token_expires_at');
        setExpireModalOpen(false);
        window.sessionStorage.removeItem('token_expiry_alerted');
        window.location.href = '/';
        return;
      }
      if (timeLeft < 5 * 1000 && timeLeft > 0) { // less than 5 sec left
        if (!window.sessionStorage.getItem('token_expiry_alerted')) {
          setExpireModalOpen(true);
          window.sessionStorage.setItem('token_expiry_alerted', '1');
        }
      } else {
        setExpireModalOpen(false);
        window.sessionStorage.removeItem('token_expiry_alerted');
      }
    };
    const interval = setInterval(checkExpiry, 1000); // check every 1s for demo
    return () => clearInterval(interval);
  }, []);

  const handleContinueSession = () => {
    const newExpiresAt = Date.now() + 5 * 1000; // extend by 5s for demo
    localStorage.setItem('token_expires_at', newExpiresAt.toString());
    setExpireModalOpen(false);
    window.sessionStorage.removeItem('token_expiry_alerted');
  };

  const handleLogoutSession = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('token_expires_at');
    setExpireModalOpen(false);
    window.sessionStorage.removeItem('token_expiry_alerted');
    window.location.href = '/';
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        backgroundImage: `url(${bg01})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
  <LoginExpire open={expireModalOpen} onContinue={handleContinueSession} onLogout={handleLogoutSession} />
  <div className="login-form">
        <Typography variant="h4" mb={2} align="center">Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            className="login-field"
            label="Email"
            placeholder="Enter your email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="standard"
            required
            autoComplete="off"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            className="login-field"
            label="Password"
            placeholder="Enter your password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="standard"
            required
            autoComplete="off"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
          
          {error && <Typography color="error" variant="body2" mt={1}>{error}</Typography>}
          <Box display="flex" justifyContent="flex-end">
              <Button variant="text" size="small" sx={{ mb: 1 }} onClick={() => alert('Forgot password flow coming soon!')}>
              Forgot password?
            </Button>
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
            className="button-login"
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <Box mt={2} display="flex" flexDirection="column" alignItems="center">
          <Typography align="center" color="error" sx={{ width: '100%' }}>
            New Student Login <a href="#">Track Application</a>
          </Typography>
        </Box>
      </div>
    </Box>
  );
};

export default Login;
