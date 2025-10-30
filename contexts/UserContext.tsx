import { OrderHistory, UserSettings } from '@/types';
import React, { createContext, ReactNode, useContext, useReducer } from 'react';

interface UserState {
  orderHistory: OrderHistory[];
  settings: UserSettings;
}

type UserAction =
  | { type: 'ADD_ORDER'; order: OrderHistory }
  | { type: 'UPDATE_SETTINGS'; settings: Partial<UserSettings> };

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
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

const UserContext = createContext<{
  state: UserState;
  addOrder: (order: OrderHistory) => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
} | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const defaultSettings: UserSettings = {
    notifications: true,
    vegetarianOnly: false,
    name: '',
    address: '',
  };

  const [state, dispatch] = useReducer(userReducer, {
    orderHistory: [],
    settings: defaultSettings,
  });

  const addOrder = (order: OrderHistory) => {
    dispatch({ type: 'ADD_ORDER', order });
  };

  const updateSettings = (settings: Partial<UserSettings>) => {
    dispatch({ type: 'UPDATE_SETTINGS', settings });
  };

  return (
    <UserContext.Provider value={{
      state,
      addOrder,
      updateSettings,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
