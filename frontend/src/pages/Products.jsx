import { useEffect, useState } from 'react';
import { getProducts } from '../services/products';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { formatINR } from '../utils/format';

const SkeletonCard = () => (
    <div className="card overflow-hidden">
        <div className="h-48 skeleton rounded-none" />
        <div className="p-4 space-y-3">
            <div className="skeleton h-4 w-3/4" />
            <div className="skeleton h-3 w-full" />
            <div className="skeleton h-3 w-2/3" />
            <div className="skeleton h-9 w-full mt-2" />
        </div>
    </div>
);

const ProductCard = ({ product, onAddToCart, isAdding }) => (
    <div className="card overflow-hidden flex flex-col group">
        <div className="h-48 overflow-hidden flex-shrink-0">
            <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
            />
        </div>
        <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-sm font-semibold text-white leading-snug mb-1.5 line-clamp-2">
                {product.name}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-grow line-clamp-2">
                {product.description}
            </p>
            <div className="flex items-center justify-between gap-3">
                <span className="text-base font-bold text-white">{formatINR(product.price)}</span>
                <button
                    onClick={() => onAddToCart(product._id)}
                    disabled={isAdding}
                    className="btn-primary text-xs py-2 px-3 flex-shrink-0"
                >
                    {isAdding
                        ? <div className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        : <><ShoppingCart size={13} /> Add to cart</>
                    }
                </button>
            </div>
        </div>
    </div>
);

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addingId, setAddingId] = useState(null);
    const { addToCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        getProducts()
            .then(setProducts)
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const handleAddToCart = async (productId) => {
        if (!user) return navigate('/login');
        setAddingId(productId);
        await addToCart(productId);
        setAddingId(null);
        navigate('/cart');
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-xl font-bold text-white mb-1">Courses</h1>
                <p className="text-sm text-gray-500">Premium tech courses, priced in ₹</p>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
                </div>
            ) : products.length === 0 ? (
                <div className="text-center py-24 card">
                    <p className="text-gray-400 font-medium">No products available</p>
                    <p className="text-sm text-gray-600 mt-1">Check back soon.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            onAddToCart={handleAddToCart}
                            isAdding={addingId === product._id}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Products;
