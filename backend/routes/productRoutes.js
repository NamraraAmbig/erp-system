const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// All routes require login
router.get('/',    auth, getProducts);
router.get('/:id', auth, getProduct);

// Only admin and inventory can create/edit/delete
router.post('/',    auth, roleCheck('admin', 'inventory'), createProduct);
router.put('/:id',  auth, roleCheck('admin', 'inventory'), updateProduct);
router.delete('/:id', auth, roleCheck('admin', 'inventory'), deleteProduct);

module.exports = router;