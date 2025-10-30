import { CategoryData, OrderHistory, SalesData, TopProduct } from '@/types';
import {
  calculateCategoryData,
  calculateSalesData,
  calculateTopProducts,
  calculateTotalRevenue,
  filterOrdersByDateRange,
  getFavoriteBurger,
  getPendingOrdersCount,
  getRecentOrders
} from '@/utils/dataUtils';
import { useEffect, useMemo, useState } from 'react';
import { useOrders } from './use-orders';

export const useStatsData = (filter: 'all' | 'week' | 'month' = 'all') => {
  const { orders: orderHistory } = useOrders();
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [recentOrders, setRecentOrders] = useState<OrderHistory[]>([]);

  const filteredOrderHistory = useMemo(() => filterOrdersByDateRange(orderHistory, filter), [orderHistory, filter]);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [sales, categories, topProds, revenue, recent] = await Promise.all([
          calculateSalesData(filteredOrderHistory),
          calculateCategoryData(filteredOrderHistory),
          calculateTopProducts(filteredOrderHistory),
          calculateTotalRevenue(filteredOrderHistory),
          getRecentOrders(filteredOrderHistory)
        ]);

        setSalesData(sales);
        setCategoryData(categories);
        setTopProducts(topProds);
        setTotalRevenue(revenue);
        setRecentOrders(recent);
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    };

    loadStats();
  }, [filteredOrderHistory]);

  const favoriteBurger: string = useMemo(() => getFavoriteBurger(topProducts), [topProducts]);

  const pendingOrdersCount: number = useMemo(() => getPendingOrdersCount(), []);

  return {
    salesData,
    categoryData,
    topProducts,
    totalRevenue,
    recentOrders,
    favoriteBurger,
    pendingOrdersCount,
  };
};
