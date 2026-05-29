import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import API from '../../services/api';
import { toast } from 'react-toastify';

const empty = { name: '', email: '', phone: '', address: '' };

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [open,      setOpen]      = useState(false);
  const [form,      setForm]      = useState(empty);
  const [editId,    setEditId]    = useState(null);

  const fetch = async () => {
    const { data } = await API.get('/customers');
    setCustomers(data);
  };

  useEffect(() => { fetch(); }, []);

  const handleSave = async () => {
    try {
      if (editId) { await API.put(`/customers/${editId}`, form); toast.success('Updated!'); }
      else        { await API.post('/customers', form);           toast.success('Created!'); }
      setOpen(false); setForm(empty); setEditId(null); fetch();
    } catch (err) { toast.error('Error saving customer'); }
  };

  const handleEdit   = (c) => { setForm(c); setEditId(c._id); setOpen(true); };
  const handleDelete = async (id) => {
    if (window.confirm('Delete?')) { await API.delete(`/customers/${id}`); toast.success('Deleted!'); fetch(); }
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={3}>Customers</Typography>
      <Button variant="contained" sx={{ mb: 2, backgroundColor: '#1e1e2d' }}
        onClick={() => { setForm(empty); setEditId(null); setOpen(true); }}>
        + Add Customer
      </Button>
      <Paper elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1e1e2d' }}>
            <TableRow>
              {['Name','Email','Phone','Address','Actions'].map(h => (
                <TableCell key={h} sx={{ color: 'white' }}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((c) => (
              <TableRow key={c._id}>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.email}</TableCell>
                <TableCell>{c.phone}</TableCell>
                <TableCell>{c.address}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => handleEdit(c)}>Edit</Button>
                  <Button size="small" color="error" onClick={() => handleDelete(c._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>{editId ? 'Edit Customer' : 'Add Customer'}</DialogTitle>
        <DialogContent>
          {['name','email','phone','address'].map((field) => (
            <TextField key={field} fullWidth label={field} margin="normal"
              value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} sx={{ backgroundColor: '#1e1e2d' }}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Customers;