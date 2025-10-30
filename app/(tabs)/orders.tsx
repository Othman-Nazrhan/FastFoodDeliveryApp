import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useCart } from '@/contexts/CartContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { orderStyles } from '@/styles/orderStyles';
import { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

export default function OrdersScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { state } = useCart();
  const { orderHistory } = state;
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const cardBackground = useThemeColor({}, 'cardBackground');
  const shadowColor = useThemeColor({}, 'shadow');

  const filteredOrders = orderHistory.filter(order => {
    if (filter === 'all') return true;
    // Assuming we add status to OrderHistory later
    return true;
  });

  const renderOrderItem = ({ item }: { item: any }) => (
    <ThemedView style={[orderStyles.orderCard, { backgroundColor: cardBackground, shadowColor }]}>
      <ThemedView style={orderStyles.orderHeader}>
        <ThemedText type="subtitle">Order #{item.id}</ThemedText>
        <ThemedText style={{ color: colors.primary }}>${item.total.toFixed(2)}</ThemedText>
      </ThemedView>
      <ThemedText style={orderStyles.orderDate}>{item.date}</ThemedText>
      <ThemedText style={orderStyles.orderItems}>
        {item.items.length} items • {item.deliveryTime} min delivery
      </ThemedText>
      <TouchableOpacity style={orderStyles.viewDetailsButton}>
        <ThemedText style={{ color: colors.primary }}>View Details</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );

  return (
    <ThemedView style={orderStyles.container}>
      <ThemedView style={orderStyles.header}>
        <ThemedText type="title">Orders</ThemedText>
      </ThemedView>

      {/* Filters */}
      <ThemedView style={orderStyles.filterContainer}>
        <TouchableOpacity
          style={[orderStyles.filterButton, filter === 'all' && { backgroundColor: colors.primary }]}
          onPress={() => setFilter('all')}
        >
          <ThemedText style={[orderStyles.filterText, filter === 'all' && { color: colors.buttonText }]}>All</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[orderStyles.filterButton, filter === 'pending' && { backgroundColor: colors.primary }]}
          onPress={() => setFilter('pending')}
        >
          <ThemedText style={[orderStyles.filterText, filter === 'pending' && { color: colors.buttonText }]}>Pending</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[orderStyles.filterButton, filter === 'completed' && { backgroundColor: colors.primary }]}
          onPress={() => setFilter('completed')}
        >
          <ThemedText style={[orderStyles.filterText, filter === 'completed' && { color: colors.buttonText }]}>Completed</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <FlatList
        data={filteredOrders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={orderStyles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}
