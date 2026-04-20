import { useCart } from '../context/CartContext';
import { checkout } from '../services/orders';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag, Tag, Truck, Shield } from 'lucide-react';
import { useState } from 'react';

const formatINR = (amount) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

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
        } catch (err) {
            console.error('Checkout failed', err);
            alert('Failed to place order.');
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
            <div className="min-h-[70vh] flex items-center justify-center py-10">
                <div
                    className="max-w-md w-full text-center p-10 rounded-3xl animate-fade-in-up"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                    <div className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
                        style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.2)' }}>
                        <ShoppingBag size={40} className="text-brand-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        Your Cart is Empty
                    </h2>
                    <p className="text-gray-400 mb-8">Looks like you haven't added anything yet. Browse our amazing courses!</p>
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105"
                        style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 4px 20px rgba(99,102,241,0.4)' }}
                    >
                        Start Shopping <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        );
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="py-10">
            {/* Header */}
            <div className="mb-8 animate-fade-in-up">
                <h1
                    className="text-3xl font-extrabold text-white"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                    Shopping Cart
                </h1>
                <p className="text-gray-400 mt-1">{cart.length} item{cart.length !== 1 ? 's' : ''} in your cart</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items */}
                <div className="flex-grow space-y-4">
                    {cart.map((item, index) => (
                        <div
                            key={item.productId}
                            className="flex flex-col sm:flex-row items-center gap-5 p-5 rounded-2xl transition-all duration-300 animate-fade-in-up"
                            style={{
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                animationDelay: `${index * 60}ms`,
                                opacity: removingId === item.productId ? 0.4 : 1,
                            }}
                        >
                            {/* Image */}
                            <div className="h-20 w-20 flex-shrink-0 rounded-xl overflow-hidden">
                                {item.imageUrl ? (
                                    <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center bg-white/5">
                                        <ShoppingBag size={24} className="text-gray-600" />
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-grow text-center sm:text-left">
                                <h3 className="text-base font-bold text-white mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                                    {item.name}
                                </h3>
                                <p className="text-gray-400 text-sm">Unit Price: {formatINR(item.price)}</p>
                            </div>

                            {/* Controls */}
                            <div className="flex items-center gap-4">
                                <div
                                    className="text-sm font-semibold text-gray-300 px-4 py-2 rounded-xl"
                                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                                >
                                    Qty: {item.quantity}
                                </div>
                                <div
                                    className="text-base font-extrabold min-w-[80px] text-right"
                                    style={{
                                        background: 'linear-gradient(135deg, #818cf8, #c084fc)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}
                                >
                                    {formatINR(item.price * item.quantity)}
                                </div>
                                <button
                                    onClick={() => handleRemove(item.productId)}
                                    disabled={removingId === item.productId}
                                    className="p-2 rounded-xl text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-200"
                                    title="Remove"
                                >
                                    {removingId === item.productId
                                        ? <div className="w-5 h-5 rounded-full border-2 border-rose-400/40 border-t-rose-400 animate-spin" />
                                        : <Trash2 size={18} />
                                    }
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-96 flex-shrink-0">
                    <div
                        className="rounded-2xl p-6 sticky top-20 animate-fade-in"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}
                    >
                        <h2 className="text-lg font-bold text-white mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            Order Summary
                        </h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-gray-400 text-sm">
                                <span>Subtotal ({cart.length} items)</span>
                                <span className="text-white font-medium">{formatINR(total)}</span>
                            </div>
                            <div className="flex justify-between text-gray-400 text-sm">
                                <span className="flex items-center gap-1.5"><Tag size={13} /> Discount</span>
                                <span className="text-emerald-400 font-medium">— ₹0</span>
                            </div>
                            <div className="flex justify-between text-gray-400 text-sm">
                                <span className="flex items-center gap-1.5"><Truck size={13} /> Delivery</span>
                                <span className="text-emerald-400 font-semibold">FREE</span>
                            </div>
                            <div
                                className="pt-4 border-t flex justify-between items-center"
                                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                            >
                                <span className="text-white font-bold">Total</span>
                                <span
                                    className="text-2xl font-extrabold"
                                    style={{
                                        background: 'linear-gradient(135deg, #818cf8, #c084fc)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        fontFamily: 'Outfit, sans-serif',
                                    }}
                                >
                                    {formatINR(total)}
                                </span>
                            </div>
                        </div>

                        {/* Trust badges */}
                        <div className="flex items-center gap-2 mb-5 p-3 rounded-xl"
                            style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.15)' }}>
                            <Shield size={14} className="text-emerald-400 flex-shrink-0" />
                            <span className="text-emerald-400 text-xs">Secure payment & 100% money-back guarantee</span>
                        </div>

                        <button
                            onClick={handleCheckout}
                            disabled={checkingOut}
                            className="w-full py-4 rounded-xl text-white font-bold text-base flex items-center justify-center gap-2 transition-all duration-300"
                            style={checkingOut ? {
                                background: 'rgba(255,255,255,0.06)',
                                cursor: 'not-allowed',
                                color: '#6b7280',
                            } : {
                                background: 'linear-gradient(135deg, #10b981, #059669)',
                                boxShadow: '0 8px 30px rgba(16,185,129,0.35)',
                            }}
                            onMouseEnter={e => { if (!checkingOut) e.currentTarget.style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
                        >
                            {checkingOut ? (
                                <>
                                    <div className="w-5 h-5 rounded-full border-2 border-gray-400/40 border-t-gray-400 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    Proceed to Checkout
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>

                        <Link
                            to="/products"
                            className="block text-center mt-4 text-gray-500 hover:text-brand-400 text-sm transition-colors duration-200"
                        >
                            ← Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
