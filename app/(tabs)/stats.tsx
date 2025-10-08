import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useCart } from '@/contexts/CartContext';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ScrollView, StyleSheet } from 'react-native';

export default function StatsScreen() {
  const { state, getTotal } = useCart();
  const { items } = state;

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = getTotal();
  const uniqueItems = items.length;

  const cardBackground = useThemeColor({}, 'cardBackground');
  const shadowColor = useThemeColor({}, 'shadow');

  return (
    <ScrollView style={{ flex: 1 }}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Dashboard</ThemedText>
      </ThemedView>
      <ThemedView style={styles.statsContainer}>
        <ThemedView style={[styles.statCard, { backgroundColor: cardBackground, shadowColor }]}>
          <ThemedText type="subtitle">Total Items in Cart</ThemedText>
          <ThemedText type="title">{totalItems}</ThemedText>
        </ThemedView>
        <ThemedView style={[styles.statCard, { backgroundColor: cardBackground, shadowColor }]}>
          <ThemedText type="subtitle">Unique Items</ThemedText>
          <ThemedText type="title">{uniqueItems}</ThemedText>
        </ThemedView>
        <ThemedView style={[styles.statCard, { backgroundColor: cardBackground, shadowColor }]}>
          <ThemedText type="subtitle">Total Price</ThemedText>
          <ThemedText type="title">${totalPrice.toFixed(2)}</ThemedText>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerPlaceholder: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  statsContainer: {
    paddingHorizontal: 16,
  },
  statCard: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
});
