import { fetchOrders, mockOrderHistory } from '@/data/orders';
import { OrderHistory } from '@/types';
import { useEffect, useMemo, useState } from 'react';

export const useOrders = () => {
  const [orders, setOrders] = useState<OrderHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const fetchedOrders = await fetchOrders();
        setOrders(fetchedOrders);
      } catch (err) {
        setError('Failed to load orders');
        console.error('Error loading orders:', err);
        // Fallback to static data
        setOrders(mockOrderHistory);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  // Fallback to static data if API fails
  const fallbackOrders = useMemo(() => mockOrderHistory, []);

  const getOrderById = (id: string): OrderHistory | undefined => {
    return orders.find(order => order.id === id);
  };

  const getOrdersByUser = (userId: string): OrderHistory[] => {
    return orders.filter(order => order.items.some(item => item.id === userId));
  };

  const getTotalOrders = (): number => {
    return orders.length;
  };

  const getTotalRevenue = (): number => {
    return orders.reduce((sum, order) => sum + order.total, 0);
  };

  return {
    orders,
    loading,
    error,
    getOrderById,
    getOrdersByUser,
    getTotalOrders,
    getTotalRevenue,
  };
};
