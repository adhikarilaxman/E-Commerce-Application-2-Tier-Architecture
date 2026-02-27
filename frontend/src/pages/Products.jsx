import { useEffect, useState } from 'react';
import { getProducts } from '../services/products';
import { useCart } from '../context/CartContext';
import { ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (err) {
                console.error("Failed to load products", err);
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
        await addToCart(productId);
    };

    if (loading) {
        return <div className="text-center py-20 text-gray-500 text-xl font-medium">Loading amazing products...</div>;
    }

    return (
        <div className="py-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">Our Collection</h1>

            {products.length === 0 ? (
                <div className="text-center text-gray-500 py-10">No products available at the moment.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map(product => (
                        <div key={product._id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col">
                            <div className="h-64 overflow-hidden relative group bg-gray-50">
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full h-full object-cover origin-center transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                                    <span className="text-lg font-extrabold text-blue-600">${product.price.toFixed(2)}</span>
                                </div>
                                <p className="text-gray-500 text-sm mb-6 flex-grow line-clamp-2">{product.description}</p>

                                <button
                                    onClick={() => handleAddToCart(product._id)}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                                >
                                    <ShoppingBag size={20} />
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Products;
