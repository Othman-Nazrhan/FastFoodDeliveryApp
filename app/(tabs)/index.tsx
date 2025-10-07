import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useCart } from '@/contexts/CartContext';
import { useThemeColor } from '@/hooks/use-theme-color';

interface Category {
  id: string;
  name: string;
  image: string;
  icon: string;
}

const categories: Category[] = [
  {
    id: 'burgers',
    name: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    icon: 'fast-food-outline',
  },
  {
    id: 'pizzas',
    name: 'Pizzas',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
    icon: 'pizza-outline',
  },
  {
    id: 'fries',
    name: 'Fries',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400',
    icon: 'restaurant-outline',
  },
  {
    id: 'drinks',
    name: 'Drinks',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400',
    icon: 'wine-outline',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { setSelectedCategory } = useCart();
  const tintColor = useThemeColor({}, 'tint');

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
    router.push('/menu');
  };

  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => handleCategoryPress(item.id)}
    >
      <Image source={{ uri: item.image }} style={styles.categoryImage} />
      <Ionicons name={item.icon as any} size={32} color={tintColor} style={styles.categoryIcon} />
      <ThemedText type="subtitle" style={styles.categoryName}>
        {item.name}
      </ThemedText>
    </TouchableOpacity>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Fast Food Delivery</ThemedText>
      </ThemedView>
      <ThemedView style={styles.categoriesContainer}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Categories
        </ThemedText>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.categoriesList}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  categoriesContainer: {
    flex: 1,
  },
  sectionTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  categoryCard: {
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
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  categoryIcon: {
    marginBottom: 8,
  },
  categoryName: {
    textAlign: 'center',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
