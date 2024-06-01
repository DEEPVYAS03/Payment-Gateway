const Transaction = require('../models/Transaction');
const Order = require('../models/Order');

exports.createTransaction = async (req, res) => {
    try {
        const { orderId, razorpay_payment_id } = req.body;
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        const transaction = new Transaction({
            razorpay_payment_id,
            orderId,
        });
        await transaction.save();

        order.status = 'PAID';
        await order.save();

        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getTransactionStatus = async (req, res) => {
    try {
        const { transactionId } = req.params;
        const transaction = await Transaction.findById(transactionId);

        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        res.status(200).json(transaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
