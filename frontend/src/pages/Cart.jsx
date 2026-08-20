import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { checkout } from '../services/orders';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingCart } from 'lucide-react';
import { formatINR } from '../utils/format';

const Cart = () => {
    const { cart, removeFromCart, setCart } = useCart();
    const navigate = useNavigate();
    const [checkingOut, setCheckingOut] = useState(false);
    const [removingId, setRemovingId] = useState(null);

    const handleCheckout = async () => {
        setCheckingOut(true);
        try {
            await checkout();
            setCart([]);
            navigate('/orders/success');
        } catch {
            alert('Failed to place order. Please try again.');
        } finally {
            setCheckingOut(false);
        }
    };

    const handleRemove = async (productId) => {
        setRemovingId(productId);
        await removeFromCart(productId);
        setRemovingId(null);
    };

    if (!cart || cart.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center">
                <ShoppingCart size={36} className="text-gray-700" />
                <div>
                    <h2 className="text-lg font-semibold text-white mb-1">Your cart is empty</h2>
                    <p className="text-sm text-gray-500">Add a course to get started.</p>
                </div>
                <Link to="/products" className="btn-primary mt-2">
                    Browse courses
                </Link>
            </div>
        );
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-xl font-bold text-white mb-1">Cart</h1>
                <p className="text-sm text-gray-500">{cart.length} item{cart.length !== 1 ? 's' : ''}</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Items */}
                <div className="flex-grow space-y-3">
                    {cart.map((item) => (
                        <div
                            key={item.productId}
                            className={`card flex items-center gap-4 p-4 transition-opacity duration-200 ${removingId === item.productId ? 'opacity-40' : ''}`}
                        >
                            <div className="h-16 w-16 flex-shrink-0 rounded-lg overflow-hidden bg-white/5">
                                {item.imageUrl
                                    ? <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                                    : <div className="h-full w-full flex items-center justify-center">
                                        <ShoppingCart size={20} className="text-gray-600" />
                                    </div>
                                }
                            </div>

                            <div className="flex-grow min-w-0">
                                <p className="text-sm font-semibold text-white truncate">{item.name}</p>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    {formatINR(item.price)} × {item.quantity}
                                </p>
                            </div>

                            <div className="flex items-center gap-4 flex-shrink-0">
                                <span className="text-sm font-semibold text-white">
                                    {formatINR(item.price * item.quantity)}
                                </span>
                                <button
                                    onClick={() => handleRemove(item.productId)}
                                    disabled={removingId === item.productId}
                                    className="text-gray-600 hover:text-red-400 transition-colors disabled:opacity-50"
                                    aria-label="Remove item"
                                >
                                    {removingId === item.productId
                                        ? <div className="w-4 h-4 rounded-full border-2 border-red-400/40 border-t-red-400 animate-spin" />
                                        : <Trash2 size={15} />
                                    }
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="w-full lg:w-80 flex-shrink-0">
                    <div className="card p-5 sticky top-20">
                        <h2 className="text-sm font-semibold text-white mb-4">Order summary</h2>

                        <div className="space-y-2 mb-4 text-sm">
                            <div className="flex justify-between text-gray-400">
                                <span>{cart.length} item{cart.length !== 1 ? 's' : ''}</span>
                                <span>{formatINR(total)}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span>Delivery</span>
                                <span className="text-green-400">Free</span>
                            </div>
                        </div>

                        <div className="border-t border-white/8 pt-4 mb-5 flex justify-between items-center">
                            <span className="text-sm font-semibold text-white">Total</span>
                            <span className="text-lg font-bold text-white">{formatINR(total)}</span>
                        </div>

                        <button
                            onClick={handleCheckout}
                            disabled={checkingOut}
                            className="btn-primary w-full justify-center"
                        >
                            {checkingOut
                                ? <><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Processing…</>
                                : <>Checkout <ArrowRight size={15} /></>
                            }
                        </button>

                        <Link to="/products"
                            className="block text-center mt-3 text-xs text-gray-600 hover:text-gray-400 transition-colors">
                            ← Continue shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
