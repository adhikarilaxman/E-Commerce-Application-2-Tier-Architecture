import { useEffect, useState } from 'react';
import { getProducts } from '../services/products';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Star, Zap, BookOpen, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const formatINR = (amount) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

const SkeletonCard = ({ index }) => (
    <div
        className="rounded-2xl overflow-hidden animate-fade-in"
        style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
            animationDelay: `${index * 80}ms`,
        }}
    >
        <div className="h-56 skeleton" />
        <div className="p-5 space-y-3">
            <div className="skeleton h-5 w-3/4" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-2/3" />
            <div className="skeleton h-10 w-full mt-4 rounded-xl" />
        </div>
    </div>
);

const ProductCard = ({ product, index, onAddToCart, addingId }) => {
    const isAdding = addingId === product._id;

    const categoryColors = [
        { from: '#6366f1', to: '#8b5cf6' },
        { from: '#3b82f6', to: '#6366f1' },
        { from: '#8b5cf6', to: '#ec4899' },
        { from: '#10b981', to: '#3b82f6' },
        { from: '#f59e0b', to: '#ef4444' },
        { from: '#06b6d4', to: '#3b82f6' },
        { from: '#ec4899', to: '#8b5cf6' },
        { from: '#14b8a6', to: '#6366f1' },
        { from: '#f97316', to: '#ef4444' },
    ];
    const color = categoryColors[index % categoryColors.length];

    return (
        <div
            className="product-card rounded-2xl overflow-hidden flex flex-col group animate-fade-in-up"
            style={{ animationDelay: `${index * 80}ms` }}
        >
            {/* Image */}
            <div className="relative h-52 overflow-hidden">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                />
                {/* Gradient overlay */}
                <div
                    className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-300"
                    style={{ background: `linear-gradient(135deg, ${color.from}55, ${color.to}33)` }}
                />
                {/* Price badge top right */}
                <div
                    className="absolute top-3 right-3 px-3 py-1.5 rounded-xl text-white text-sm font-bold shadow-lg"
                    style={{
                        background: `linear-gradient(135deg, ${color.from}, ${color.to})`,
                        boxShadow: `0 4px 15px ${color.from}55`,
                    }}
                >
                    {formatINR(product.price)}
                </div>
                {/* Top left tag */}
                <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                    <Star size={11} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-xs font-medium">4.{5 + (index % 5)}</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-start justify-between gap-2 mb-2">
                    <h3
                        className="text-base font-bold text-white leading-tight line-clamp-2 flex-grow"
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                        {product.name}
                    </h3>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow line-clamp-2">
                    {product.description}
                </p>

                {/* Bottom Row */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1.5">
                        <BookOpen size={13} className="text-gray-500" />
                        <span className="text-gray-500 text-xs">Digital Course</span>
                    </div>
                    <div className="flex items-center gap-1 text-emerald-400">
                        <TrendingUp size={13} />
                        <span className="text-xs font-medium">Bestseller</span>
                    </div>
                </div>

                <button
                    onClick={() => onAddToCart(product._id)}
                    disabled={isAdding}
                    className="w-full py-3 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all duration-300"
                    style={{
                        background: isAdding
                            ? 'rgba(99,102,241,0.4)'
                            : `linear-gradient(135deg, ${color.from}, ${color.to})`,
                        boxShadow: isAdding ? 'none' : `0 4px 20px ${color.from}45`,
                        transform: isAdding ? 'none' : undefined,
                    }}
                    onMouseEnter={e => {
                        if (!isAdding) e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.transform = 'none';
                    }}
                >
                    {isAdding ? (
                        <>
                            <div className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                            Adding...
                        </>
                    ) : (
                        <>
                            <ShoppingBag size={16} />
                            Add to Cart
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addingId, setAddingId] = useState(null);
    const { addToCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (err) {
                console.error('Failed to load products', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleAddToCart = async (productId) => {
        if (!user) {
            navigate('/login');
            return;
        }
        setAddingId(productId);
        await addToCart(productId);
        setAddingId(null);
    };

    return (
        <div className="py-10">
            {/* Hero Header */}
            <div className="text-center mb-12 animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-5 animate-fade-in"
                    style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)', color: '#a5b4fc' }}
                >
                    <Zap size={14} className="text-yellow-400" />
                    Premium Tech Courses in India
                </div>
                <h1
                    className="text-4xl sm:text-5xl font-extrabold mb-4"
                    style={{
                        fontFamily: 'Outfit, sans-serif',
                        background: 'linear-gradient(135deg, #e2e8f0, #818cf8, #c084fc)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}
                >
                    Our Collection
                </h1>
                <p className="text-gray-400 text-lg max-w-xl mx-auto">
                    Level up your skills with our curated courses — all priced in ₹ Indian Rupees
                </p>
            </div>

            {/* Product Grid */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <SkeletonCard key={i} index={i} />
                    ))}
                </div>
            ) : products.length === 0 ? (
                <div className="text-center py-20 glass-card rounded-3xl">
                    <div className="text-6xl mb-4">📦</div>
                    <h3 className="text-xl font-bold text-white mb-2">No products available</h3>
                    <p className="text-gray-400">Check back soon for new arrivals!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product, index) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            index={index}
                            onAddToCart={handleAddToCart}
                            addingId={addingId}
                        />
                    ))}
                </div>
            )}

            {/* Stats Strip */}
            {!loading && products.length > 0 && (
                <div
                    className="mt-14 rounded-2xl p-6 grid grid-cols-3 gap-4 text-center animate-fade-in"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                    {[
                        { label: 'Total Courses', value: `${products.length}+` },
                        { label: 'Happy Learners', value: '12K+' },
                        { label: 'Expert Instructors', value: '50+' },
                    ].map(stat => (
                        <div key={stat.label}>
                            <div
                                className="text-2xl font-extrabold mb-1"
                                style={{
                                    background: 'linear-gradient(135deg, #818cf8, #c084fc)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    fontFamily: 'Outfit, sans-serif',
                                }}
                            >
                                {stat.value}
                            </div>
                            <div className="text-gray-500 text-sm">{stat.label}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Products;
