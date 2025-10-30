import { useThemeColor } from '@/hooks/use-theme-color';
import { ButtonProps } from '@/types';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
}) => {
  const primary = useThemeColor({}, 'primary');
  const secondary = useThemeColor({}, 'secondary');
  const danger = useThemeColor({}, 'danger');
  const success = useThemeColor({}, 'success');
  const buttonText = useThemeColor({}, 'buttonText');
  const muted = useThemeColor({}, 'muted');

  const getBackgroundColor = () => {
    if (disabled) return muted;
    switch (variant) {
      case 'primary': return primary;
      case 'secondary': return secondary;
      case 'danger': return danger;
      case 'success': return success;
      default: return primary;
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { paddingHorizontal: 12, paddingVertical: 8, minHeight: 36 };
      case 'large':
        return { paddingHorizontal: 24, paddingVertical: 16, minHeight: 52 };
      default:
        return { paddingHorizontal: 16, paddingVertical: 12, minHeight: 44 };
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'small': return 14;
      case 'large': return 18;
      default: return 16;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        getSizeStyles(),
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator size="small" color={buttonText} />
      ) : (
        <Text style={[styles.text, { color: buttonText, fontSize: getTextSize() }]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontWeight: '600',
  },
});
