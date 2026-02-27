import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const CheckoutSuccess = () => {
    return (
        <div className="min-h-[70vh] flex items-center justify-center">
            <div className="max-w-md w-full text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                <CheckCircle size={80} className="mx-auto text-green-500 mb-6" />
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Order Confirmed!</h1>
                <p className="text-lg text-gray-600 mb-8">
                    Thank you for your purchase. We've received your order and are processing it.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row justify-center">
                    <Link
                        to="/orders"
                        className="bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        View Orders
                    </Link>
                    <Link
                        to="/products"
                        className="bg-gray-100 text-gray-900 font-bold py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSuccess;
