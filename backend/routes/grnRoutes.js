const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const GRN = require('../models/GRN');

router.get('/', auth, async (req, res) => {
  try {
    const grns = await GRN.find()
      .populate('purchaseOrder')
      .populate('receivedItems.product', 'title SKU');
    res.json(grns);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const grn = new GRN(req.body);
    await grn.save();
    res.status(201).json(grn);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;