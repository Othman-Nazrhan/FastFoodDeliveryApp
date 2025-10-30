/**
 * Design System Foundation for FastFoodDeliveryApp
 * Colors, Fonts, and Typography based on appetizing, fast, simple, and trustworthy design philosophy.
 */

import { Platform } from 'react-native';

export const Colors = {
  light: {
    primary: '#FF6B35', // Modern orange-red - vibrant and appetizing
    secondary: '#4ECDC4', // Turquoise for accents - fresh and clean
    background: '#FEFEFE', // Pure white for clean look
    text: '#2C3E50', // Dark blue-gray for excellent readability
    muted: '#7F8C8D', // Medium gray for secondary text
    success: '#27AE60', // Modern green
    error: '#E74C3C', // Clean red
    tint: '#FF6B35',
    icon: '#7F8C8D',
    tabIconDefault: '#BDC3C7',
    tabIconSelected: '#FF6B35',
    danger: '#E74C3C',
    cardBackground: '#FFFFFF',
    shadow: '#000000',
    buttonText: '#FFFFFF',
    gradientStart: '#FF6B35',
    gradientEnd: '#FF4500',
    star: '#F39C12', // Warm orange for stars
    border: '#ECF0F1', // Light gray border
    surface: '#F8F9FA', // Subtle surface color
  },
  dark: {
    primary: '#FF8C69', // Lighter orange for dark mode
    secondary: '#5DADE2', // Lighter turquoise
    background: '#1C1C1E', // Modern dark background
    text: '#F2F2F7', // Light text for dark mode
    muted: '#8E8E93', // Muted text
    success: '#2ECC71',
    error: '#E74C3C',
    tint: '#FF8C69',
    icon: '#8E8E93',
    tabIconDefault: '#636366',
    tabIconSelected: '#FF8C69',
    danger: '#E74C3C',
    cardBackground: '#2C2C2E',
    shadow: '#000000',
    buttonText: '#FFFFFF',
    gradientStart: '#FF8C69',
    gradientEnd: '#FF6B35',
    star: '#F4D03F',
    border: '#38383A', // Dark border
    surface: '#2C2C2E', // Surface color
  },
};

export const Fonts = Platform.select({
  ios: {
    heading: 'Poppins-Bold',
    body: 'Inter-Regular',
    caption: 'Inter-Medium',
  },
  default: {
    heading: 'Poppins-Bold',
    body: 'Inter-Regular',
    caption: 'Inter-Medium',
  },
  web: {
    heading: "'Poppins', sans-serif",
    body: "'Inter', sans-serif",
    caption: "'Inter', sans-serif",
  },
});

export const Typography = {
  h1: {
    fontFamily: Fonts.heading,
    fontSize: 32,
    fontWeight: 'bold' as const,
    lineHeight: 40,
  },
  h2: {
    fontFamily: Fonts.heading,
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
  },
  h3: {
    fontFamily: Fonts.heading,
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  body: {
    fontFamily: Fonts.body,
    fontSize: 16,
    fontWeight: 'normal' as const,
    lineHeight: 24,
  },
  bodyLarge: {
    fontFamily: Fonts.body,
    fontSize: 18,
    fontWeight: 'normal' as const,
    lineHeight: 28,
  },
  caption: {
    fontFamily: Fonts.caption,
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 16,
  },
  button: {
    fontFamily: Fonts.body,
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
};
