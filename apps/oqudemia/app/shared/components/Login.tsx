import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { authorisationService } from '../../core/services/authorisation';
import bg01 from '../../assets/images/bg-01.jpg';


const Login: React.FC = () => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotMessage, setForgotMessage] = useState('');
  const navigateToForgotPassword = () => {
    setShowForgot(true);
    setForgotMessage('');
    setForgotEmail('');
  };
  const backToLogin = () => {
    setShowForgot(false);
    setForgotMessage('');
    setForgotEmail('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (!form.username || !form.password) {
        setError('Username and password are required');
        setLoading(false);
        return;
      }
      const user = await authorisationService.login({ username: form.username, password: form.password });
      localStorage.setItem('token', user.id || 'dummy-token');
      const expiresAt = Date.now() + 30 * 60 * 1000; // 30 minutes
      localStorage.setItem('token_expires_at', expiresAt.toString());
      setLoading(false);
      window.location.href = '/admission';
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed');
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotMessage('');
    if (!forgotEmail || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(forgotEmail)) {
      setForgotMessage('Please enter a valid email address.');
      return;
    }
    setForgotLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setForgotLoading(false);
    setForgotMessage('If this email is registered, a password reset link has been sent.');
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
      {!showForgot ? (
        <div className="login-form">
          <Typography variant="h4" mb={2} align="center">Login</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              className="login-field"
              label="Username"
              placeholder="Enter your username"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="standard"
              required
              autoComplete="off"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
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
            <Box display="flex" justifyContent="flex-end" sx={{ mb: 1 }}>
              <Button variant="text" size="small" onClick={navigateToForgotPassword}>
                <span style={{ textTransform: 'capitalize' }}>Forgot Password?</span>
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
              <a href="#"> New Student Login</a> | <a href="#">Track Application</a>
            </Typography>
          </Box>
        </div>
      ) : (
        <div className="login-form">
          <Typography variant="h4" mb={2} align="center">Forgot Password</Typography>
          <form onSubmit={handleForgotSubmit}>
            <TextField
              className="login-field"
              label="Email id"
              placeholder="Enter your email"
              name="forgotEmail"
              type="email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
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
            {forgotMessage && (
              <Typography color={forgotMessage.startsWith('If') ? 'success.main' : 'error'} variant="body2" mt={1}>
                {forgotMessage}
              </Typography>
            )}
            
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              className="button-login"
              disabled={forgotLoading}
            >
              {forgotLoading ? 'Sending...' : 'Submit'}
            </Button>
            
            <Box mt={2} display="flex" flexDirection="column" alignItems="center">
              <Typography align="center" color="error" sx={{ width: '100%' }} >
                <a href="#" onClick={backToLogin}> Back to Login</a>
              </Typography>
            </Box>
          </form>
        </div>
      )}
    </Box>
  );
};

export default Login;
