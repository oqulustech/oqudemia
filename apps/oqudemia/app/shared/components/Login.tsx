import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { authorisationService } from '../../core/services/authorisation';
import bg01 from '../../assets/images/bg-01.jpg';


const Login: React.FC = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
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
    // Simulate token (replace with real token from backend if available)
    localStorage.setItem('token', user.id || 'dummy-token');
    // Set token expiry (1 minute from now)
    const expiresAt = Date.now() + 1 * 60 * 1000;
    localStorage.setItem('token_expires_at', expiresAt.toString());
    setLoading(false);
    window.location.href = '/app';
      } catch (err: any) {
        setError(err?.response?.data?.message || 'Login failed');
        setLoading(false);
      }
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
            <a href="#"> New Student Login</a> | <a href="#">Track Application</a>
          </Typography>
        </Box>
      </div>
    </Box>
  );
};

export default Login;
