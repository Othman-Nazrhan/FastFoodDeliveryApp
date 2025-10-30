import { createUser, fetchUsers, updateUser } from '@/data/users';
import { User } from '@/types';
import { useEffect, useState } from 'react';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load users';
      setError(errorMessage);
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const addUser = async (userData: Omit<User, 'id'>) => {
    try {
      setError(null);
      const newUser = await createUser(userData);
      setUsers(prev => [...prev, newUser]);
      return newUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create user';
      setError(errorMessage);
      console.error('Error creating user:', err);
      throw err;
    }
  };

  const modifyUser = async (id: string, updates: Partial<User>) => {
    try {
      setError(null);
      const updatedUser = await updateUser(id, updates);
      setUsers(prev => prev.map(user => user.id === id ? updatedUser : user));
      return updatedUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update user';
      setError(errorMessage);
      console.error('Error updating user:', err);
      throw err;
    }
  };

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
    addUser,
    modifyUser,
    getUserById,
    getTotalUsers,
    getTotalSpentByUser,
    getTopUsersByOrders,
  };
};
