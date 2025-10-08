import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useCart } from '@/contexts/CartContext';
import { useThemeColor } from '@/hooks/use-theme-color';
import { statsStyles } from '@/styles/statsStyles';
import { ScrollView } from 'react-native';

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
      <ThemedView style={statsStyles.titleContainer}>
        <ThemedText type="title">Dashboard</ThemedText>
      </ThemedView>
      <ThemedView style={statsStyles.statsContainer}>
        <ThemedView style={[statsStyles.statCard, { backgroundColor: cardBackground, shadowColor }]}>
          <ThemedText type="subtitle">Total Items in Cart</ThemedText>
          <ThemedText type="title">{totalItems}</ThemedText>
        </ThemedView>
        <ThemedView style={[statsStyles.statCard, { backgroundColor: cardBackground, shadowColor }]}>
          <ThemedText type="subtitle">Unique Items</ThemedText>
          <ThemedText type="title">{uniqueItems}</ThemedText>
        </ThemedView>
        <ThemedView style={[statsStyles.statCard, { backgroundColor: cardBackground, shadowColor }]}>
          <ThemedText type="subtitle">Total Price</ThemedText>
          <ThemedText type="title">${totalPrice.toFixed(2)}</ThemedText>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}
