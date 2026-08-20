import { Link } from 'react-router-dom';
import { CheckCircle, Package, ShoppingCart } from 'lucide-react';

const CheckoutSuccess = () => (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center card p-10">
            <CheckCircle size={44} className="text-green-400 mx-auto mb-5" strokeWidth={1.5} />
            <h1 className="text-xl font-bold text-white mb-2">Order confirmed</h1>
            <p className="text-sm text-gray-500 mb-8">
                Your purchase was successful. You'll receive access to your courses shortly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/orders" className="btn-primary">
                    <Package size={15} /> View orders
                </Link>
                <Link to="/products" className="btn-secondary">
                    <ShoppingCart size={15} /> Continue shopping
                </Link>
            </div>
        </div>
    </div>
);

export default CheckoutSuccess;
