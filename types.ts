export interface FoodItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  isVegetarian?: boolean;
}

export interface CartItem extends FoodItem {
  quantity: number;
}

export interface OrderHistory {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  deliveryTime: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
}

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  method: 'card' | 'paypal' | 'apple_pay' | 'google_pay';
  status: 'pending' | 'completed' | 'failed';
  date: string;
  orderId?: string;
}

export interface UserSettings {
  notifications: boolean;
  vegetarianOnly: boolean;
  name: string;
  address: string;
  phone?: string;
  darkMode?: boolean;
  locationServices?: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  icon: string;
}

export interface SalesData {
  date: string;
  total: number;
}

export interface CategoryData {
  name: string;
  quantity: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}

export interface TopProduct {
  id: string;
  name: string;
  category: string;
  totalSold: number;
  price: number;
  image: string;
}

// UI Component Props
export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: any;
}

export interface CardProps {
  children: React.ReactNode;
  style?: any;
  onPress?: () => void;
  shadow?: boolean;
}

export interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: string;
  label?: string;
  multiline?: boolean;
  style?: any;
}
