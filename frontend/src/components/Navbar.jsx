import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Package, Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        setMobileOpen(false);
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    const linkClass = (path) =>
        `text-sm font-medium transition-colors duration-150 ${
            isActive(path) ? 'text-white' : 'text-gray-400 hover:text-white'
        }`;

    return (
        <nav className="sticky top-0 z-50 border-b border-white/6"
            style={{ background: 'rgba(3,7,18,0.9)', backdropFilter: 'blur(16px)' }}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center h-14">

                    <Link to="/" className="text-sm font-bold text-white tracking-tight">
                        ShopApp
                    </Link>

                    {/* Desktop */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/products" className={linkClass('/products')}>Products</Link>
                        {user && (
                            <>
                                <Link to="/cart" className={`${linkClass('/cart')} relative flex items-center gap-1.5`}>
                                    <ShoppingCart size={15} />
                                    Cart
                                    {cartCount > 0 && (
                                        <span className="absolute -top-2 -right-3 bg-indigo-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>
                                <Link to="/orders" className={`${linkClass('/orders')} flex items-center gap-1.5`}>
                                    <Package size={15} />
                                    Orders
                                </Link>
                            </>
                        )}
                        <div className="flex items-center gap-3 pl-4 border-l border-white/8">
                            {user ? (
                                <>
                                    <span className="text-sm text-gray-400">{user.username}</span>
                                    <button onClick={handleLogout}
                                        className="text-gray-500 hover:text-gray-200 transition-colors"
                                        title="Sign out">
                                        <LogOut size={15} />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="text-sm text-gray-400 hover:text-white transition-colors">
                                        Sign in
                                    </Link>
                                    <Link to="/register" className="btn-primary text-xs py-1.5 px-3">
                                        Sign up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile toggle */}
                    <button onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden text-gray-400 hover:text-white p-1 transition-colors">
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden border-t border-white/6 px-4 py-4 space-y-1"
                    style={{ background: 'rgba(3,7,18,0.97)' }}>
                    <Link to="/products" onClick={() => setMobileOpen(false)}
                        className={`block py-2 ${linkClass('/products')}`}>Products</Link>
                    {user ? (
                        <>
                            <Link to="/cart" onClick={() => setMobileOpen(false)}
                                className={`py-2 flex items-center gap-2 ${linkClass('/cart')}`}>
                                <ShoppingCart size={15} /> Cart
                                {cartCount > 0 && (
                                    <span className="bg-indigo-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                            <Link to="/orders" onClick={() => setMobileOpen(false)}
                                className={`py-2 flex items-center gap-2 ${linkClass('/orders')}`}>
                                <Package size={15} /> Orders
                            </Link>
                            <div className="pt-3 mt-2 border-t border-white/6 flex items-center justify-between">
                                <span className="text-sm text-gray-400">{user.username}</span>
                                <button onClick={handleLogout}
                                    className="text-sm text-gray-500 hover:text-gray-200 flex items-center gap-1.5 transition-colors">
                                    <LogOut size={14} /> Sign out
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="pt-3 mt-2 border-t border-white/6 flex flex-col gap-2">
                            <Link to="/login" onClick={() => setMobileOpen(false)}
                                className="text-sm text-gray-400 hover:text-white py-2 transition-colors">Sign in</Link>
                            <Link to="/register" onClick={() => setMobileOpen(false)}
                                className="btn-primary justify-center">Sign up</Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
