import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useCart } from '@/contexts/CartContext';
import { useThemeColor } from '@/hooks/use-theme-color';
import { indexStyles } from '@/styles/indexStyles';

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
    <View style={indexStyles.sliderItem}>
      <Image source={{ uri: item.image }} style={indexStyles.sliderImage} />
      <View style={indexStyles.sliderOverlay}>
        <ThemedText type="title" style={indexStyles.sliderTitle}>{item.title}</ThemedText>
      </View>
    </View>
  );

  const renderIndicators = () => (
    <View style={indexStyles.indicators}>
      {sliderImages.map((_, index) => (
        <View
          key={index}
          style={[
            indexStyles.indicator,
            { backgroundColor: index === currentIndex ? tintColor : '#ccc' },
          ]}
        />
      ))}
    </View>
  );

  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={[indexStyles.categoryCard, { backgroundColor: cardBackground, shadowColor }]}
      onPress={() => handleCategoryPress(item.id)}
    >
      <Image source={{ uri: item.image }} style={indexStyles.categoryImage} />
      <Ionicons name={item.icon as any} size={32} color={tintColor} style={indexStyles.categoryIcon} />
      <ThemedText type="subtitle" style={indexStyles.categoryName}>
        {item.name}
      </ThemedText>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={{ flex: 1 }}>
      <ThemedView style={indexStyles.titleContainer}>
        <ThemedText type="title">Fast Food Delivery</ThemedText>
      </ThemedView>
      <ThemedView style={indexStyles.sliderContainer}>
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
      <ThemedView style={indexStyles.categoriesContainer}>
        <ThemedText type="subtitle" style={indexStyles.sectionTitle}>
          Categories
        </ThemedText>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={indexStyles.categoriesList}
        />
      </ThemedView>
    </ScrollView>
  );
}
