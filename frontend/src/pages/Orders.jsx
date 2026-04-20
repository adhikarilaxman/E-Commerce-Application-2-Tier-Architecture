import { useEffect, useState } from 'react';
import { getOrders } from '../services/orders';
import { Package, Calendar, IndianRupee, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const formatINR = (amount) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

const statusColors = {
    pending:    { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.25)', text: '#fbbf24', dot: '#f59e0b' },
    processing: { bg: 'rgba(59,130,246,0.12)',  border: 'rgba(59,130,246,0.25)',  text: '#60a5fa', dot: '#3b82f6' },
    completed:  { bg: 'rgba(16,185,129,0.12)',  border: 'rgba(16,185,129,0.25)',  text: '#34d399', dot: '#10b981' },
    default:    { bg: 'rgba(99,102,241,0.12)',  border: 'rgba(99,102,241,0.25)',  text: '#818cf8', dot: '#6366f1' },
};

const OrderStatusBadge = ({ status }) => {
    const s = statusColors[status?.toLowerCase()] || statusColors.default;
    return (
        <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold capitalize"
            style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.text }}
        >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: s.dot }} />
            {status || 'Completed'}
        </span>
    );
};

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders();
                setOrders(data);
            } catch (err) {
                console.error('Failed to fetch orders', err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="py-10 space-y-5">
                <div className="skeleton h-10 w-56 rounded-xl" />
                {[0, 1, 2].map(i => (
                    <div key={i} className="rounded-2xl overflow-hidden animate-fade-in" style={{ animationDelay: `${i * 100}ms`, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                        <div className="p-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                            <div className="skeleton h-5 w-48 mb-2" />
                            <div className="skeleton h-4 w-32" />
                        </div>
                        <div className="p-5 grid grid-cols-2 gap-3">
                            <div className="skeleton h-16 rounded-xl" />
                            <div className="skeleton h-16 rounded-xl" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center py-10">
                <div
                    className="max-w-md w-full text-center p-10 rounded-3xl animate-fade-in-up"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                    <div
                        className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
                        style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}
                    >
                        <Package size={40} className="text-brand-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        No Orders Yet
                    </h2>
                    <p className="text-gray-400 mb-8">When you buy something, it will appear here.</p>
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105"
                        style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 4px 20px rgba(99,102,241,0.4)' }}
                    >
                        <ShoppingBag size={18} />
                        Browse Courses
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="py-10">
            {/* Header */}
            <div className="mb-8 animate-fade-in-up">
                <h1
                    className="text-3xl font-extrabold text-white flex items-center gap-3"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                    >
                        <Package size={20} className="text-white" />
                    </div>
                    Order History
                </h1>
                <p className="text-gray-400 mt-2">{orders.length} order{orders.length !== 1 ? 's' : ''} placed</p>
            </div>

            <div className="space-y-5">
                {orders.map((order, idx) => (
                    <div
                        key={order._id}
                        className="rounded-2xl overflow-hidden animate-fade-in-up"
                        style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            animationDelay: `${idx * 80}ms`,
                        }}
                    >
                        {/* Order Header */}
                        <div
                            className="px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                            style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
                        >
                            <div>
                                <p className="text-xs text-gray-500 mb-1 font-mono">
                                    Order #{order._id.slice(-8).toUpperCase()}
                                </p>
                                <div className="flex items-center gap-3 flex-wrap">
                                    <span className="flex items-center gap-1.5 text-sm text-gray-300">
                                        <Calendar size={14} className="text-gray-500" />
                                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                            year: 'numeric', month: 'long', day: 'numeric'
                                        })}
                                    </span>
                                    <OrderStatusBadge status={order.status || 'Completed'} />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <IndianRupee size={16} className="text-brand-400" />
                                <span
                                    className="text-xl font-extrabold"
                                    style={{
                                        background: 'linear-gradient(135deg, #818cf8, #c084fc)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        fontFamily: 'Outfit, sans-serif',
                                    }}
                                >
                                    {formatINR(order.totalAmount)}
                                </span>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="p-6">
                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                                Items in this Order
                            </h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {order.products.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center justify-between p-4 rounded-xl"
                                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                                    >
                                        <div>
                                            <p className="font-semibold text-white text-sm">{item.name}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">Qty: {item.quantity}</p>
                                        </div>
                                        <div
                                            className="text-sm font-bold"
                                            style={{ color: '#818cf8' }}
                                        >
                                            {formatINR(item.price * item.quantity)}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
