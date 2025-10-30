import { mockOrderHistory } from '@/data/orders';
import { OrderHistory } from '@/types';
import { useMemo } from 'react';

export const useOrders = () => {
  const orders = useMemo(() => mockOrderHistory, []);

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
    getOrderById,
    getOrdersByUser,
    getTotalOrders,
    getTotalRevenue,
  };
};
