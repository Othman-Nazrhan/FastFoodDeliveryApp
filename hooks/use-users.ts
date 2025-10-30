import { fetchUsers, mockUsers } from '@/data/users';
import { User } from '@/types';
import { useEffect, useState } from 'react';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (err) {
        setError('Failed to load users');
        console.error('Error loading users:', err);
        // Fallback to static data
        setUsers(mockUsers);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

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
    loading,
    error,
    getUserById,
    getTotalUsers,
    getTotalSpentByUser,
    getTopUsersByOrders,
  };
};
