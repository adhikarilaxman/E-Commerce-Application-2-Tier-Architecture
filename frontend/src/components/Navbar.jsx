import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, PackageSearch, Menu, X, LogOut, User, Package, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleLogout = async () => {
        await logout();
        setMobileOpen(false);
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    const navLinkClass = (path) =>
        `px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
            isActive(path)
                ? 'text-brand-300 bg-brand-500/15 shadow-sm shadow-brand-500/10'
                : 'text-gray-400 hover:text-white hover:bg-white/8'
        }`;

    return (
        <nav
            className="sticky top-0 z-50 transition-all duration-300"
            style={{
                background: scrolled
                    ? 'rgba(8, 8, 25, 0.92)'
                    : 'rgba(10, 10, 30, 0.7)',
                backdropFilter: 'blur(24px)',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.5)' : 'none',
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                            style={{
                                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                boxShadow: '0 4px 15px rgba(99,102,241,0.4)',
                            }}
                        >
                            <PackageSearch size={18} className="text-white" />
                        </div>
                        <span
                            className="font-bold text-xl tracking-tight"
                            style={{
                                fontFamily: 'Outfit, sans-serif',
                                background: 'linear-gradient(135deg, #818cf8, #c084fc)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            ShopApp
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        <Link to="/products" className={navLinkClass('/products')}>Products</Link>
                        {user ? (
                            <>
                                <Link to="/cart" className={`${navLinkClass('/cart')} flex items-center gap-1.5 relative`}>
                                    <ShoppingCart size={16} />
                                    <span>Cart</span>
                                    {cartCount > 0 && (
                                        <span
                                            className="absolute -top-1.5 -right-1.5 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce-in"
                                            style={{ background: 'linear-gradient(135deg, #f43f5e, #e11d48)', boxShadow: '0 2px 8px rgba(244,63,94,0.5)' }}
                                        >
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>
                                <Link to="/orders" className={`${navLinkClass('/orders')} flex items-center gap-1.5`}>
                                    <Package size={16} />
                                    <span>Orders</span>
                                </Link>

                                {/* User area */}
                                <div className="ml-3 flex items-center gap-2 pl-4 border-l border-white/8">
                                    <div
                                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium text-brand-300"
                                        style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}
                                    >
                                        <div className="w-6 h-6 rounded-full bg-brand-500/30 flex items-center justify-center">
                                            <User size={12} className="text-brand-300" />
                                        </div>
                                        {user.username}
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="text-gray-500 hover:text-rose-400 p-2 rounded-xl hover:bg-rose-500/10 transition-all duration-200"
                                        title="Logout"
                                    >
                                        <LogOut size={17} />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="ml-3 flex items-center gap-2 pl-4 border-l border-white/8">
                                <Link
                                    to="/login"
                                    className="text-gray-400 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-white/8"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
                                    style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 4px 15px rgba(99,102,241,0.35)' }}
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden text-gray-400 hover:text-white p-2 rounded-xl hover:bg-white/8 transition-all duration-200"
                    >
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {mobileOpen && (
                <div
                    className="md:hidden border-t border-white/6 animate-fade-in-down"
                    style={{ background: 'rgba(8,8,25,0.97)', backdropFilter: 'blur(24px)' }}
                >
                    <div className="px-4 py-4 space-y-1">
                        <Link
                            to="/products"
                            onClick={() => setMobileOpen(false)}
                            className={`${navLinkClass('/products')} block`}
                        >
                            Products
                        </Link>
                        {user ? (
                            <>
                                <Link
                                    to="/cart"
                                    onClick={() => setMobileOpen(false)}
                                    className={`${navLinkClass('/cart')} flex items-center gap-1.5`}
                                >
                                    <ShoppingCart size={16} />
                                    Cart
                                    {cartCount > 0 && (
                                        <span
                                            className="text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center ml-1"
                                            style={{ background: 'linear-gradient(135deg, #f43f5e, #e11d48)' }}
                                        >
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>
                                <Link
                                    to="/orders"
                                    onClick={() => setMobileOpen(false)}
                                    className={`${navLinkClass('/orders')} flex items-center gap-1.5`}
                                >
                                    <Package size={16} />
                                    Orders
                                </Link>
                                <div className="pt-3 mt-3 border-t border-white/8">
                                    <div className="text-brand-300 px-4 py-2 text-sm font-medium flex items-center gap-2">
                                        <User size={14} />
                                        {user.username}
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left text-rose-400 hover:bg-rose-500/10 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2"
                                    >
                                        <LogOut size={15} />
                                        Sign Out
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="pt-3 mt-3 border-t border-white/8 space-y-2">
                                <Link
                                    to="/login"
                                    onClick={() => setMobileOpen(false)}
                                    className="block text-gray-400 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={() => setMobileOpen(false)}
                                    className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-white text-center"
                                    style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
