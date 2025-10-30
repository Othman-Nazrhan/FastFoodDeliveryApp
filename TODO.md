# TODO: Add Notifications to Cart Actions

- [x] Import useNotifications hook in contexts/CartContext.tsx
- [x] Use the useNotifications hook inside the CartProvider component
- [x] Modify addToCart function to schedule notification after dispatching ADD_ITEM action
- [x] Modify removeFromCart function to schedule notification after dispatching REMOVE_ITEM action
- [x] Test the app to verify notifications appear when adding/removing items from the cart
