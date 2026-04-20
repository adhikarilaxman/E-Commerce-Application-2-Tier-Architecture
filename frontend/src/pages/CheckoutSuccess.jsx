import { Link } from 'react-router-dom';
import { CheckCircle, ShoppingBag, Package, Sparkles } from 'lucide-react';

const CheckoutSuccess = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center py-10 px-4">
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl"
                    style={{ background: 'radial-gradient(circle, #10b981, transparent)' }}
                />
            </div>

            <div className="w-full max-w-lg text-center animate-bounce-in relative">
                {/* Sparkle decorations */}
                <div className="absolute -top-8 left-12 text-yellow-400 animate-float opacity-60">
                    <Sparkles size={20} />
                </div>
                <div className="absolute -top-4 right-16 text-violet-400 animate-float opacity-50" style={{ animationDelay: '1s' }}>
                    <Sparkles size={14} />
                </div>
                <div className="absolute top-20 -left-4 text-emerald-400 animate-float opacity-40" style={{ animationDelay: '2s' }}>
                    <Sparkles size={16} />
                </div>

                <div
                    className="p-10 rounded-3xl"
                    style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.09)',
                        boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
                        backdropFilter: 'blur(20px)',
                    }}
                >
                    {/* Success Icon */}
                    <div className="relative inline-flex mb-8">
                        <div
                            className="w-28 h-28 rounded-full flex items-center justify-center animate-pulse-glow"
                            style={{
                                background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(5,150,105,0.1))',
                                border: '2px solid rgba(16,185,129,0.4)',
                            }}
                        >
                            <CheckCircle size={56} className="text-emerald-400" strokeWidth={1.5} />
                        </div>
                        {/* Ring pulse */}
                        <div
                            className="absolute inset-0 rounded-full animate-ping opacity-20"
                            style={{ background: 'rgba(16,185,129,0.3)' }}
                        />
                    </div>

                    <h1
                        className="text-4xl font-extrabold text-white mb-3"
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                        Order Confirmed! 🎉
                    </h1>
                    <p className="text-gray-400 text-base mb-2 leading-relaxed">
                        Thank you for your purchase! We've received your order and it's being processed.
                    </p>
                    <p className="text-emerald-400 text-sm font-medium mb-8">
                        You'll receive access to your courses shortly.
                    </p>

                    {/* Order stats */}
                    <div
                        className="grid grid-cols-3 gap-3 mb-8 p-4 rounded-2xl"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                        {[
                            { icon: '✅', label: 'Payment', value: 'Verified' },
                            { icon: '⚡', label: 'Delivery', value: 'Instant' },
                            { icon: '🔒', label: 'Secure', value: 'Encrypted' },
                        ].map(stat => (
                            <div key={stat.label} className="text-center">
                                <div className="text-xl mb-1">{stat.icon}</div>
                                <div className="text-white text-xs font-bold">{stat.value}</div>
                                <div className="text-gray-500 text-xs">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            to="/orders"
                            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105"
                            style={{
                                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                boxShadow: '0 8px 30px rgba(99,102,241,0.4)',
                            }}
                        >
                            <Package size={18} />
                            View My Orders
                        </Link>
                        <Link
                            to="/products"
                            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105"
                            style={{
                                background: 'rgba(255,255,255,0.06)',
                                border: '1px solid rgba(255,255,255,0.1)',
                            }}
                        >
                            <ShoppingBag size={18} />
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSuccess;
