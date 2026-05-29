import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import API from '../../services/api';
import { toast } from 'react-toastify';

const empty = { title: '', SKU: '', price: '', stock: '', description: '' };

function Products() {
  const [products, setProducts] = useState([]);
  const [search,   setSearch]   = useState('');
  const [open,     setOpen]     = useState(false);
  const [form,     setForm]     = useState(empty);
  const [editId,   setEditId]   = useState(null);

  const fetchProducts = async () => {
    const { data } = await API.get(`/products?search=${search}`);
    setProducts(data.products || []);
  };

  useEffect(() => { fetchProducts(); }, [search]);

  const handleSave = async () => {
    try {
      if (editId) { await API.put(`/products/${editId}`, form); toast.success('Updated!'); }
      else        { await API.post('/products', form);           toast.success('Created!'); }
      setOpen(false); setForm(empty); setEditId(null); fetchProducts();
    } catch (err) { toast.error(err.response?.data?.msg || 'Error'); }
  };

  const handleEdit   = (p) => { setForm(p); setEditId(p._id); setOpen(true); };
  const handleDelete = async (id) => {
    if (window.confirm('Delete this product?')) {
      await API.delete(`/products/${id}`); toast.success('Deleted!'); fetchProducts();
    }
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={3}>Products</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField label="Search" size="small" value={search}
          onChange={(e) => setSearch(e.target.value)} />
        <Button variant="contained" sx={{ backgroundColor: '#1e1e2d' }}
          onClick={() => { setForm(empty); setEditId(null); setOpen(true); }}>
          + Add Product
        </Button>
      </Box>
      <Paper elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1e1e2d' }}>
            <TableRow>
              {['Title','SKU','Price','Stock','Actions'].map(h => (
                <TableCell key={h} sx={{ color: 'white' }}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p._id}>
                <TableCell>{p.title}</TableCell>
                <TableCell>{p.SKU}</TableCell>
                <TableCell>₹{p.price}</TableCell>
                <TableCell>{p.stock}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => handleEdit(p)}>Edit</Button>
                  <Button size="small" color="error" onClick={() => handleDelete(p._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>{editId ? 'Edit Product' : 'Add Product'}</DialogTitle>
        <DialogContent>
          {['title','SKU','price','stock','description'].map((field) => (
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

export default Products;