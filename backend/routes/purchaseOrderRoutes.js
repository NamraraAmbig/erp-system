const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const PurchaseOrder = require('../models/PurchaseOrder');

router.get('/', auth, async (req, res) => {
  try {
    const orders = await PurchaseOrder.find()
      .populate('supplier', 'name email')
      .populate('products.product', 'title price');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const order = new PurchaseOrder(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const order = await PurchaseOrder.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(order);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;