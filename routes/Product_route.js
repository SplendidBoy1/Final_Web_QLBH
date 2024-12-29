// In routes/ProductRoute.js
const express = require('express');
const ProductController = require('../controllers/Product_c.js');

const router = express.Router();

router.get('/products', ProductController.renderProductPage);
router.get('/products/:id', ProductController.renderProductDetails);

router.post('/checkout', ProductController.checkoutProducts)

module.exports = router;
