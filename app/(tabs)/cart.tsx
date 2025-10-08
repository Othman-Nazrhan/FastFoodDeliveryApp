import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CartItem, useCart } from '@/contexts/CartContext';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Alert, FlatList, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function CartScreen() {
  const { state, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, getTotal } = useCart();
  const { items } = state;
  const cardBackground = useThemeColor({}, 'cardBackground');
  const shadowColor = useThemeColor({}, 'shadow');
  const primary = useThemeColor({}, 'primary');
  const danger = useThemeColor({}, 'danger');
  const success = useThemeColor({}, 'success');
  const buttonText = useThemeColor({}, 'buttonText');

  const handleRemoveFromCart = (id: string) => {
    removeFromCart(id);
  };

  const handlePlaceOrder = () => {
    if (items.length === 0) {
      Alert.alert('Cart is empty', 'Add some items to your cart first!');
      return;
    }
    Alert.alert('Thank You!', 'Your order has been placed successfully! We appreciate your business.');
    clearCart();
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <ThemedView style={[styles.cartItem, { backgroundColor: cardBackground, shadowColor }]}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <ThemedView style={styles.itemDetails}>
        <ThemedText type="subtitle" style={styles.itemName}>
          {item.name}
        </ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.itemPrice}>
          ${item.price.toFixed(2)}
        </ThemedText>
        <ThemedView style={styles.quantityContainer}>
          <TouchableOpacity
            style={[styles.quantityButton, { backgroundColor: primary }]}
            onPress={() => decreaseQuantity(item.id)}
          >
            <ThemedText type="defaultSemiBold" style={[styles.quantityButtonText, { color: buttonText }]}>
              -
            </ThemedText>
          </TouchableOpacity>
          <ThemedText type="defaultSemiBold" style={styles.quantityText}>
            {item.quantity}
          </ThemedText>
          <TouchableOpacity
            style={[styles.quantityButton, { backgroundColor: primary }]}
            onPress={() => increaseQuantity(item.id)}
          >
            <ThemedText type="defaultSemiBold" style={[styles.quantityButtonText, { color: buttonText }]}>
              +
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
      <TouchableOpacity
        style={[styles.removeButton, { backgroundColor: danger }]}
        onPress={() => handleRemoveFromCart(item.id)}
      >
        <ThemedText type="defaultSemiBold" style={[styles.removeButtonText, { color: buttonText }]}>
          Remove
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );

  return (
    <ScrollView style={{ flex: 1 }}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Your Cart</ThemedText>
      </ThemedView>
      {items.length === 0 ? (
        <ThemedView style={styles.emptyContainer}>
          <ThemedText type="subtitle">Your cart is empty</ThemedText>
        </ThemedView>
      ) : (
        <>
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.cartList}
            scrollEnabled={false}
          />
          <ThemedView style={styles.totalContainer}>
            <ThemedText type="title" style={styles.totalText}>
              Total: ${getTotal().toFixed(2)}
            </ThemedText>
            <TouchableOpacity style={[styles.orderButton, { backgroundColor: success }]} onPress={handlePlaceOrder}>
              <ThemedText type="defaultSemiBold" style={[styles.orderButtonText, { color: buttonText }]}>
                Place Order
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartList: {
    paddingHorizontal: 16,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 8,
    borderRadius: 8,
    padding: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    marginBottom: 4,
  },
  itemPrice: {
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  quantityButtonText: {
    color: '#fff',
  },
  quantityText: {
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  removeButtonText: {
    color: '#fff',
  },
  totalContainer: {
    padding: 16,
    alignItems: 'center',
  },
  totalText: {
    marginBottom: 16,
  },
  orderButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  orderButtonText: {
    color: '#fff',
  },
});
