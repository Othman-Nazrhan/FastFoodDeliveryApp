import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useCart } from '@/contexts/CartContext';
import { FoodItem, foodItems } from '@/data/foodItems';
import { useThemeColor } from '@/hooks/use-theme-color';
import { menuStyles } from '@/styles/menuStyles';
import { Image } from 'expo-image';
import { Alert, FlatList, ScrollView, TouchableOpacity } from 'react-native';

export default function MenuScreen() {
  const { state, addToCart } = useCart();
  const selectedCategory = state.selectedCategory;
  const cardBackground = useThemeColor({}, 'cardBackground');
  const shadowColor = useThemeColor({}, 'shadow');
  const muted = useThemeColor({}, 'muted');
  const primary = useThemeColor({}, 'primary');
  const buttonText = useThemeColor({}, 'buttonText');

  if (!selectedCategory) {
    return (
      <ThemedView style={menuStyles.container}>
        <ThemedText type="title">No category selected</ThemedText>
      </ThemedView>
    );
  }

  const items = foodItems[selectedCategory] || [];

  const handleAddToCart = (item: FoodItem) => {
    addToCart(item);
    Alert.alert('Added to Cart', `${item.name} added to cart!`);
  };

  const renderItem = ({ item }: { item: FoodItem }) => (
    <ThemedView style={[menuStyles.itemCard, { backgroundColor: cardBackground, shadowColor }]}>
      <Image source={{ uri: item.image }} style={menuStyles.itemImage} />
      <ThemedText type="subtitle" style={menuStyles.itemName}>
        {item.name}
      </ThemedText>
      <ThemedText type="default" style={[menuStyles.itemDescription, { color: muted }]}>
        {item.description}
      </ThemedText>
      <ThemedText type="defaultSemiBold" style={[menuStyles.itemPrice, { color: primary }]}>
        ${item.price.toFixed(2)}
      </ThemedText>
      <TouchableOpacity
        style={[menuStyles.addButton, { backgroundColor: primary }]}
        onPress={() => handleAddToCart(item)}
        accessibilityLabel={`Add ${item.name} to cart`}
        accessibilityRole="button"
      >
        <ThemedText type="defaultSemiBold" style={[menuStyles.addButtonText, { color: buttonText }]}>
          Add to Cart
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );

  return (
    <ScrollView style={{ flex: 1 }}>
      <ThemedView style={menuStyles.titleContainer}>
        <ThemedText type="title">{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Menu</ThemedText>
      </ThemedView>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={menuStyles.itemsList}
        scrollEnabled={false}
      />
    </ScrollView>
  );
}
