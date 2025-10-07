import { Image } from 'expo-image';
import { Alert, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FoodItem, useCart } from '@/contexts/CartContext';

const foodItems: { [key: string]: FoodItem[] } = {
  burgers: [
    {
      id: '1',
      name: 'Classic Burger',
      price: 8.99,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
      category: 'burgers',
      description: 'Juicy beef patty with lettuce, tomato, and special sauce.',
    },
    {
      id: '2',
      name: 'Cheese Burger',
      price: 9.99,
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400',
      category: 'burgers',
      description: 'Classic burger topped with melted cheese and fresh veggies.',
    },
  ],
  pizzas: [
    {
      id: '3',
      name: 'Margherita Pizza',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
      category: 'pizzas',
      description: 'Fresh mozzarella, tomato sauce, and basil on thin crust.',
    },
    {
      id: '4',
      name: 'Pepperoni Pizza',
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400',
      category: 'pizzas',
      description: 'Spicy pepperoni with cheese and tomato sauce.',
    },
  ],
  fries: [
    {
      id: '5',
      name: 'French Fries',
      price: 4.99,
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400',
      category: 'fries',
      description: 'Crispy golden fries, perfect side dish.',
    },
  ],
  drinks: [
    {
      id: '6',
      name: 'Coca Cola',
      price: 2.99,
      image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400',
      category: 'drinks',
      description: 'Refreshing cola drink, ice cold.',
    },
  ],
};

export default function MenuScreen() {
  const { state, addToCart } = useCart();
  const selectedCategory = state.selectedCategory;

  if (!selectedCategory) {
    return (
      <ThemedView style={styles.container}>
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
    <ThemedView style={styles.itemCard}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <ThemedText type="subtitle" style={styles.itemName}>
        {item.name}
      </ThemedText>
      <ThemedText type="default" style={styles.itemDescription}>
        {item.description}
      </ThemedText>
      <ThemedText type="defaultSemiBold" style={styles.itemPrice}>
        ${item.price.toFixed(2)}
      </ThemedText>
      <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(item)}>
        <ThemedText type="defaultSemiBold" style={styles.addButtonText}>
          Add to Cart
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Menu</ThemedText>
      </ThemedView>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.itemsList}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  itemsList: {
    paddingHorizontal: 16,
  },
  itemCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemName: {
    textAlign: 'center',
    marginBottom: 4,
  },
  itemDescription: {
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 14,
    color: '#666',
  },
  itemPrice: {
    textAlign: 'center',
    marginBottom: 8,
    color: '#007bff',
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  addButtonText: {
    color: '#fff',
  },
  headerImage: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
