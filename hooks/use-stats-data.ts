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
import { useMemo } from 'react';

export const useStatsData = (orderHistory: OrderHistory[], filter: 'all' | 'week' | 'month' = 'all') => {
  const filteredOrderHistory = useMemo(() => filterOrdersByDateRange(orderHistory, filter), [orderHistory, filter]);

  const salesData: SalesData[] = useMemo(() => calculateSalesData(filteredOrderHistory), [filteredOrderHistory]);

  const categoryData: CategoryData[] = useMemo(() => calculateCategoryData(filteredOrderHistory), [filteredOrderHistory]);

  const topProducts: TopProduct[] = useMemo(() => calculateTopProducts(filteredOrderHistory), [filteredOrderHistory]);

  const totalRevenue: number = useMemo(() => calculateTotalRevenue(filteredOrderHistory), [filteredOrderHistory]);

  const recentOrders: OrderHistory[] = useMemo(() => getRecentOrders(filteredOrderHistory), [filteredOrderHistory]);

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
