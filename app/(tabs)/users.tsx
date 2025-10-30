import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { mockUsers } from '@/data/users';
import { useThemeColor } from '@/hooks/use-theme-color';
import { usersStyles } from '@/styles/usersStyles';
import { FlatList, Image } from 'react-native';

export default function UsersScreen() {
  const cardBackground = useThemeColor({}, 'cardBackground');
  const shadowColor = useThemeColor({}, 'shadow');

  const renderUserItem = ({ item }: { item: any }) => (
    <ThemedView style={[usersStyles.userCard, { backgroundColor: cardBackground, shadowColor }]}>
      <Image source={{ uri: item.avatar }} style={usersStyles.avatar} />
      <ThemedView style={usersStyles.userInfo}>
        <ThemedText type="subtitle" style={usersStyles.userName}>{item.name}</ThemedText>
        <ThemedText style={usersStyles.userEmail}>{item.email}</ThemedText>
        <ThemedView style={usersStyles.userStats}>
          <ThemedText style={usersStyles.statText}>{item.totalOrders} orders</ThemedText>
          <ThemedText style={usersStyles.statText}>${item.totalSpent.toFixed(2)} spent</ThemedText>
        </ThemedView>
      </ThemedView>
      <IconSymbol name="chevron.right" size={20} color={Colors.light.secondary} />
    </ThemedView>
  );

  return (
    <ThemedView style={usersStyles.container}>
      <ThemedView style={usersStyles.header}>
        <ThemedText type="title">Users</ThemedText>
        <ThemedText style={usersStyles.subtitle}>{mockUsers.length} total users</ThemedText>
      </ThemedView>

      <FlatList
        data={mockUsers}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={usersStyles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}
