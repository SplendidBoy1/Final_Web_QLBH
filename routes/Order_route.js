const express = require('express');
const Order = require('../controllers/Order_c.js');
const router = express.Router();

router.get('/order/:id', Order.OrderDetail);

module.exports = router;