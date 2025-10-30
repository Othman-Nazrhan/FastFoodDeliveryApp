import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { getPendingOrdersCount } from '@/utils/dataUtils';
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface MenuItem {
  name: string;
  label: string;
  icon: string;
  badge?: number;
  favorite?: boolean;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const CustomDrawer: React.FC<DrawerContentComponentProps> = (props) => {
  const colorScheme = useColorScheme();
  const [favorites, setFavorites] = useState<string[]>(['orders']); // Default favorite

  const toggleFavorite = (itemName: string) => {
    setFavorites(prev =>
      prev.includes(itemName)
        ? prev.filter(fav => fav !== itemName)
        : [...prev, itemName]
    );
  };

  const menuSections: MenuSection[] = [
    {
      title: 'Gestion',
      items: [
        { name: 'index', label: 'Home', icon: 'house.fill' },
        { name: 'menu', label: 'Menu', icon: 'list.bullet' },
        { name: 'stats', label: 'Dashboard', icon: 'chart.bar.fill' },
        { name: 'orders', label: 'Orders', icon: 'list.bullet', badge: getPendingOrdersCount(), favorite: true },
      ],
    },
    {
      title: 'Administration',
      items: [
        { name: 'users', label: 'Users', icon: 'person.2.fill' },
        { name: 'analytics', label: 'Analytics', icon: 'chart.pie.fill' },
        { name: 'payments', label: 'Payments', icon: 'creditcard.fill', badge: 1 },
      ],
    },
    {
      title: 'Others',
      items: [
        { name: 'settings', label: 'Settings', icon: 'gear' },
        { name: 'profile', label: 'Profile', icon: 'person.circle.fill' },
      ],
    },
  ];

  const renderMenuItem = (item: MenuItem, sectionIndex: number, itemIndex: number) => {
    const isFavorite = favorites.includes(item.name);
    const isLastInSection = itemIndex === menuSections[sectionIndex].items.length - 1;

    return (
      <View key={item.name}>
        <TouchableOpacity
          style={[styles.menuItem, isFavorite && styles.favoriteItem]}
          onPress={() => props.navigation.navigate(item.name)}
        >
          <View style={styles.menuItemLeft}>
            <IconSymbol name={item.icon} size={24} color={Colors[colorScheme ?? 'light'].tint} />
            <Text style={[styles.menuItemText, { color: Colors[colorScheme ?? 'light'].text }]}>
              {item.label}
            </Text>
            {item.badge && item.badge > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.badge}</Text>
              </View>
            )}
          </View>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(item.name)}
          >
            <IconSymbol
              name={isFavorite ? 'star.fill' : 'star'}
              size={16}
              color={isFavorite ? '#FFD700' : Colors[colorScheme ?? 'light'].text}
            />
          </TouchableOpacity>
        </TouchableOpacity>
        {!isLastInSection && <View style={styles.separator} />}
      </View>
    );
  };

  const renderSection = (section: MenuSection, sectionIndex: number) => (
    <View key={section.title} style={styles.section}>
      <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
        {section.title}
      </Text>
      {section.items.map((item, itemIndex) => renderMenuItem(item, sectionIndex, itemIndex))}
    </View>
  );

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: Colors[colorScheme ?? 'light'].text }]}>
          Fast Food Delivery
        </Text>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => props.navigation.closeDrawer()}
        >
          <IconSymbol name="xmark" size={20} color={Colors[colorScheme ?? 'light'].text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.menuContainer}>
        {menuSections.map((section, index) => renderSection(section, index))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.collapseButton}
          onPress={() => props.navigation.closeDrawer()}
        >
          <IconSymbol name="chevron.left" size={20} color={Colors[colorScheme ?? 'light'].text} />
          <Text style={[styles.collapseText, { color: Colors[colorScheme ?? 'light'].text }]}>
            Réduire le menu
          </Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  favoriteItem: {
    backgroundColor: Colors.light.cardBackground,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
  },
  badge: {
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  favoriteButton: {
    padding: 4,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.light.border,
    marginHorizontal: 8,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
  },
  collapseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  collapseText: {
    fontSize: 14,
    marginLeft: 8,
  },
});

export default CustomDrawer;
