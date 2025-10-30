import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useOrders } from '@/hooks/use-orders';
import { useThemeColor } from '@/hooks/use-theme-color';
import { analyticsStyles } from '@/styles/analyticsStyles';
import { Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function AnalyticsScreen() {
  const { orders } = useOrders();

  const cardBackground = useThemeColor({}, 'cardBackground');
  const shadowColor = useThemeColor({}, 'shadow');

  // Revenue analytics
  const revenueData = (orders || []).reduce((acc: { [key: string]: number }, order) => {
    const month = new Date(order.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    acc[month] = (acc[month] || 0) + order.total;
    return acc;
  }, {} as { [key: string]: number });

  const revenueChartData = Object.entries(revenueData).map(([month, revenue]) => ({
    month,
    revenue: revenue as number,
  }));

  // Customer analytics
  const customerData = (orders || []).reduce((acc: { totalOrders: number; totalRevenue: number; averageOrderValue: number }, order) => {
    acc.totalOrders += 1;
    acc.totalRevenue += order.total;
    acc.averageOrderValue = acc.totalRevenue / acc.totalOrders;
    return acc;
  }, { totalOrders: 0, totalRevenue: 0, averageOrderValue: 0 });

  // Performance metrics
  const performanceData = {
    totalRevenue: customerData.totalRevenue,
    totalOrders: customerData.totalOrders,
    averageOrderValue: customerData.averageOrderValue,
    conversionRate: 85, // Mock data
  };

  const chartConfig = {
    backgroundGradientFrom: cardBackground,
    backgroundGradientTo: cardBackground,
    color: (opacity = 1) => `rgba(255, 75, 62, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  return (
    <ScrollView style={analyticsStyles.container}>
      <ThemedView style={analyticsStyles.header}>
        <ThemedText type="title">Analytics</ThemedText>
      </ThemedView>

      {/* Key Metrics */}
      <ThemedView style={analyticsStyles.metricsContainer}>
        <ThemedView style={[analyticsStyles.metricCard, { backgroundColor: cardBackground, shadowColor }]}>
          <IconSymbol name="dollarsign.circle.fill" size={24} color={Colors.light.success} />
          <ThemedText type="subtitle">Total Revenue</ThemedText>
          <ThemedText type="title" style={{ fontSize: 24, color: Colors.light.success }}>
            ${performanceData.totalRevenue.toFixed(2)}
          </ThemedText>
        </ThemedView>
        <ThemedView style={[analyticsStyles.metricCard, { backgroundColor: cardBackground, shadowColor }]}>
          <IconSymbol name="number.circle.fill" size={24} color={Colors.light.primary} />
          <ThemedText type="subtitle">Total Orders</ThemedText>
          <ThemedText type="title" style={{ fontSize: 24, color: Colors.light.primary }}>
            {performanceData.totalOrders}
          </ThemedText>
        </ThemedView>
        <ThemedView style={[analyticsStyles.metricCard, { backgroundColor: cardBackground, shadowColor }]}>
          <IconSymbol name="chart.bar.fill" size={24} color={Colors.light.secondary} />
          <ThemedText type="subtitle">Avg Order Value</ThemedText>
          <ThemedText type="title" style={{ fontSize: 24, color: Colors.light.secondary }}>
            ${performanceData.averageOrderValue.toFixed(2)}
          </ThemedText>
        </ThemedView>
        <ThemedView style={[analyticsStyles.metricCard, { backgroundColor: cardBackground, shadowColor }]}>
          <IconSymbol name="percent" size={24} color={Colors.light.error} />
          <ThemedText type="subtitle">Conversion Rate</ThemedText>
          <ThemedText type="title" style={{ fontSize: 24, color: Colors.light.error }}>
            {performanceData.conversionRate}%
          </ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Revenue Trend */}
      <ThemedView style={[analyticsStyles.chartContainer, { backgroundColor: cardBackground, shadowColor }]}>
        <ThemedText type="subtitle" style={analyticsStyles.chartTitle}>Revenue Trend</ThemedText>
        <LineChart
          data={{
            labels: revenueChartData.map(d => d.month),
            datasets: [{
              data: revenueChartData.map(d => d.revenue),
            }],
          }}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={analyticsStyles.chart}
        />
      </ThemedView>

      {/* Customer Insights */}
      <ThemedView style={[analyticsStyles.sectionContainer, { backgroundColor: cardBackground, shadowColor }]}>
        <ThemedText type="subtitle" style={analyticsStyles.sectionTitle}>Customer Insights</ThemedText>
        <ThemedView style={analyticsStyles.insightItem}>
          <IconSymbol name="person.2.fill" size={20} color={Colors.light.primary} />
          <ThemedText>Most active customers are from premium segment</ThemedText>
        </ThemedView>
        <ThemedView style={analyticsStyles.insightItem}>
          <IconSymbol name="clock.fill" size={20} color={Colors.light.secondary} />
          <ThemedText>Peak ordering hours: 12-2 PM and 6-8 PM</ThemedText>
        </ThemedView>
        <ThemedView style={analyticsStyles.insightItem}>
          <IconSymbol name="location.fill" size={20} color={Colors.light.success} />
          <ThemedText>Top delivery areas: Downtown and Midtown</ThemedText>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}
