import React, { useState } from 'react';
import axios from '../api/axiosConfig';

const ProductCard = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const imageUrl = `https://source.unsplash.com/featured/?${product.name}`;

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handlePayment = async () => {
        try {
            const order = await axios.post('/api/orders', {
                productId: product._id,
                quantity,
            });

            const razorpayOrder = order.data.razorpayOrder;

            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                amount: razorpayOrder.amount,
                currency: "INR",
                name: product.name,
                description: product.description,
                order_id: razorpayOrder.id,
                handler: async (response) => {
                    const paymentId = response.razorpay_payment_id;

                    await axios.post('/api/transactions', {
                        orderId: order.data.order._id,
                        razorpay_payment_id: paymentId,
                    });
                    alert('Payment successful');
                },
                prefill: {
                    name: "John Doe",
                    email: "johndoe@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#3399cc",
                },
                method: {
                    netbanking: true,
                    card: true,
                    upi: true,
                    wallet: true,
                },
            };

            const razor = new window.Razorpay(options);
            razor.open();
        } catch (error) {
            console.error('Error in processing payment', error);
        }
    };

    return (
        <div className="max-w-xs rounded overflow-hidden shadow-lg m-4 flex flex-col justify-between" style={{ height: '28rem' }}>
            <img className="w-full h-40 object-cover" src={imageUrl} alt={product.name} />
            <div className="px-6 py-4 flex-1 flex flex-col justify-between">
                <div>
                    <div className="font-bold text-xl mb-2">{product.name}</div>
                    <p className="text-gray-700 text-base">{product.description}</p>
                    <p className="text-gray-900 text-lg font-semibold">Price: ₹{product.price}</p>
                </div>
                <div>
                    <div className="flex items-center justify-between mt-4">
                        <button onClick={decrementQuantity} className="bg-blue-500 text-white px-2 py-1 rounded">-</button>
                        <span>{quantity}</span>
                        <button onClick={incrementQuantity} className="bg-blue-500 text-white px-2 py-1 rounded">+</button>
                    </div>
                    <button onClick={handlePayment} className="bg-green-500 text-white mt-4 px-4 py-2 rounded w-full">
                        Pay ₹{product.price * quantity}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
