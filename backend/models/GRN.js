const mongoose = require('mongoose');

const grnSchema = new mongoose.Schema({
  purchaseOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'PurchaseOrder', required: true },
  receivedItems: [{
    product:          { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantityReceived: { type: Number }
  }],
  receivedDate: { type: Date, default: Date.now },
  notes:        { type: String }
}, { timestamps: true });

module.exports = mongoose.model('GRN', grnSchema);