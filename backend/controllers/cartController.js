const Product = require('../models/Product');

exports.getCart = (req, res) => {
    const cart = req.session.cart || [];
    res.json({ cart });
};

exports.addToCart = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        if (!req.session.cart) {
            req.session.cart = [];
        }

        // Check if product already in cart
        const existingItem = req.session.cart.find(item => item.productId.toString() === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            req.session.cart.push({
                productId: product._id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                quantity: 1
            });
        }

        res.json({ message: 'Added to cart', cart: req.session.cart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
};

exports.removeFromCart = (req, res) => {
    const productId = req.params.id;
    if (req.session.cart) {
        req.session.cart = req.session.cart.filter(item => item.productId.toString() !== productId);
    }
    res.json({ message: 'Removed from cart', cart: req.session.cart || [] });
};
