// In routes/ProductRoute.js
const express = require('express');
const ProductController = require('../controllers/Product_c.js');

const router = express.Router();

router.get('/products', ProductController.renderProductPage);
router.get('/products/:id', ProductController.renderProductDetails);
router.get('/cart', ProductController.renderCart);
router.post('/cart/add/:id', ProductController.addToCart);

router.post('/checkout', ProductController.checkoutProducts)
router.get('/delete_cart', ProductController.deleteCart)
module.exports = router;
