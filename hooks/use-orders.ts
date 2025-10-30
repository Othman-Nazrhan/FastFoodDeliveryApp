import { createOrder, fetchOrders, updateOrder } from '@/data/orders';
import { OrderHistory } from '@/types';
import { useEffect, useState } from 'react';

export const useOrders = () => {
  const [orders, setOrders] = useState<OrderHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedOrders = await fetchOrders();
      setOrders(fetchedOrders);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load orders';
      setError(errorMessage);
      console.error('Error loading orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const addOrder = async (orderData: Omit<OrderHistory, 'id'>) => {
    try {
      setError(null);
      const newOrder = await createOrder(orderData);
      setOrders(prev => [newOrder, ...prev]);
      return newOrder;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create order';
      setError(errorMessage);
      console.error('Error creating order:', err);
      throw err;
    }
  };

  const modifyOrder = async (id: string, updates: Partial<OrderHistory>) => {
    try {
      setError(null);
      const updatedOrder = await updateOrder(id, updates);
      setOrders(prev => prev.map(order => order.id === id ? updatedOrder : order));
      return updatedOrder;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update order';
      setError(errorMessage);
      console.error('Error updating order:', err);
      throw err;
    }
  };



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
    addOrder,
    modifyOrder,
    getOrderById,
    getOrdersByUser,
    getTotalOrders,
    getTotalRevenue,
  };
};
