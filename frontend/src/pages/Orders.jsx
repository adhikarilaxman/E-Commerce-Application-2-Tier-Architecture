import { useEffect, useState } from 'react';
import { getOrders } from '../services/orders';
import { Package, Calendar, DollarSign } from 'lucide-react';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders();
                setOrders(data);
            } catch (err) {
                console.error("Failed to fetch orders", err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) {
        return <div className="text-center py-20 text-gray-500 text-xl font-medium">Loading your orders...</div>;
    }

    if (orders.length === 0) {
        return (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100 mt-10">
                <Package className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No Orders Yet</h2>
                <p className="text-gray-500">When you buy something, it will appear here.</p>
            </div>
        );
    }

    return (
        <div className="py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <Package size={32} className="text-blue-600" />
                Order History
            </h1>

            <div className="space-y-6">
                {orders.map((order) => (
                    <div key={order._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        {/* Order Header */}
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Order #{order._id}</p>
                                <div className="flex items-center gap-4 text-sm font-medium text-gray-900">
                                    <span className="flex items-center gap-1.5">
                                        <Calendar size={16} className="text-gray-400" />
                                        {new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </span>
                                </div>
                            </div>
                            <div className="text-right w-full sm:w-auto flex justify-between sm:block">
                                <span className="text-sm text-gray-500 sm:hidden">Total</span>
                                <span className="text-xl font-bold text-gray-900 flex items-center sm:justify-end">
                                    ${order.totalAmount.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="p-6">
                            <h4 className="text-sm border-b border-gray-100 pb-2 mb-4 font-bold text-gray-900 uppercase tracking-wider">Items in Order</h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {order.products.map((item, index) => (
                                    <li key={index} className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
                                        <div className="flex-grow">
                                            <p className="font-bold text-gray-900">{item.name}</p>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="text-right font-medium text-gray-900">
                                            ${(item.price * item.quantity).toFixed(2)}
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
