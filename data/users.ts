import { User } from '@/types';
import { supabase } from '@/utils/supabase';

// Function to fetch users from Supabase
export const fetchUsers = async (): Promise<User[]> => {
  const { data, error } = await supabase
    .from('users')
    .select('*');

  if (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }

  // Transform data to match the expected structure
  const users: User[] = data?.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar || undefined,
    joinDate: user.join_date,
    totalOrders: user.total_orders,
    totalSpent: user.total_spent,
  })) || [];

  return users;
};

// Function to create a new user
export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const { data, error } = await supabase
    .from('users')
    .insert({
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      join_date: user.joinDate,
      total_orders: user.totalOrders,
      total_spent: user.totalSpent,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }

  return {
    id: data.id,
    name: data.name,
    email: data.email,
    avatar: data.avatar || undefined,
    joinDate: data.join_date,
    totalOrders: data.total_orders,
    totalSpent: data.total_spent,
  };
};

// Function to update a user
export const updateUser = async (id: string, updates: Partial<User>): Promise<User> => {
  const updateData: any = {};
  if (updates.name !== undefined) updateData.name = updates.name;
  if (updates.email !== undefined) updateData.email = updates.email;
  if (updates.avatar !== undefined) updateData.avatar = updates.avatar;
  if (updates.joinDate !== undefined) updateData.join_date = updates.joinDate;
  if (updates.totalOrders !== undefined) updateData.total_orders = updates.totalOrders;
  if (updates.totalSpent !== undefined) updateData.total_spent = updates.totalSpent;

  const { data, error } = await supabase
    .from('users')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }

  return {
    id: data.id,
    name: data.name,
    email: data.email,
    avatar: data.avatar || undefined,
    joinDate: data.join_date,
    totalOrders: data.total_orders,
    totalSpent: data.total_spent,
  };
};

// Static fallback data (same as before)
const getStaticUsers = (): User[] => [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    joinDate: '2023-01-15',
    totalOrders: 25,
    totalSpent: 450.75,
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    joinDate: '2023-03-22',
    totalOrders: 18,
    totalSpent: 320.50,
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    joinDate: '2023-05-10',
    totalOrders: 32,
    totalSpent: 580.25,
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    joinDate: '2023-07-08',
    totalOrders: 15,
    totalSpent: 275.00,
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david.brown@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    joinDate: '2023-09-14',
    totalOrders: 22,
    totalSpent: 395.80,
  },
];

// Export static data for backward compatibility (deprecated, use fetchUsers instead)
export const mockUsers: User[] = getStaticUsers();
