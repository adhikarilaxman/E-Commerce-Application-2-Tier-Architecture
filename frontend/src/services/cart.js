import api from './api';

export const getCart = async () => {
    const response = await api.get('/cart');
    return response.data.cart;
};

export const addToCart = async (productId) => {
    const response = await api.post(`/cart/add/${productId}`);
    return response.data.cart;
};

export const removeFromCart = async (productId) => {
    const response = await api.post(`/cart/remove/${productId}`);
    return response.data.cart;
};
