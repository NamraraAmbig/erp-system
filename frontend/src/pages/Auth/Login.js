import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../redux/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../services/api';
import { toast } from 'react-toastify';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const dispatch  = useDispatch();
  const navigate  = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', form);
      dispatch(setCredentials(data));
      toast.success('Login successful!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">ERP System Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Email" type="email" margin="normal"
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <TextField fullWidth label="Password" type="password" margin="normal"
            value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <Button fullWidth variant="contained" type="submit" sx={{ mt: 2, backgroundColor: '#1e1e2d' }}>
            Login
          </Button>
        </form>
        <Typography mt={2} textAlign="center">
          No account? <Link to="/register">Register</Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Login;