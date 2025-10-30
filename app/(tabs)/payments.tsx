import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { mockPayments } from '@/data/payments';
import { useThemeColor } from '@/hooks/use-theme-color';
import { paymentsStyles } from '@/styles/paymentsStyles';
import { FlatList } from 'react-native';

export default function PaymentsScreen() {
  const cardBackground = useThemeColor({}, 'cardBackground');
  const shadowColor = useThemeColor({}, 'shadow');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return Colors.light.success;
      case 'pending': return Colors.light.secondary;
      case 'failed': return Colors.light.error;
      default: return Colors.light.secondary;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'card': return 'creditcard.fill';
      case 'paypal': return 'dollarsign.circle.fill';
      case 'apple_pay': return 'applelogo';
      case 'google_pay': return 'g.circle.fill';
      default: return 'creditcard.fill';
    }
  };

  const renderPaymentItem = ({ item }: { item: any }) => (
    <ThemedView style={[paymentsStyles.paymentCard, { backgroundColor: cardBackground, shadowColor }]}>
      <ThemedView style={paymentsStyles.paymentHeader}>
        <IconSymbol name={getPaymentMethodIcon(item.method)} size={24} color={Colors.light.primary} />
        <ThemedView style={paymentsStyles.paymentInfo}>
          <ThemedText type="subtitle">${item.amount.toFixed(2)}</ThemedText>
          <ThemedText style={paymentsStyles.paymentMethod}>
            {item.method.charAt(0).toUpperCase() + item.method.slice(1).replace('_', ' ')}
          </ThemedText>
        </ThemedView>
        <ThemedView style={[paymentsStyles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
          <ThemedText style={[paymentsStyles.statusText, { color: getStatusColor(item.status) }]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedView style={paymentsStyles.paymentDetails}>
        <ThemedText style={paymentsStyles.paymentDate}>{item.date}</ThemedText>
        <ThemedText style={paymentsStyles.orderId}>Order #{item.orderId}</ThemedText>
      </ThemedView>
    </ThemedView>
  );

  return (
    <ThemedView style={paymentsStyles.container}>
      <ThemedView style={paymentsStyles.header}>
        <ThemedText type="title">Payments</ThemedText>
        <ThemedText style={paymentsStyles.subtitle}>{mockPayments.length} total transactions</ThemedText>
      </ThemedView>

      <FlatList
        data={mockPayments}
        renderItem={renderPaymentItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={paymentsStyles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}
