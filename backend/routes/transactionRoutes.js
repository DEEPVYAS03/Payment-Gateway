const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.post('/transactions', transactionController.createTransaction);
router.get('/transactions/:transactionId', transactionController.getTransactionStatus);

module.exports = router;
