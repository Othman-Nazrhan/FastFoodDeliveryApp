import { Payment } from '@/types';
import { supabase } from '@/utils/supabase';

// Function to fetch payments from Supabase
export const fetchPayments = async (): Promise<Payment[]> => {
  try {
    // Check if supabase client is available
    if (!supabase) {
      console.warn('Supabase client not available, using static data');
      return getStaticPayments();
    }

    const { data, error } = await supabase
      .from('payments')
      .select('*');

    if (error) {
      console.error('Error fetching payments:', error);
      // Fallback to static data if API fails
      return getStaticPayments();
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
  } catch (error) {
    console.error('Error fetching payments:', error);
    // Fallback to static data
    return getStaticPayments();
  }
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
