import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

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

const sliderImages = [
  { id: '1', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800', title: 'Delicious Burgers' },
  { id: '2', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800', title: 'Hot Pizzas' },
  { id: '3', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800', title: 'Crispy Fries' },
];

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
  const cardBackground = useThemeColor({}, 'cardBackground');
  const shadowColor = useThemeColor({}, 'shadow');
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
    router.push('/menu');
  };

  const handleScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    setCurrentIndex(roundIndex);
  };

  const renderSliderItem = ({ item }: { item: { id: string; image: string; title: string } }) => (
    <View style={styles.sliderItem}>
      <Image source={{ uri: item.image }} style={styles.sliderImage} />
      <View style={styles.sliderOverlay}>
        <ThemedText type="title" style={styles.sliderTitle}>{item.title}</ThemedText>
      </View>
    </View>
  );

  const renderIndicators = () => (
    <View style={styles.indicators}>
      {sliderImages.map((_, index) => (
        <View
          key={index}
          style={[
            styles.indicator,
            { backgroundColor: index === currentIndex ? tintColor : '#ccc' },
          ]}
        />
      ))}
    </View>
  );

  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={[styles.categoryCard, { backgroundColor: cardBackground, shadowColor }]}
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
    <ScrollView style={{ flex: 1 }}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Fast Food Delivery</ThemedText>
      </ThemedView>
      <ThemedView style={styles.sliderContainer}>
        <FlatList
          data={sliderImages}
          renderItem={renderSliderItem}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />
        {renderIndicators()}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    paddingHorizontal: 32,
  },
  sliderContainer: {
    marginBottom: 16,
    paddingHorizontal: 32,
  },
  sliderItem: {
    width: Dimensions.get('window').width - 64,
    height: 200,
  },
  sliderImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  sliderOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 16,
  },
  sliderTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  categoriesContainer: {
    flex: 1,
    paddingHorizontal: 32,
  },
  sectionTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  categoriesList: {
    paddingHorizontal: 0,
  },
  categoryCard: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
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
