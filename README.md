# Fast Food Delivery App 🍔

A modern, cross-platform mobile application for fast food delivery built with React Native and Expo. This app allows users to browse food categories, add items to their cart, and view order statistics through an intuitive interface.

## Features

- **Browse Categories**: Explore different food categories like Burgers, Pizzas, Fries, and Drinks
- **Menu Navigation**: View detailed menus for each category
- **Shopping Cart**: Add items to cart with quantity management
- **Cart Counter**: Real-time cart item count displayed in the header
- **Dashboard**: View cart statistics including total items, unique items, and total price
- **Responsive Design**: Optimized for both mobile and web platforms
- **Dark/Light Theme**: Automatic theme switching based on device settings

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router (file-based routing)
- **State Management**: React Context API
- **UI Components**: Custom themed components
- **Icons**: Ionicons via Expo Vector Icons
- **Styling**: React Native StyleSheet
- **TypeScript**: Full TypeScript support

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd FastFoodDeliveryApp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

4. Run on your preferred platform:
   - **iOS Simulator**: Press `i` in the terminal
   - **Android Emulator**: Press `a` in the terminal
   - **Web Browser**: Press `w` in the terminal
   - **Expo Go App**: Scan the QR code with Expo Go

## Project Structure

```
FastFoodDeliveryApp/
├── app/                    # Main application screens (file-based routing)
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── _layout.tsx    # Tab layout configuration
│   │   ├── index.tsx      # Home screen with categories
│   │   ├── menu.tsx       # Menu screen
│   │   ├── cart.tsx       # Shopping cart screen
│   │   └── stats.tsx      # Dashboard/statistics screen
│   └── _layout.tsx        # Root layout
├── components/            # Reusable UI components
│   ├── haptic-tab.tsx
│   ├── parallax-scroll-view.tsx
│   ├── themed-text.tsx
│   ├── themed-view.tsx
│   └── ui/
├── contexts/              # React Context providers
│   └── CartContext.tsx    # Cart state management
├── hooks/                 # Custom React hooks
├── constants/             # App constants and configuration
└── assets/                # Static assets (images, fonts)
```

## Key Components

- **CartContext**: Manages cart state across the application
- **Themed Components**: Consistent theming with light/dark mode support
- **ParallaxScrollView**: Enhanced scroll view with header image
- **HapticTab**: Custom tab component with haptic feedback

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Expo](https://expo.dev)
- Icons from [Ionicons](https://ionic.io/ionicons)
- Images from [Unsplash](https://unsplash.com)
