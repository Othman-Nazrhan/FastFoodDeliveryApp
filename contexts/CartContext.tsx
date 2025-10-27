import React, { createContext, ReactNode, useContext, useReducer } from 'react';

export interface FoodItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  isVegetarian?: boolean;
}

export interface CartItem extends FoodItem {
  quantity: number;
}

export interface OrderHistory {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  deliveryTime: number;
}

export interface UserSettings {
  notifications: boolean;
  vegetarianOnly: boolean;
  name: string;
  address: string;
}

interface CartState {
  items: CartItem[];
  selectedCategory: string | null;
  favorites: string[];
  ratings: { [key: string]: number };
  orderHistory: OrderHistory[];
  settings: UserSettings;
}

type CartAction =
  | { type: 'ADD_ITEM'; item: FoodItem }
  | { type: 'REMOVE_ITEM'; id: string }
  | { type: 'INCREASE_QUANTITY'; id: string }
  | { type: 'DECREASE_QUANTITY'; id: string }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CATEGORY'; category: string }
  | { type: 'TOGGLE_FAVORITE'; id: string }
  | { type: 'RATE_ITEM'; id: string; rating: number }
  | { type: 'ADD_ORDER'; order: OrderHistory }
  | { type: 'UPDATE_SETTINGS'; settings: Partial<UserSettings> };

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
    case 'ADD_ORDER':
      return {
        ...state,
        orderHistory: [action.order, ...state.orderHistory],
      };
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.settings },
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
  addOrder: (order: OrderHistory) => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
  getEstimatedDeliveryTime: () => number;
} | null>(null);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const defaultSettings: UserSettings = {
    notifications: true,
    vegetarianOnly: false,
    name: '',
    address: '',
  };

  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    selectedCategory: null,
    favorites: [],
    ratings: {},
    orderHistory: [],
    settings: defaultSettings,
  });

  const addToCart = (item: FoodItem) => {
    dispatch({ type: 'ADD_ITEM', item });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', id });
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

  const addOrder = (order: OrderHistory) => {
    dispatch({ type: 'ADD_ORDER', order });
  };

  const updateSettings = (settings: Partial<UserSettings>) => {
    dispatch({ type: 'UPDATE_SETTINGS', settings });
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
      addOrder,
      updateSettings,
      getEstimatedDeliveryTime
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
