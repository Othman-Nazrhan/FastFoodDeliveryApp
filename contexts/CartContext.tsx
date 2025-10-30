import { CartItem, FoodItem, OrderHistory } from '@/types';
import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import { useNotifications } from '../hooks/use-notifications';
import { useOrders } from '../hooks/use-orders';
import { usePayments } from '../hooks/use-payments';

interface CartState {
  items: CartItem[];
  selectedCategory: string | null;
  favorites: string[];
  ratings: { [key: string]: number };
  orderHistory: OrderHistory[];
}

type CartAction =
  | { type: 'ADD_ITEM'; item: FoodItem }
  | { type: 'REMOVE_ITEM'; id: string }
  | { type: 'INCREASE_QUANTITY'; id: string }
  | { type: 'DECREASE_QUANTITY'; id: string }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CATEGORY'; category: string }
  | { type: 'TOGGLE_FAVORITE'; id: string }
  | { type: 'RATE_ITEM'; id: string; rating: number };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.item.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.item.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.item, quantity: 1 }],
        };
      }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id),
      };
    case 'INCREASE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case 'DECREASE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'SET_CATEGORY':
      return { ...state, selectedCategory: action.category };
    case 'TOGGLE_FAVORITE':
      const isFavorite = state.favorites.includes(action.id);
      return {
        ...state,
        favorites: isFavorite
          ? state.favorites.filter(id => id !== action.id)
          : [...state.favorites, action.id],
      };
    case 'RATE_ITEM':
      return {
        ...state,
        ratings: { ...state.ratings, [action.id]: action.rating },
      };
    default:
      return state;
  }
};

const CartContext = createContext<{
  state: CartState;
  addToCart: (item: FoodItem) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  setSelectedCategory: (category: string) => void;
  toggleFavorite: (id: string) => void;
  rateItem: (id: string, rating: number) => void;
  getEstimatedDeliveryTime: () => number;
  placeOrder: (paymentMethod: 'card' | 'paypal' | 'apple_pay' | 'google_pay') => Promise<OrderHistory>;
} | null>(null);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    selectedCategory: null,
    favorites: [],
    ratings: {},
    orderHistory: [],
  });

  const { scheduleNotification } = useNotifications();
  const { addOrder } = useOrders();
  const { addPayment } = usePayments();

  const addToCart = (item: FoodItem) => {
    dispatch({ type: 'ADD_ITEM', item });
    scheduleNotification('Item Added', `${item.name} has been added to your cart.`);
  };

  const removeFromCart = (id: string) => {
    const item = state.items.find(item => item.id === id);
    dispatch({ type: 'REMOVE_ITEM', id });
    if (item) {
      scheduleNotification('Item Removed', `${item.name} has been removed from your cart.`);
    }
  };

  const increaseQuantity = (id: string) => {
    dispatch({ type: 'INCREASE_QUANTITY', id });
  };

  const decreaseQuantity = (id: string) => {
    dispatch({ type: 'DECREASE_QUANTITY', id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getTotal = () => {
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const setSelectedCategory = (category: string) => {
    dispatch({ type: 'SET_CATEGORY', category });
  };

  const toggleFavorite = (id: string) => {
    dispatch({ type: 'TOGGLE_FAVORITE', id });
  };

  const rateItem = (id: string, rating: number) => {
    dispatch({ type: 'RATE_ITEM', id, rating });
  };

  const placeOrder = async (paymentMethod: 'card' | 'paypal' | 'apple_pay' | 'google_pay') => {
    try {
      const total = getTotal();
      const deliveryTime = getEstimatedDeliveryTime();

      // Create order
      const orderData = {
        items: state.items,
        total,
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
        deliveryTime,
      };

      const newOrder = await addOrder(orderData);

      // Create payment
      const paymentData = {
        userId: '1', // TODO: Get from user context
        amount: total,
        method: paymentMethod,
        status: 'completed' as const,
        date: new Date().toISOString().split('T')[0],
        orderId: newOrder.id,
      };

      await addPayment(paymentData);

      // Clear cart after successful order
      clearCart();

      scheduleNotification('Order Placed', `Your order #${newOrder.id} has been placed successfully!`);
      return newOrder;
    } catch (error) {
      console.error('Error placing order:', error);
      scheduleNotification('Order Failed', 'Failed to place order. Please try again.');
      throw error;
    }
  };

  const getEstimatedDeliveryTime = () => {
    const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
    // Base time 15 min + 2 min per item
    return 15 + totalItems * 2;
  };

  return (
    <CartContext.Provider value={{
      state,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      getTotal,
      setSelectedCategory,
      toggleFavorite,
      rateItem,
      getEstimatedDeliveryTime,
      placeOrder
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
