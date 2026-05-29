const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  salesOrder:  { type: mongoose.Schema.Types.ObjectId, ref: 'SalesOrder', required: true },
  invoiceDate: { type: Date, default: Date.now },
  dueDate:     { type: Date },
  totalAmount: { type: Number },
  status: {
    type: String,
    enum: ['unpaid','paid','overdue'],
    default: 'unpaid'
  }
}, { timestamps: true });

module.exports = mongoose.model('Invoice', invoiceSchema);