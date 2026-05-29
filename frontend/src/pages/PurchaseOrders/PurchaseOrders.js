import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, Chip } from '@mui/material';
import API from '../../services/api';

const statusColor = { pending: 'warning', ordered: 'info', received: 'success', cancelled: 'error' };

function PurchaseOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get('/purchase-orders').then(({ data }) => setOrders(data)).catch(console.error);
  }, []);

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={3}>Purchase Orders</Typography>
      <Paper elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1e1e2d' }}>
            <TableRow>
              {['Order ID','Supplier','Total Price','Status','Date'].map(h => (
                <TableCell key={h} sx={{ color: 'white' }}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((o) => (
              <TableRow key={o._id}>
                <TableCell>{o._id.slice(-6).toUpperCase()}</TableCell>
                <TableCell>{o.supplier?.name || 'N/A'}</TableCell>
                <TableCell>₹{o.totalPrice}</TableCell>
                <TableCell>
                  <Chip label={o.status} color={statusColor[o.status]} size="small" />
                </TableCell>
                <TableCell>{new Date(o.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

export default PurchaseOrders;