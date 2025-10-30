import { createPayment, fetchPayments, updatePayment } from '@/data/payments';
import { Payment } from '@/types';
import { useEffect, useState } from 'react';

export const usePayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPayments = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedPayments = await fetchPayments();
      setPayments(fetchedPayments);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load payments';
      setError(errorMessage);
      console.error('Error loading payments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayments();
  }, []);

  const addPayment = async (paymentData: Omit<Payment, 'id'>) => {
    try {
      setError(null);
      const newPayment = await createPayment(paymentData);
      setPayments(prev => [...prev, newPayment]);
      return newPayment;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create payment';
      setError(errorMessage);
      console.error('Error creating payment:', err);
      throw err;
    }
  };

  const modifyPayment = async (id: string, updates: Partial<Payment>) => {
    try {
      setError(null);
      const updatedPayment = await updatePayment(id, updates);
      setPayments(prev => prev.map(payment => payment.id === id ? updatedPayment : payment));
      return updatedPayment;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update payment';
      setError(errorMessage);
      console.error('Error updating payment:', err);
      throw err;
    }
  };



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
    addPayment,
    modifyPayment,
    getPaymentById,
    getPaymentsByUser,
    getPaymentsByStatus,
    getTotalPayments,
    getTotalRevenueFromPayments,
  };
};
