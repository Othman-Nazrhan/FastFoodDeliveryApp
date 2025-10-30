import { mockPayments } from '@/data/payments';
import { Payment } from '@/types';
import { useMemo } from 'react';

export const usePayments = () => {
  const payments = useMemo(() => mockPayments, []);

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
    getPaymentById,
    getPaymentsByUser,
    getPaymentsByStatus,
    getTotalPayments,
    getTotalRevenueFromPayments,
  };
};
