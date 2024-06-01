const Order = require('../models/Order');
const Product = require('../models/Product');
const Razorpay = require('razorpay');
require('dotenv').config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const order = new Order({ productId, quantity });
        await order.save();

        const options = {
            amount: product.price * quantity * 100, // amount in the smallest currency unit
            currency: "INR",
            receipt: `receipt_order_${order._id}`,
            payment_capture: 1,
        };

        const razorpayOrder = await razorpay.orders.create(options);
        res.status(201).json({ order, razorpayOrder });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        order.status = status;
        await order.save();

        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
