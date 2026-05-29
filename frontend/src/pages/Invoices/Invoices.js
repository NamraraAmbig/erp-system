import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, Chip } from '@mui/material';
import API from '../../services/api';
import jsPDF from 'jspdf';

const statusColor = { unpaid: 'error', paid: 'success', overdue: 'warning' };

function Invoices() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    API.get('/invoices').then(({ data }) => setInvoices(data)).catch(console.error);
  }, []);

  const downloadPDF = (inv) => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('INVOICE', 90, 20);
    doc.setFontSize(12);
    doc.text(`Invoice ID: ${inv._id}`, 20, 40);
    doc.text(`Date: ${new Date(inv.invoiceDate).toLocaleDateString()}`, 20, 50);
    doc.text(`Amount: Rs.${inv.totalAmount}`, 20, 60);
    doc.text(`Status: ${inv.status}`, 20, 70);
    doc.save(`invoice-${inv._id}.pdf`);
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={3}>Invoices</Typography>
      <Paper elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1e1e2d' }}>
            <TableRow>
              {['Invoice ID','Date','Due Date','Amount','Status','PDF'].map(h => (
                <TableCell key={h} sx={{ color: 'white' }}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((inv) => (
              <TableRow key={inv._id}>
                <TableCell>{inv._id.slice(-6).toUpperCase()}</TableCell>
                <TableCell>{new Date(inv.invoiceDate).toLocaleDateString()}</TableCell>
                <TableCell>{inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : '-'}</TableCell>
                <TableCell>₹{inv.totalAmount}</TableCell>
                <TableCell>
                  <Chip label={inv.status} color={statusColor[inv.status]} size="small" />
                </TableCell>
                <TableCell>
                  <Button size="small" variant="outlined" onClick={() => downloadPDF(inv)}>
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

export default Invoices;