import { foodItems } from '@/data/foodItems';
import { mockOrderHistory as orders } from '@/data/orders';
import { CategoryData, OrderHistory, SalesData, TopProduct } from '@/types';

export const calculateSalesData = (orderHistory: OrderHistory[] = orders): SalesData[] => {
  const salesData = (orderHistory || []).reduce((acc, order) => {
    const date = new Date(order.date);
    const key = date.toISOString().split('T')[0];
    acc[key] = (acc[key] || 0) + order.total;
    return acc;
  }, {} as { [key: string]: number });

  return Object.entries(salesData).map(([date, total]) => ({
    date,
    total,
  }));
};

export const calculateCategoryData = (orderHistory: OrderHistory[] = orders): CategoryData[] => {
  return Object.keys(foodItems).map(category => {
    const itemsInCategory = foodItems[category];
    const totalSold = itemsInCategory.reduce((sum, item) => {
      const sold = (orderHistory || []).reduce((itemSum, order) => {
        const orderItem = order.items.find(oi => oi.id === item.id);
        return itemSum + (orderItem ? orderItem.quantity : 0);
      }, 0);
      return sum + sold;
    }, 0);
    return {
      name: category.charAt(0).toUpperCase() + category.slice(1),
      quantity: totalSold,
      color: category === 'burgers' ? '#FF4B3E' : category === 'pizzas' ? '#E53935' : category === 'fries' ? '#FFC107' : '#4CAF50',
      legendFontColor: '#333333',
      legendFontSize: 15,
    };
  });
};

export const calculateTopProducts = (orderHistory: OrderHistory[] = orders, limit: number = 5): TopProduct[] => {
  return Object.values(foodItems).flat().map(item => {
    const totalSold = (orderHistory || []).reduce((sum, order) => {
      const orderItem = order.items.find(oi => oi.id === item.id);
      return sum + (orderItem ? orderItem.quantity : 0);
    }, 0);
    return { ...item, totalSold };
  }).sort((a, b) => b.totalSold - a.totalSold).slice(0, limit);
};

export const calculateTotalRevenue = (orderHistory: OrderHistory[] = orders): number => {
  return (orderHistory || []).reduce((sum, order) => sum + order.total, 0);
};

export const getRecentOrders = (orderHistory: OrderHistory[] = orders, limit: number = 3): OrderHistory[] => {
  return orderHistory.slice(-limit);
};

export const filterOrdersByDateRange = (orderHistory: OrderHistory[], filter: 'all' | 'week' | 'month'): OrderHistory[] => {
  const now = new Date();
  let startDate: Date;

  switch (filter) {
    case 'week':
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case 'month':
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    default:
      return orderHistory;
  }

  return orderHistory.filter(order => new Date(order.date) >= startDate);
};

export const getFavoriteBurger = (topProducts: TopProduct[]): string => {
  return topProducts.find(p => p.category === 'burgers')?.name || 'Classic Burger';
};

export const getPendingOrdersCount = (): number => {
  // Mock implementation - in real app, this would check order status
  return 2;
};
