import { OrderHistory, UserSettings } from '@/types';
import React, { createContext, ReactNode, useContext, useEffect, useReducer, useState } from 'react';
import { useUsers } from '../hooks/use-users';

interface UserState {
  orderHistory: OrderHistory[];
  settings: UserSettings;
}

type UserAction =
  | { type: 'ADD_ORDER'; order: OrderHistory }
  | { type: 'UPDATE_SETTINGS'; settings: Partial<UserSettings> }
  | { type: 'SET_SETTINGS'; settings: UserSettings };

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
    case 'SET_SETTINGS':
      return {
        ...state,
        settings: action.settings,
      };
    default:
      return state;
  }
};

const UserContext = createContext<{
  state: UserState;
  addOrder: (order: OrderHistory) => void;
  updateSettings: (settings: Partial<UserSettings>) => Promise<void>;
} | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { modifyUser, users } = useUsers();

  const defaultSettings: UserSettings = {
    notifications: true,
    vegetarianOnly: false,
    name: '',
    address: '',
    phone: '',
    darkMode: false,
    locationServices: true,
  };

  const [state, dispatch] = useReducer(userReducer, {
    orderHistory: [],
    settings: defaultSettings,
  });

  const [isInitialized, setIsInitialized] = useState(false);

  // Load user settings from Supabase on mount
  useEffect(() => {
    const loadUserSettings = async () => {
      try {
        // Assuming user ID is '1' for now - in real app, get from auth context
        const userId = '1';
        const user = users.find(u => u.id === userId);

        if (user && (user as any).settings) {
          dispatch({ type: 'SET_SETTINGS', settings: (user as any).settings });
        }
      } catch (error) {
        console.error('Error loading user settings:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    if (!isInitialized && users.length > 0) {
      loadUserSettings();
    }
  }, [isInitialized, users]);

  const addOrder = (order: OrderHistory) => {
    dispatch({ type: 'ADD_ORDER', order });
  };

  const updateSettings = async (settings: Partial<UserSettings>) => {
    try {
      // Update local state
      dispatch({ type: 'UPDATE_SETTINGS', settings });

      // Sync to Supabase (assuming user ID is '1' for now)
      await modifyUser('1', { settings: { ...state.settings, ...settings } } as any);
    } catch (error) {
      console.error('Error updating user settings:', error);
      // Revert local state on error
      dispatch({ type: 'UPDATE_SETTINGS', settings: state.settings });
      throw error;
    }
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
