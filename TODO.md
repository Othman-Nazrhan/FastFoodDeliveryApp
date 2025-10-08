# Refactoring Tasks

- [x] Refactor hardcoded food items data into a separate file (data/foodItems.ts) for better maintainability and scalability
- [x] Separate styles into dedicated files instead of defining them inline in TSX files:
  - [x] styles/indexStyles.ts for app/(tabs)/index.tsx
  - [x] styles/menuStyles.ts for app/(tabs)/menu.tsx
  - [x] styles/cartStyles.ts for app/(tabs)/cart.tsx
  - [x] styles/statsStyles.ts for app/(tabs)/stats.tsx

# Dark Mode Adaptation Tasks

- [x] Update constants/theme.ts to add semantic colors (primary, secondary, danger, muted, cardBackground, shadow)
- [x] Refactor app/(tabs)/index.tsx to use themed colors for categoryCard background, shadow, and other hardcoded colors
- [x] Refactor app/(tabs)/menu.tsx to use themed colors for itemCard, addButton, itemDescription, itemPrice, and other hardcoded colors
- [x] Refactor app/(tabs)/cart.tsx to use themed colors for cartItem, quantityButton, removeButton, orderButton, and other hardcoded colors
- [x] Refactor app/(tabs)/stats.tsx to replace Text and View with ThemedText and ThemedView, and use themed colors for statCard
- [x] Clean code: remove console.log statements, unused styles, add accessibility labels, add loading state for place order
- [ ] Test the app in both light and dark modes to verify UI adapts correctly
- [ ] Fix any styling issues or color contrast problems found during testing
