import { useThemeColor } from '@/hooks/use-theme-color';
import { CardProps } from '@/types';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  shadow = true,
}) => {
  const cardBackground = useThemeColor({}, 'cardBackground');
  const shadowColor = useThemeColor({}, 'shadow');

  const cardStyles = [
    styles.card,
    { backgroundColor: cardBackground },
    shadow && styles.shadow,
    shadow && { shadowColor },
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity style={cardStyles} onPress={onPress} activeOpacity={0.8}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyles}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 8,
  },
  shadow: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
});
