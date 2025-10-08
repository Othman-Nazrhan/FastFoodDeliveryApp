import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CartItem, useCart } from '@/contexts/CartContext';
import { useThemeColor } from '@/hooks/use-theme-color';
import { cartStyles } from '@/styles/cartStyles';
import { useState } from 'react';
import { Alert, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native';

export default function CartScreen() {
  const { state, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, getTotal } = useCart();
  const { items } = state;
  const cardBackground = useThemeColor({}, 'cardBackground');
  const shadowColor = useThemeColor({}, 'shadow');
  const primary = useThemeColor({}, 'primary');
  const danger = useThemeColor({}, 'danger');
  const success = useThemeColor({}, 'success');
  const buttonText = useThemeColor({}, 'buttonText');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const handleRemoveFromCart = (id: string) => {
    removeFromCart(id);
  };

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      Alert.alert('Cart is empty', 'Add some items to your cart first!');
      return;
    }
    setIsPlacingOrder(true);
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    Alert.alert('Thank You!', 'Your order has been placed successfully! We appreciate your business.');
    clearCart();
    setIsPlacingOrder(false);
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <ThemedView style={[cartStyles.cartItem, { backgroundColor: cardBackground, shadowColor }]}>
      <Image source={{ uri: item.image }} style={cartStyles.itemImage} />
      <ThemedView style={cartStyles.itemDetails}>
        <ThemedText type="subtitle" style={cartStyles.itemName}>
          {item.name}
        </ThemedText>
        <ThemedText type="defaultSemiBold" style={cartStyles.itemPrice}>
          ${item.price.toFixed(2)}
        </ThemedText>
        <ThemedView style={cartStyles.quantityContainer}>
          <TouchableOpacity
            style={[cartStyles.quantityButton, { backgroundColor: primary }]}
            onPress={() => decreaseQuantity(item.id)}
            accessibilityLabel={`Decrease quantity of ${item.name}`}
            accessibilityRole="button"
          >
            <ThemedText type="defaultSemiBold" style={[cartStyles.quantityButtonText, { color: buttonText }]}>
              -
            </ThemedText>
          </TouchableOpacity>
          <ThemedText type="defaultSemiBold" style={cartStyles.quantityText}>
            {item.quantity}
          </ThemedText>
          <TouchableOpacity
            style={[cartStyles.quantityButton, { backgroundColor: primary }]}
            onPress={() => increaseQuantity(item.id)}
            accessibilityLabel={`Increase quantity of ${item.name}`}
            accessibilityRole="button"
          >
            <ThemedText type="defaultSemiBold" style={[cartStyles.quantityButtonText, { color: buttonText }]}>
              +
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
      <TouchableOpacity
        style={[cartStyles.removeButton, { backgroundColor: danger }]}
        onPress={() => handleRemoveFromCart(item.id)}
        accessibilityLabel={`Remove ${item.name} from cart`}
        accessibilityRole="button"
      >
        <ThemedText type="defaultSemiBold" style={[cartStyles.removeButtonText, { color: buttonText }]}>
          Remove
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );

  return (
    <ScrollView style={{ flex: 1 }}>
      <ThemedView style={cartStyles.titleContainer}>
        <ThemedText type="title">Your Cart</ThemedText>
      </ThemedView>
      {items.length === 0 ? (
        <ThemedView style={cartStyles.emptyContainer}>
          <ThemedText type="subtitle">Your cart is empty</ThemedText>
        </ThemedView>
      ) : (
        <>
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={cartStyles.cartList}
            scrollEnabled={false}
          />
          <ThemedView style={cartStyles.totalContainer}>
            <ThemedText type="title" style={cartStyles.totalText}>
              Total: ${getTotal().toFixed(2)}
            </ThemedText>
            <TouchableOpacity
              style={[cartStyles.orderButton, { backgroundColor: success, opacity: isPlacingOrder ? 0.6 : 1 }]}
              onPress={handlePlaceOrder}
              disabled={isPlacingOrder}
              accessibilityLabel="Place order for all items in cart"
              accessibilityRole="button"
            >
              <ThemedText type="defaultSemiBold" style={[cartStyles.orderButtonText, { color: buttonText }]}>
                {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </>
      )}
    </ScrollView>
  );
}
