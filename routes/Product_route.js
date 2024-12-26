// In routes/ProductRoute.js
const express = require('express');
const ProductController = require('../controllers/ProductController.js');

const router = express.Router();

router.get('/products', ProductController.renderProductPage);

module.exports = router;
