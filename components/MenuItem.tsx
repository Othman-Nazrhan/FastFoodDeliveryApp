import { ThemedText } from '@/components/themed-text';
import { Card } from '@/components/ui';
import { useThemeColor } from '@/hooks/use-theme-color';
import { FoodItem } from '@/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';

interface MenuItemProps {
  item: FoodItem;
  isFavorite: boolean;
  onAddToCart: (item: FoodItem) => void;
  onToggleFavorite: (itemId: string) => void;
}

const MenuItemComponent = memo<MenuItemProps>(({
  item,
  isFavorite,
  onAddToCart,
  onToggleFavorite,
}) => {
  const muted = useThemeColor({}, 'muted');
  const primary = useThemeColor({}, 'primary');
  const buttonText = useThemeColor({}, 'buttonText');
  const star = useThemeColor({}, 'star');

  return (
    <Card style={{ margin: 8, width: '45%' }}>
      <TouchableOpacity
        style={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
        onPress={() => onToggleFavorite(item.id)}
        accessibilityLabel={`${isFavorite ? 'Remove from' : 'Add to'} favorites`}
      >
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={24}
          color={isFavorite ? '#ff4757' : muted}
        />
      </TouchableOpacity>

      <Image source={{ uri: item.image }} style={{ width: '100%', height: 120, borderRadius: 8 }} />

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
        <Ionicons name="restaurant-outline" size={20} color={primary} style={{ marginRight: 8 }} />
        <ThemedText type="subtitle" numberOfLines={1}>
          {item.name}
        </ThemedText>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4 }}>
        {[...Array(5)].map((_, index) => (
          <Ionicons
            key={index}
            name={index < Math.floor(item.rating) ? 'star' : 'star-outline'}
            size={16}
            color={star}
          />
        ))}
        <ThemedText type="default" style={{ color: muted, marginLeft: 4 }}>
          ({item.rating})
        </ThemedText>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <Ionicons name="information-circle-outline" size={16} color={muted} style={{ marginRight: 4 }} />
        <ThemedText type="default" style={{ color: muted }} numberOfLines={2}>
          {item.description}
        </ThemedText>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="pricetag-outline" size={16} color={primary} style={{ marginRight: 4 }} />
          <ThemedText type="defaultSemiBold" style={{ color: primary }}>
            ${item.price.toFixed(2)}
          </ThemedText>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: primary,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 6,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => onAddToCart(item)}
          accessibilityLabel={`Add ${item.name} to cart`}
          accessibilityRole="button"
        >
          <Ionicons name="add-circle-outline" size={16} color={buttonText} style={{ marginRight: 4 }} />
          <ThemedText type="defaultSemiBold" style={{ color: buttonText, fontSize: 12 }}>
            Add
          </ThemedText>
        </TouchableOpacity>
      </View>
    </Card>
  );
});

MenuItemComponent.displayName = 'MenuItemComponent';

export const MenuItem = MenuItemComponent;
