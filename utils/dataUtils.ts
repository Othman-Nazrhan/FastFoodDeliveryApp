import { fetchFoodItems } from '@/data/foodItems';
import { fetchOrders } from '@/data/orders';
import { CategoryData, OrderHistory, SalesData, TopProduct } from '@/types';

export const calculateSalesData = async (orderHistory?: OrderHistory[]): Promise<SalesData[]> => {
  const orders = orderHistory || await fetchOrders();
  const salesData = (orders || []).reduce((acc: { [key: string]: number }, order: OrderHistory) => {
    const date = new Date(order.date);
    const key = date.toISOString().split('T')[0];
    acc[key] = (acc[key] || 0) + order.total;
    return acc;
  }, {} as { [key: string]: number });

  return Object.entries(salesData).map(([date, total]) => ({
    date,
    total: total as number,
  }));
};

export const calculateCategoryData = async (orderHistory?: OrderHistory[]): Promise<CategoryData[]> => {
  const orders = orderHistory || await fetchOrders();
  const foodItems = await fetchFoodItems();

  return Object.keys(foodItems).map(category => {
    const itemsInCategory = foodItems[category];
    const totalSold = itemsInCategory.reduce((sum: number, item) => {
      const sold = (orders || []).reduce((itemSum: number, order: OrderHistory) => {
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

export const calculateTopProducts = async (orderHistory?: OrderHistory[], limit: number = 5): Promise<TopProduct[]> => {
  const orders = orderHistory || await fetchOrders();
  const foodItems = await fetchFoodItems();

  return Object.values(foodItems).flat().map(item => {
    const totalSold = (orders || []).reduce((sum: number, order: OrderHistory) => {
      const orderItem = order.items.find(oi => oi.id === item.id);
      return sum + (orderItem ? orderItem.quantity : 0);
    }, 0);
    return { ...item, totalSold };
  }).sort((a, b) => b.totalSold - a.totalSold).slice(0, limit);
};

export const calculateTotalRevenue = async (orderHistory?: OrderHistory[]): Promise<number> => {
  const orders = orderHistory || await fetchOrders();
  return (orders || []).reduce((sum: number, order: OrderHistory) => sum + order.total, 0);
};

export const getRecentOrders = async (orderHistory?: OrderHistory[], limit: number = 3): Promise<OrderHistory[]> => {
  const orders = orderHistory || await fetchOrders();
  return orders.slice(-limit);
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
