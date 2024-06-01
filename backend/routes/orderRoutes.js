const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/orders', orderController.createOrder);
router.patch('/orders/:orderId', orderController.updateOrderStatus);

module.exports = router;
