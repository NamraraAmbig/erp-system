import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, MenuItem } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../services/api';
import { toast } from 'react-toastify';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'sales' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      toast.success('Registered! Please login.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">Create Account</Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Name" margin="normal"
            value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <TextField fullWidth label="Email" type="email" margin="normal"
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <TextField fullWidth label="Password" type="password" margin="normal"
            value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <TextField fullWidth select label="Role" margin="normal"
            value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="purchase">Purchase</MenuItem>
            <MenuItem value="inventory">Inventory</MenuItem>
          </TextField>
          <Button fullWidth variant="contained" type="submit" sx={{ mt: 2, backgroundColor: '#1e1e2d' }}>
            Register
          </Button>
        </form>
        <Typography mt={2} textAlign="center">
          Have account? <Link to="/login">Login</Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Register;