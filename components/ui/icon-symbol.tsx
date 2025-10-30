// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<string, ComponentProps<typeof MaterialIcons>['name']>;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'chevron.down': 'expand-more',
  'list.bullet': 'format-list-bulleted',
  'bag.fill': 'shopping-bag',
  'chart.bar.fill': 'bar-chart',
  'person.2.fill': 'people',
  'chart.pie.fill': 'pie-chart',
  'creditcard.fill': 'credit-card',
  'gear': 'settings',
  'person.circle.fill': 'account-circle',
  'xmark': 'close',
  'chevron.left': 'chevron-left',
  'star.fill': 'star',
  'star': 'star-border',
  // Additional modern icons
  'plus': 'add',
  'minus': 'remove',
  'trash.fill': 'delete',
  'pencil': 'edit',
  'eye.fill': 'visibility',
  'eye.slash.fill': 'visibility-off',
  'heart.fill': 'favorite',
  'heart': 'favorite-border',
  'bell.fill': 'notifications',
  'bell': 'notifications-none',
  'search': 'search',
  'filter': 'filter-list',
  'sort': 'sort',
  'menu': 'menu',
  'more': 'more-vert',
  'share': 'share',
  'download': 'download',
  'upload': 'upload',
  'camera.fill': 'camera',
  'photo.fill': 'photo',
  'location.fill': 'location-on',
  'phone.fill': 'phone',
  'mail.fill': 'email',
  'lock.fill': 'lock',
  'unlock.fill': 'lock-open',
  'check': 'check',
  'check.circle.fill': 'check-circle',
  'exclamationmark.triangle.fill': 'warning',
  'info.circle.fill': 'info',
  'xmark.circle.fill': 'cancel',
  // Fast food specific icons
  'fast-food-outline': 'restaurant',
  'pizza-outline': 'local-pizza',
  'wine-outline': 'local-bar',
  'restaurant-outline': 'restaurant-menu',
} as IconMapping;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: string;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
