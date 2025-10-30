import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { mockUsers } from '@/data/users';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { usersStyles } from '@/styles/usersStyles';
import { Alert, FlatList, Image, TouchableOpacity } from 'react-native';

export default function UsersScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const cardBackground = useThemeColor({}, 'cardBackground');
  const shadowColor = useThemeColor({}, 'shadow');

  const handleEditUser = (user: any) => {
    Alert.alert('Edit User', `Edit ${user.name}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Edit', onPress: () => Alert.alert('Edit', 'Edit functionality would be implemented here') },
    ]);
  };

  const handleDeleteUser = (user: any) => {
    Alert.alert('Delete User', `Are you sure you want to delete ${user.name}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => Alert.alert('Delete', 'Delete functionality would be implemented here') },
    ]);
  };

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
      <ThemedView style={usersStyles.actionButtons}>
        <TouchableOpacity
          style={usersStyles.actionButton}
          onPress={() => handleEditUser(item)}
          accessibilityLabel={`Edit ${item.name}`}
        >
          <IconSymbol name="pencil" size={20} color={colors.secondary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={usersStyles.actionButton}
          onPress={() => handleDeleteUser(item)}
          accessibilityLabel={`Delete ${item.name}`}
        >
          <IconSymbol name="trash.fill" size={20} color={colors.error} />
        </TouchableOpacity>
      </ThemedView>
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
        numColumns={1}
      />
    </ThemedView>
  );
}
