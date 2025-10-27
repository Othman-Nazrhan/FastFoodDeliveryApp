import SearchBar from '@/components/SearchBar';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useCart } from '@/contexts/CartContext';
import { FoodItem, foodItems } from '@/data/foodItems';
import { useThemeColor } from '@/hooks/use-theme-color';
import { menuStyles } from '@/styles/menuStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { useMemo, useState } from 'react';
import { Alert, FlatList, ScrollView, TouchableOpacity } from 'react-native';

export default function MenuScreen() {
  const { state, addToCart, toggleFavorite } = useCart();
  const selectedCategory = state.selectedCategory;
  const cardBackground = useThemeColor({}, 'cardBackground');
  const shadowColor = useThemeColor({}, 'shadow');
  const muted = useThemeColor({}, 'muted');
  const primary = useThemeColor({}, 'primary');
  const buttonText = useThemeColor({}, 'buttonText');
  const star = useThemeColor({}, 'star');
  const background = useThemeColor({}, 'background');

  const [searchQuery, setSearchQuery] = useState('');

  const allItems = selectedCategory ? foodItems[selectedCategory] || [] : [];
  const filteredItems = useMemo(() => {
    if (!searchQuery) return allItems;
    return allItems.filter((item: FoodItem) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allItems, searchQuery]);

  if (!selectedCategory) {
    return (
      <ThemedView style={menuStyles.container}>
        <ThemedText type="title">No category selected</ThemedText>
      </ThemedView>
    );
  }

  const handleAddToCart = (item: FoodItem) => {
    addToCart(item);
    Alert.alert('Added to Cart', `${item.name} added to cart!`);
  };

  const handleFavoritePress = (itemId: string) => {
    toggleFavorite(itemId);
  };

  const renderItem = ({ item }: { item: FoodItem }) => {
    const isFavorite = state.favorites.includes(item.id);
    const userRating = state.ratings[item.id] || 0;

    return (
      <ThemedView style={[menuStyles.itemCard, { backgroundColor: cardBackground, shadowColor }]}>
        <TouchableOpacity
          style={menuStyles.favoriteButton}
          onPress={() => handleFavoritePress(item.id)}
          accessibilityLabel={`${isFavorite ? 'Remove from' : 'Add to'} favorites`}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? '#ff4757' : muted}
          />
        </TouchableOpacity>
        <Image source={{ uri: item.image }} style={menuStyles.itemImage} />
        <ThemedText type="subtitle" style={menuStyles.itemName}>
          {item.name}
        </ThemedText>
        <ThemedView style={menuStyles.ratingContainer}>
          {[...Array(5)].map((_, index) => (
            <Ionicons
              key={index}
              name={index < Math.floor(item.rating) ? 'star' : 'star-outline'}
              size={16}
              color={star}
            />
          ))}
          <ThemedText type="default" style={[menuStyles.ratingText, { color: muted }]}>
            ({item.rating})
          </ThemedText>
        </ThemedView>
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
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: background }}>
      <ThemedView style={menuStyles.titleContainer}>
        <ThemedText type="title">{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Menu</ThemedText>
      </ThemedView>
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={menuStyles.itemsList}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </ScrollView>
  );
}
