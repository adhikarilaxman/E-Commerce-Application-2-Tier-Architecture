const Order = require('../models/Order');

exports.checkout = async (req, res) => {
    try {
        const cart = req.session.cart;
        if (!cart || cart.length === 0) {
            return res.status(400).json({ error: 'Cart is empty' });
        }

        const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

        const newOrder = new Order({
            userId: req.session.user._id,
            products: cart,
            totalAmount
        });

        await newOrder.save();

        // Clear cart after checkout
        req.session.cart = [];
        res.status(201).json({ message: 'Order placed successfully', orderId: newOrder._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
};

exports.getOrderSuccess = (req, res) => {
    // This route is typically handled by React now, but we can return basic JSON if hit directly
    res.json({ message: 'Order success endpoint reached' });
};

exports.getOrderHistory = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.session.user._id }).sort({ createdAt: -1 });
        res.json({ orders });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
};
