# Fast Food Delivery App 🍔

A comprehensive, cross-platform mobile application for fast food delivery and management built with React Native and Expo. This app provides a full-featured experience for users to browse menus, manage carts, place orders, handle payments, and for admins to oversee analytics, users, orders, and settings through an intuitive interface.

## Features

### User Features
- **Browse Categories**: Explore different food categories like Burgers, Pizzas, Fries, and Drinks
- **Menu Navigation**: View detailed menus for each category with search functionality
- **Shopping Cart**: Add items to cart with quantity management and notifications
- **Cart Counter**: Real-time cart item count displayed in the header
- **Order Placement**: Place orders with estimated delivery times
- **Payment Processing**: Handle payments for orders
- **Profile Management**: User profiles with favorites and ratings
- **Notifications**: In-app notifications for cart actions and updates

### Admin Features
- **Dashboard**: View comprehensive statistics including total items, unique items, total price, and more
- **User Management**: Manage user accounts and data
- **Order Management**: Track and manage all orders
- **Payment Tracking**: Monitor payment transactions
- **Analytics**: Detailed analytics on app usage and performance
- **Settings**: Configure app settings and preferences

### General Features
- **Responsive Design**: Optimized for both mobile and web platforms
- **Dark/Light Theme**: Automatic theme switching based on device settings
- **Real-time Data**: Integrated with Supabase for backend data management
- **TypeScript Support**: Full type safety throughout the application

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router (file-based routing)
- **State Management**: React Context API (CartContext, UserContext)
- **Backend**: Supabase for database and real-time features
- **Notifications**: Expo Notifications
- **UI Components**: Custom themed components
- **Icons**: Ionicons via Expo Vector Icons
- **Styling**: React Native StyleSheet with custom stylesheets
- **TypeScript**: Full TypeScript support
- **Data Handling**: Custom hooks for data fetching and management

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo CLI
- Supabase account (for backend features)

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

3. Set up Supabase:
   - Create a Supabase project at [supabase.com](https://supabase.com)
   - Create the following tables in your Supabase database:
     ```sql
     -- Food Items Table
     CREATE TABLE food_items (
       id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
       name TEXT NOT NULL,
       price DECIMAL(10,2) NOT NULL,
       image TEXT NOT NULL,
       category TEXT NOT NULL,
       description TEXT NOT NULL,
       rating DECIMAL(3,2) NOT NULL DEFAULT 4.0,
       is_vegetarian BOOLEAN,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
       updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
     );

     -- Users Table
     CREATE TABLE users (
       id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
       name TEXT NOT NULL,
       email TEXT NOT NULL UNIQUE,
       avatar TEXT,
       join_date DATE NOT NULL,
       total_orders INTEGER DEFAULT 0,
       total_spent DECIMAL(10,2) DEFAULT 0,
       settings JSONB DEFAULT '{}',
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
       updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
     );

     -- Orders Table
     CREATE TABLE orders (
       id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
       user_id UUID REFERENCES users(id),
       items JSONB NOT NULL,
       total DECIMAL(10,2) NOT NULL,
       date DATE NOT NULL,
       delivery_time INTEGER NOT NULL,
       status TEXT DEFAULT 'pending',
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
       updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
     );

     -- Payments Table
     CREATE TABLE payments (
       id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
       user_id UUID REFERENCES users(id),
       amount DECIMAL(10,2) NOT NULL,
       method TEXT NOT NULL,
       status TEXT NOT NULL,
       date DATE NOT NULL,
       order_id UUID REFERENCES orders(id),
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
       updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
     );
     ```
   - Get your project URL and anon key from the Supabase dashboard
   - Create a `.env` file in the root directory:
     ```
     EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
     EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. Start the development server:
   ```bash
   npx expo start
   ```

5. Run on your preferred platform:
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
│   │   ├── stats.tsx      # Dashboard/statistics screen
│   │   ├── users.tsx      # User management screen
│   │   ├── orders.tsx     # Order management screen
│   │   ├── payments.tsx   # Payment tracking screen
│   │   ├── analytics.tsx  # Analytics dashboard
│   │   ├── profile.tsx    # User profile screen
│   │   └── settings.tsx   # App settings screen
│   ├── _layout.tsx        # Root layout
│   └── modal.tsx          # Modal screens
├── components/            # Reusable UI components
│   ├── ui/                # UI library components (Button, Card, Input, etc.)
│   ├── MenuItem.tsx       # Menu item component
│   ├── SearchBar.tsx      # Search functionality
│   ├── CustomDrawer.tsx   # Custom drawer navigation
│   └── ...                # Other themed components
├── contexts/              # React Context providers
│   ├── CartContext.tsx    # Cart state management
│   └── UserContext.tsx    # User state management
├── hooks/                 # Custom React hooks
│   ├── use-notifications.ts # Notification management
│   ├── use-orders.ts      # Order data handling
│   ├── use-payments.ts    # Payment data handling
│   ├── use-stats-data.ts  # Statistics data
│   ├── use-users.ts       # User data handling
│   └── ...                # Other utility hooks
├── data/                  # Static data files
│   ├── foodItems.ts       # Food menu data
│   ├── orders.ts          # Sample order data
│   ├── users.ts           # Sample user data
│   └── payments.ts        # Sample payment data
├── utils/                 # Utility functions
│   ├── supabase.ts        # Supabase configuration
│   └── dataUtils.ts       # Data processing utilities
├── styles/                # Style files
│   ├── indexStyles.ts     # Home screen styles
│   ├── menuStyles.ts      # Menu screen styles
│   ├── cartStyles.ts      # Cart screen styles
│   ├── statsStyles.ts     # Stats screen styles
│   └── ...                # Other screen styles
├── constants/             # App constants and configuration
│   └── theme.ts           # Theme constants
├── assets/                # Static assets (images, fonts)
└── types.ts               # TypeScript type definitions
```

## Key Components

- **CartContext**: Manages cart state, including items, favorites, ratings, and order history
- **UserContext**: Handles user authentication and profile data
- **Custom Hooks**: Specialized hooks for data fetching, notifications, and state management
- **Themed Components**: Consistent theming with light/dark mode support
- **Supabase Integration**: Real-time database operations for users, orders, and payments
- **Notification System**: In-app notifications for user actions

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
- Backend powered by [Supabase](https://supabase.com)
- Icons from [Ionicons](https://ionic.io/ionicons)
- Images from [Unsplash](https://unsplash.com)
