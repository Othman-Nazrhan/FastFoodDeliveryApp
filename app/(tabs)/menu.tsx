import SearchBar from '@/components/SearchBar';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useCart } from '@/contexts/CartContext';
import { FoodItem, foodItems } from '@/data/foodItems';
import { useThemeColor } from '@/hooks/use-theme-color';
import { menuStyles } from '@/styles/menuStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, FlatList, Modal, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';

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
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });

  const allItems = useMemo(() => selectedCategory ? foodItems[selectedCategory] || [] : [], [selectedCategory]);
  const filteredItems = useMemo(() => {
    if (!searchQuery) return allItems;
    return allItems.filter((item: FoodItem) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allItems, searchQuery]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant permission to access your photos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewItem({ ...newItem, image: result.assets[0].uri });
    }
  };

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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="restaurant-outline" size={20} color={primary} style={{ marginRight: 8 }} />
          <ThemedText type="subtitle" style={menuStyles.itemName}>
            {item.name}
          </ThemedText>
        </View>
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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="information-circle-outline" size={16} color={muted} style={{ marginRight: 4 }} />
          <ThemedText type="default" style={[menuStyles.itemDescription, { color: muted }]}>
            {item.description}
          </ThemedText>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="pricetag-outline" size={16} color={primary} style={{ marginRight: 4 }} />
          <ThemedText type="defaultSemiBold" style={[menuStyles.itemPrice, { color: primary }]}>
            ${item.price.toFixed(2)}
          </ThemedText>
        </View>
        <TouchableOpacity
          style={[menuStyles.addButton, { backgroundColor: primary }]}
          onPress={() => handleAddToCart(item)}
          accessibilityLabel={`Add ${item.name} to cart`}
          accessibilityRole="button"
        >
          <Ionicons name="add-circle-outline" size={20} color={buttonText} style={{ marginRight: 8 }} />
          <ThemedText type="defaultSemiBold" style={[menuStyles.addButtonText, { color: buttonText }]}>
            Add to Cart
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  };

  const handleAddNewItem = () => {
    if (!newItem.name || !newItem.description || !newItem.price || !newItem.image) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // In a real app, this would be saved to a backend
    // For now, we'll just show a success message
    Alert.alert('Success', 'Item added to menu!');
    setShowAddModal(false);
    setNewItem({ name: '', description: '', price: '', image: '' });
  };

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const handleCartPress = () => {
    router.push('/cart');
  };

  return (
    <LinearGradient
      colors={['#2c3e50', '#34495e']} // Dark gradient background
      style={menuStyles.gradientBackground}
    >
      <ScrollView style={{ flex: 1 }}>
        <ThemedView style={menuStyles.titleContainer}>
          <ThemedText type="title">{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Menu</ThemedText>
          <TouchableOpacity
            style={[menuStyles.addButton, { backgroundColor: primary, marginLeft: 10, paddingHorizontal: 16, paddingVertical: 8, flexDirection: 'row', alignItems: 'center' }]}
            onPress={() => setShowAddModal(true)}
          >
            <Ionicons name="add-circle-outline" size={20} color={buttonText} style={{ marginRight: 8 }} />
            <ThemedText type="defaultSemiBold" style={[menuStyles.addButtonText, { color: buttonText }]}>
              Add Item
            </ThemedText>
          </TouchableOpacity>
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

        {/* Add Item Modal */}
        <Modal visible={showAddModal} animationType="slide" transparent>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <ThemedView style={[menuStyles.itemCard, { backgroundColor: cardBackground, width: '90%', maxHeight: '80%' }]}>
              <ThemedText type="title" style={{ marginBottom: 20 }}>Add New Item</ThemedText>

              <TextInput
                style={[menuStyles.input, { backgroundColor: background, color: muted }]}
                placeholder="Item Name"
                placeholderTextColor={muted}
                value={newItem.name}
                onChangeText={(text) => setNewItem({ ...newItem, name: text })}
              />

              <TextInput
                style={[menuStyles.input, { backgroundColor: background, color: muted }]}
                placeholder="Description"
                placeholderTextColor={muted}
                value={newItem.description}
                onChangeText={(text) => setNewItem({ ...newItem, description: text })}
                multiline
              />

              <TextInput
                style={[menuStyles.input, { backgroundColor: background, color: muted }]}
                placeholder="Price"
                placeholderTextColor={muted}
                value={newItem.price}
                onChangeText={(text) => setNewItem({ ...newItem, price: text })}
                keyboardType="numeric"
              />

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                  style={[menuStyles.input, { backgroundColor: background, color: muted, flex: 1 }]}
                  placeholder="Image URL"
                  placeholderTextColor={muted}
                  value={newItem.image}
                  onChangeText={(text) => setNewItem({ ...newItem, image: text })}
                />
                <TouchableOpacity
                  style={[menuStyles.addButton, { backgroundColor: primary, marginLeft: 10, paddingHorizontal: 12, paddingVertical: 12 }]}
                  onPress={pickImage}
                >
                  <Ionicons name="image" size={20} color={buttonText} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[menuStyles.addButton, { backgroundColor: primary, marginTop: 20 }]}
                onPress={handleAddNewItem}
              >
                <Ionicons name="add-circle-outline" size={20} color={buttonText} style={{ marginRight: 8 }} />
                <ThemedText type="defaultSemiBold" style={[menuStyles.addButtonText, { color: buttonText }]}>
                  Add Item
                </ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                style={[menuStyles.addButton, { backgroundColor: muted, marginTop: 10 }]}
                onPress={() => setShowAddModal(false)}
              >
                <Ionicons name="close-circle-outline" size={20} color={buttonText} style={{ marginRight: 8 }} />
                <ThemedText type="defaultSemiBold" style={[menuStyles.addButtonText, { color: buttonText }]}>
                  Cancel
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </View>
        </Modal>
      </ScrollView>

      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <TouchableOpacity
          style={[menuStyles.floatingCartButton, { backgroundColor: primary }]}
          onPress={handleCartPress}
          accessibilityLabel={`View cart with ${totalItems} items`}
          accessibilityRole="button"
        >
          <Ionicons name="cart-outline" size={24} color={buttonText} />
          <View style={menuStyles.cartBadge}>
            <ThemedText type="defaultSemiBold" style={menuStyles.cartBadgeText}>
              {totalItems}
            </ThemedText>
          </View>
        </TouchableOpacity>
      )}
    </LinearGradient>
  );
}
