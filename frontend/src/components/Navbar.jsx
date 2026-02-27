import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, PackageSearch } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="font-bold text-2xl tracking-tight text-blue-400 flex items-center gap-2">
                            <PackageSearch size={28} />
                            ShopApp
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to="/products" className="hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Products</Link>
                        {user ? (
                            <>
                                <Link to="/cart" className="hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center relative">
                                    <ShoppingCart size={20} className="mr-1" /> Cart
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>
                                <Link to="/orders" className="hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Orders</Link>
                                <button
                                    onClick={handleLogout}
                                    className="bg-gray-800 hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors border border-gray-700 hover:border-red-600 ml-4"
                                >
                                    Logout ({user.username})
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Login</Link>
                                <Link to="/register" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
