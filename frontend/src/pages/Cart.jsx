import { useCart } from '../context/CartContext';
import { checkout } from '../services/orders';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const Cart = () => {
    const { cart, removeFromCart, setCart } = useCart();
    const navigate = useNavigate();
    const [checkingOut, setCheckingOut] = useState(false);

    const handleCheckout = async () => {
        setCheckingOut(true);
        try {
            await checkout();
            setCart([]); // Optimistically clear cart
            navigate('/orders/success');
        } catch (err) {
            console.error("Checkout failed", err);
            alert("Failed to place order.");
        } finally {
            setCheckingOut(false);
        }
    };

    if (!cart || cart.length === 0) {
        return (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100 mt-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
                <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
                <Link to="/products" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Start Shopping <ArrowRight size={20} />
                </Link>
            </div>
        );
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items */}
                <div className="flex-grow bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <ul className="divide-y divide-gray-100">
                        {cart.map((item) => (
                            <li key={item.productId} className="p-6 flex flex-col sm:flex-row items-center gap-6">
                                <div className="h-24 w-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50">
                                    {item.imageUrl ? (
                                        <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>
                                    )}
                                </div>
                                <div className="flex-grow text-center sm:text-left">
                                    <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                                    <p className="text-gray-500 mt-1">Price: ${item.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-gray-900 font-medium bg-gray-50 px-4 py-2 rounded-lg">
                                        Qty: {item.quantity}
                                    </div>
                                    <div className="text-xl font-bold text-gray-900 w-24 text-right">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.productId)}
                                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Remove item"
                                    >
                                        <Trash2 size={24} />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-96 flex-shrink-0">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span className="text-green-600 font-medium">Free</span>
                            </div>
                            <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-xl font-bold text-gray-900">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleCheckout}
                            disabled={checkingOut}
                            className={`w-full py-4 px-4 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-2 transition-all ${checkingOut ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 shadow-sm'}`}
                        >
                            {checkingOut ? 'Processing...' : 'Proceed to Checkout'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
