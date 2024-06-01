const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
    razorpay_payment_id: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'SUCCESS',
    },
});

module.exports = mongoose.model('Transaction', transactionSchema);
