import { mockUsers } from '@/data/users';
import { User } from '@/types';
import { useMemo } from 'react';

export const useUsers = () => {
  const users = useMemo(() => mockUsers, []);

  const getUserById = (id: string): User | undefined => {
    return users.find(user => user.id === id);
  };

  const getTotalUsers = (): number => {
    return users.length;
  };

  const getTotalSpentByUser = (userId: string): number => {
    const user = getUserById(userId);
    return user ? user.totalSpent : 0;
  };

  const getTopUsersByOrders = (limit: number = 5): User[] => {
    return users.sort((a, b) => b.totalOrders - a.totalOrders).slice(0, limit);
  };

  return {
    users,
    getUserById,
    getTotalUsers,
    getTotalSpentByUser,
    getTopUsersByOrders,
  };
};
