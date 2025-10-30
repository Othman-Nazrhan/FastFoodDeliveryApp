import { fetchPayments, mockPayments } from '@/data/payments';
import { Payment } from '@/types';
import { useEffect, useState } from 'react';

export const usePayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPayments = async () => {
      try {
        setLoading(true);
        const fetchedPayments = await fetchPayments();
        setPayments(fetchedPayments);
      } catch (err) {
        setError('Failed to load payments');
        console.error('Error loading payments:', err);
        // Fallback to static data
        setPayments(mockPayments);
      } finally {
        setLoading(false);
      }
    };

    loadPayments();
  }, []);



  const getPaymentById = (id: string): Payment | undefined => {
    return payments.find(payment => payment.id === id);
  };

  const getPaymentsByUser = (userId: string): Payment[] => {
    return payments.filter(payment => payment.userId === userId);
  };

  const getPaymentsByStatus = (status: 'pending' | 'completed' | 'failed'): Payment[] => {
    return payments.filter(payment => payment.status === status);
  };

  const getTotalPayments = (): number => {
    return payments.length;
  };

  const getTotalRevenueFromPayments = (): number => {
    return payments
      .filter(payment => payment.status === 'completed')
      .reduce((sum, payment) => sum + payment.amount, 0);
  };

  return {
    payments,
    loading,
    error,
    getPaymentById,
    getPaymentsByUser,
    getPaymentsByStatus,
    getTotalPayments,
    getTotalRevenueFromPayments,
  };
};
