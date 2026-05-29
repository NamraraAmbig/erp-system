import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import API from '../../services/api';

function StatCard({ title, value, color }) {
  return (
    <Paper elevation={3} sx={{ p: 3, borderLeft: `5px solid ${color}` }}>
      <Typography variant="h6" color="text.secondary">{title}</Typography>
      <Typography variant="h4" fontWeight="bold">{value}</Typography>
    </Paper>
  );
}

function Dashboard() {
  const [stats, setStats] = useState({ products: 0, customers: 0, suppliers: 0, orders: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [p, c, s, o] = await Promise.all([
          API.get('/products'),
          API.get('/customers'),
          API.get('/suppliers'),
          API.get('/sales-orders'),
        ]);
        setStats({
          products:  p.data.products?.length || 0,
          customers: c.data.length || 0,
          suppliers: s.data.length || 0,
          orders:    o.data.length || 0,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  const chartData = [
    { name: 'Products',  value: stats.products },
    { name: 'Customers', value: stats.customers },
    { name: 'Suppliers', value: stats.suppliers },
    { name: 'Orders',    value: stats.orders },
  ];

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={3}>Dashboard</Typography>
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Products"  value={stats.products}  color="#1e1e2d" /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Customers" value={stats.customers} color="#4caf50" /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Suppliers" value={stats.suppliers} color="#2196f3" /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Orders"    value={stats.orders}    color="#ff9800" /></Grid>
      </Grid>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>Overview</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#1e1e2d" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}

export default Dashboard;