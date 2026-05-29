const mongoose = require('mongoose');

const salesOrderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  products: [{
    product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number },
    price:    { type: Number }
  }],
  totalPrice: { type: Number },
  status: {
    type: String,
    enum: ['pending','confirmed','shipped','delivered','cancelled'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('SalesOrder', salesOrderSchema);