import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useCart } from '@/contexts/CartContext';
import { useStatsData } from '@/hooks/use-stats-data';
import { useThemeColor } from '@/hooks/use-theme-color';
import { statsStyles } from '@/styles/statsStyles';
import { useState } from 'react';
import { Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';


const screenWidth = Dimensions.get('window').width;

export default function StatsScreen() {
  const { state, getTotal } = useCart();
  const { items, orderHistory } = state;
  const [filter, setFilter] = useState<'all' | 'week' | 'month'>('all');

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = getTotal();
  const uniqueItems = items.length;

  const cardBackground = useThemeColor({}, 'cardBackground');
  const shadowColor = useThemeColor({}, 'shadow');

  const {
    salesData,
    categoryData,
    topProducts,
    totalRevenue,
    recentOrders,
    favoriteBurger,
    pendingOrdersCount,
  } = useStatsData(orderHistory, filter);

  const chartConfig = {
    backgroundGradientFrom: cardBackground,
    backgroundGradientTo: cardBackground,
    color: (opacity = 1) => `rgba(255, 75, 62, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <ThemedView style={statsStyles.titleContainer}>
        <ThemedText type="title">Dashboard</ThemedText>
      </ThemedView>

      {/* Filters */}
      <ThemedView style={statsStyles.filterContainer}>
        <TouchableOpacity
          style={[statsStyles.filterButton, filter === 'all' && { backgroundColor: Colors.light.primary }]}
          onPress={() => setFilter('all')}
        >
          <ThemedText style={[statsStyles.filterText, filter === 'all' && { color: Colors.light.buttonText }]}>All</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[statsStyles.filterButton, filter === 'week' && { backgroundColor: Colors.light.primary }]}
          onPress={() => setFilter('week')}
        >
          <ThemedText style={[statsStyles.filterText, filter === 'week' && { color: Colors.light.buttonText }]}>Week</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[statsStyles.filterButton, filter === 'month' && { backgroundColor: Colors.light.primary }]}
          onPress={() => setFilter('month')}
        >
          <ThemedText style={[statsStyles.filterText, filter === 'month' && { color: Colors.light.buttonText }]}>Month</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Key Metrics */}
      <ThemedView style={statsStyles.statsContainer}>
        <ThemedView style={[statsStyles.statCard, { backgroundColor: cardBackground, shadowColor }]}>
          <IconSymbol name="cart.fill" size={24} color={Colors.light.primary} />
          <ThemedText type="subtitle">Total Items in Cart</ThemedText>
          <ThemedText type="title" style={{ fontSize: 32, color: Colors.light.primary }}>{totalItems}</ThemedText>
        </ThemedView>
        <ThemedView style={[statsStyles.statCard, { backgroundColor: cardBackground, shadowColor }]}>
          <IconSymbol name="number" size={24} color={Colors.light.secondary} />
          <ThemedText type="subtitle">Unique Items</ThemedText>
          <ThemedText type="title" style={{ fontSize: 32, color: Colors.light.secondary }}>{uniqueItems}</ThemedText>
        </ThemedView>
        <ThemedView style={[statsStyles.statCard, { backgroundColor: cardBackground, shadowColor }]}>
          <IconSymbol name="dollarsign.circle.fill" size={24} color={Colors.light.success} />
          <ThemedText type="subtitle">Total Price</ThemedText>
          <ThemedText type="title" style={{ fontSize: 32, color: Colors.light.success }}>${totalPrice.toFixed(2)}</ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Sales Trend Chart */}
      <ThemedView style={[statsStyles.chartContainer, { backgroundColor: cardBackground, shadowColor }]}>
        <ThemedText type="subtitle" style={statsStyles.chartTitle}>Sales Trend</ThemedText>
        <LineChart
          data={{
            labels: salesData.map(d => new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
            datasets: [{
              data: salesData.map(d => d.total),
            }],
          }}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={statsStyles.chart}
        />
      </ThemedView>

      {/* Category Distribution */}
      <ThemedView style={[statsStyles.chartContainer, { backgroundColor: cardBackground, shadowColor }]}>
        <ThemedText type="subtitle" style={statsStyles.chartTitle}>Category Distribution</ThemedText>
        <PieChart
          data={categoryData}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          accessor="quantity"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </ThemedView>

      {/* Top Products */}
      <ThemedView style={[statsStyles.sectionContainer, { backgroundColor: cardBackground, shadowColor }]}>
        <ThemedText type="subtitle" style={statsStyles.sectionTitle}>Top Products This Week</ThemedText>
        {topProducts.map((product, index) => (
          <ThemedView key={product.id} style={statsStyles.productItem}>
            <IconSymbol
              name={product.category === 'burgers' ? 'flame.fill' : product.category === 'pizzas' ? 'circle.fill' : product.category === 'fries' ? 'star.fill' : 'drop.fill'}
              size={20}
              color={product.category === 'burgers' ? '#FF4B3E' : product.category === 'pizzas' ? '#E53935' : product.category === 'fries' ? '#FFC107' : '#4CAF50'}
            />
            <ThemedText>{product.name}</ThemedText>
            <ThemedText style={{ color: Colors.light.primary }}>{product.totalSold} sold</ThemedText>
          </ThemedView>
        ))}
      </ThemedView>

      {/* Recent Orders */}
      <ThemedView style={[statsStyles.sectionContainer, { backgroundColor: cardBackground, shadowColor }]}>
        <ThemedText type="subtitle" style={statsStyles.sectionTitle}>Recent Orders</ThemedText>
        {recentOrders.map((order) => (
          <ThemedView key={order.id} style={statsStyles.orderItem}>
            <ThemedText>Order #{order.id}</ThemedText>
            <ThemedText>${order.total.toFixed(2)}</ThemedText>
            <ThemedText>{order.date}</ThemedText>
          </ThemedView>
        ))}
      </ThemedView>

      {/* Insights */}
      <ThemedView style={[statsStyles.sectionContainer, { backgroundColor: cardBackground, shadowColor }]}>
        <ThemedText type="subtitle" style={statsStyles.sectionTitle}>Insights</ThemedText>
        <ThemedView style={statsStyles.insightItem}>
          <IconSymbol name="star.fill" size={20} color={Colors.light.secondary} />
          <ThemedText>Your favorite burger this month is the {favoriteBurger}!</ThemedText>
        </ThemedView>
        <ThemedView style={statsStyles.insightItem}>
          <IconSymbol name="chart.bar.fill" size={20} color={Colors.light.primary} />
          <ThemedText>Total revenue this week: ${totalRevenue.toFixed(2)}</ThemedText>
        </ThemedView>
        <ThemedView style={statsStyles.insightItem}>
          <IconSymbol name="bell.fill" size={20} color={Colors.light.error} />
          <ThemedText>{pendingOrdersCount} orders pending delivery</ThemedText>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}
