import { createContext, useState, useContext, useEffect } from 'react';
import { getCart, addToCart as addService, removeFromCart as removeService } from '../services/cart';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchCart = async () => {
            if (user) {
                try {
                    const cartData = await getCart();
                    setCart(cartData || []);
                } catch (error) {
                    console.error("Failed to fetch cart", error);
                }
            } else {
                setCart([]);
            }
        };
        fetchCart();
    }, [user]);

    const addToCart = async (productId) => {
        const newCart = await addService(productId);
        setCart(newCart);
    };

    const removeFromCart = async (productId) => {
        const newCart = await removeService(productId);
        setCart(newCart);
    };

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, cartCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
