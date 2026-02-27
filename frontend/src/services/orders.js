import api from './api';

export const checkout = async () => {
    const response = await api.post('/orders/checkout');
    return response.data;
};

export const getOrders = async () => {
    const response = await api.get('/orders');
    return response.data.orders;
};
