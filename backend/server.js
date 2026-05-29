const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth',           require('./routes/authRoutes'));
app.use('/api/products',       require('./routes/productRoutes'));
app.use('/api/customers',      require('./routes/customerRoutes'));
app.use('/api/suppliers',      require('./routes/supplierRoutes'));
app.use('/api/sales-orders',   require('./routes/salesOrderRoutes'));
app.use('/api/purchase-orders',require('./routes/purchaseOrderRoutes'));
app.use('/api/grn',            require('./routes/grnRoutes'));
app.use('/api/invoices',       require('./routes/invoiceRoutes'));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));