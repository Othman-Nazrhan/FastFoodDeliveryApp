/**
 * Design System Foundation for FastFoodDeliveryApp
 * Colors, Fonts, and Typography based on appetizing, fast, simple, and trustworthy design philosophy.
 */

import { Platform } from 'react-native';

export const Colors = {
  light: {
    primary: '#FF4B3E', // Appetite red for buttons, highlights
    secondary: '#FFC107', // Yellow for icons, accents (food vibe)
    background: '#FFFFFF', // App background
    text: '#333333', // Main text
    muted: '#9E9E9E', // Secondary text
    success: '#4CAF50', // Order completed / status
    error: '#E53935', // Payment failed, alerts
    tint: '#FF4B3E',
    icon: '#9E9E9E',
    tabIconDefault: '#9E9E9E',
    tabIconSelected: '#FF4B3E',
    danger: '#E53935',
    cardBackground: '#FFFFFF',
    shadow: '#000000',
    buttonText: '#FFFFFF',
    gradientStart: '#FF4B3E', // Red for CTA gradients
    gradientEnd: '#FF5722', // Orange for CTA gradients
    star: '#FFC107',
  },
  dark: {
    primary: '#FF6B5E', // Lighter red for dark mode
    secondary: '#FFD54F', // Lighter yellow
    background: '#121212', // Dark background
    text: '#FFFFFF', // Light text
    muted: '#B0B0B0', // Muted text
    success: '#66BB6A',
    error: '#EF5350',
    tint: '#FF6B5E',
    icon: '#B0B0B0',
    tabIconDefault: '#B0B0B0',
    tabIconSelected: '#FF6B5E',
    danger: '#EF5350',
    cardBackground: '#1E1E1E',
    shadow: '#000000',
    buttonText: '#FFFFFF',
    gradientStart: '#FF6B5E',
    gradientEnd: '#FF7043',
    star: '#FFD54F',
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
  },
  h2: {
    fontFamily: Fonts.heading,
    fontSize: 24,
    fontWeight: '600' as const,
  },
  body: {
    fontFamily: Fonts.body,
    fontSize: 16,
    fontWeight: 'normal' as const,
  },
  caption: {
    fontFamily: Fonts.caption,
    fontSize: 12,
    fontWeight: '500' as const,
  },
};
