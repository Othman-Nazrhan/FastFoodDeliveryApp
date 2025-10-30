import { Payment } from '@/types';
import { supabase } from '@/utils/supabase';

// Function to fetch payments from Supabase
export const fetchPayments = async (): Promise<Payment[]> => {
  const { data, error } = await supabase
    .from('payments')
    .select('*');

  if (error) {
    throw new Error(`Error fetching payments: ${error.message}`);
  }

  // Transform data to match the expected structure
  const payments: Payment[] = data?.map((payment) => ({
    id: payment.id,
    userId: payment.user_id,
    amount: payment.amount,
    method: payment.method as Payment['method'],
    status: payment.status as Payment['status'],
    date: payment.date,
    orderId: payment.order_id || undefined,
  })) || [];

  return payments;
};

// Function to create a new payment
export const createPayment = async (payment: Omit<Payment, 'id'>): Promise<Payment> => {
  const { data, error } = await supabase
    .from('payments')
    .insert({
      user_id: payment.userId,
      amount: payment.amount,
      method: payment.method,
      status: payment.status,
      date: payment.date,
      order_id: payment.orderId,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Error creating payment: ${error.message}`);
  }

  return {
    id: data.id,
    userId: data.user_id,
    amount: data.amount,
    method: data.method as Payment['method'],
    status: data.status as Payment['status'],
    date: data.date,
    orderId: data.order_id || undefined,
  };
};

// Function to update a payment
export const updatePayment = async (id: string, updates: Partial<Payment>): Promise<Payment> => {
  const updateData: any = {};
  if (updates.userId !== undefined) updateData.user_id = updates.userId;
  if (updates.amount !== undefined) updateData.amount = updates.amount;
  if (updates.method !== undefined) updateData.method = updates.method;
  if (updates.status !== undefined) updateData.status = updates.status;
  if (updates.date !== undefined) updateData.date = updates.date;
  if (updates.orderId !== undefined) updateData.order_id = updates.orderId;

  const { data, error } = await supabase
    .from('payments')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Error updating payment: ${error.message}`);
  }

  return {
    id: data.id,
    userId: data.user_id,
    amount: data.amount,
    method: data.method as Payment['method'],
    status: data.status as Payment['status'],
    date: data.date,
    orderId: data.order_id || undefined,
  };
};

// Static fallback data (same as before)
const getStaticPayments = (): Payment[] => [
  {
    id: '1',
    userId: '1',
    amount: 25.96,
    method: 'card',
    status: 'completed',
    date: '2024-10-01',
    orderId: '1',
  },
  {
    id: '2',
    userId: '2',
    amount: 26.96,
    method: 'paypal',
    status: 'completed',
    date: '2024-10-02',
    orderId: '2',
  },
  {
    id: '3',
    userId: '3',
    amount: 27.97,
    method: 'apple_pay',
    status: 'completed',
    date: '2024-10-03',
    orderId: '3',
  },
  {
    id: '4',
    userId: '4',
    amount: 20.97,
    method: 'card',
    status: 'completed',
    date: '2024-10-04',
    orderId: '4',
  },
  {
    id: '5',
    userId: '5',
    amount: 19.98,
    method: 'google_pay',
    status: 'completed',
    date: '2024-10-05',
    orderId: '5',
  },
  {
    id: '6',
    userId: '1',
    amount: 30.96,
    method: 'card',
    status: 'pending',
    date: '2024-10-06',
    orderId: '6',
  },
  {
    id: '7',
    userId: '3',
    amount: 24.97,
    method: 'paypal',
    status: 'failed',
    date: '2024-10-07',
    orderId: '7',
  },
];

// Export static data for backward compatibility (deprecated, use fetchPayments instead)
export const mockPayments: Payment[] = getStaticPayments();
