import { useEffect, useState } from 'react';
import { getOrders } from '../services/orders';
import { Package, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatINR } from '../utils/format';

const statusStyle = {
    confirmed:  { color: '#34d399', bg: 'rgba(52,211,153,0.1)'  },
    completed:  { color: '#34d399', bg: 'rgba(52,211,153,0.1)'  },
    processing: { color: '#60a5fa', bg: 'rgba(96,165,250,0.1)'  },
    pending:    { color: '#fbbf24', bg: 'rgba(251,191,36,0.1)'  },
};

const StatusBadge = ({ status }) => {
    const s = statusStyle[status?.toLowerCase()] || { color: '#9ca3af', bg: 'rgba(156,163,175,0.1)' };
    return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
            style={{ color: s.color, background: s.bg }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
            {status || 'Confirmed'}
        </span>
    );
};

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getOrders()
            .then(setOrders)
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="space-y-4 pt-2">
                <div className="skeleton h-6 w-32 mb-6" />
                {[0, 1, 2].map(i => (
                    <div key={i} className="card overflow-hidden">
                        <div className="p-4 border-b border-white/6">
                            <div className="skeleton h-4 w-40 mb-2" />
                            <div className="skeleton h-3 w-24" />
                        </div>
                        <div className="p-4 grid grid-cols-2 gap-3">
                            <div className="skeleton h-14 rounded-lg" />
                            <div className="skeleton h-14 rounded-lg" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center">
                <Package size={36} className="text-gray-700" />
                <div>
                    <h2 className="text-lg font-semibold text-white mb-1">No orders yet</h2>
                    <p className="text-sm text-gray-500">Your purchases will appear here.</p>
                </div>
                <Link to="/products" className="btn-primary mt-2">
                    <ShoppingCart size={15} /> Browse courses
                </Link>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-xl font-bold text-white mb-1">Orders</h1>
                <p className="text-sm text-gray-500">{orders.length} order{orders.length !== 1 ? 's' : ''}</p>
            </div>

            <div className="space-y-4">
                {orders.map((order) => (
                    <div key={order._id} className="card overflow-hidden">
                        <div className="px-5 py-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-white/6 bg-white/[0.02]">
                            <div className="flex items-center gap-3 flex-wrap">
                                <span className="text-xs text-gray-500 font-mono">
                                    #{order._id.slice(-8).toUpperCase()}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                        year: 'numeric', month: 'short', day: 'numeric'
                                    })}
                                </span>
                                <StatusBadge status={order.status} />
                            </div>
                            <span className="text-sm font-bold text-white">
                                {formatINR(order.totalAmount)}
                            </span>
                        </div>

                        <ul className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {order.products.map((item, i) => (
                                <li key={i} className="flex justify-between items-center p-3 rounded-lg bg-white/[0.02] border border-white/6">
                                    <div>
                                        <p className="text-sm font-medium text-white">{item.name}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">Qty {item.quantity}</p>
                                    </div>
                                    <span className="text-sm font-semibold text-gray-300">
                                        {formatINR(item.price * item.quantity)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
