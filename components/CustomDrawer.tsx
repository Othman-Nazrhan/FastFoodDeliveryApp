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
  const colors = Colors[colorScheme ?? 'light'];
  const [favorites, setFavorites] = useState<string[]>(['orders']); // Default favorite
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'Gestion': true,
    'Administration': false,
    'Others': false,
  });

  const toggleFavorite = (itemName: string) => {
    setFavorites(prev =>
      prev.includes(itemName)
        ? prev.filter(fav => fav !== itemName)
        : [...prev, itemName]
    );
  };

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle],
    }));
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
            <IconSymbol name={item.icon} size={24} color={colors.tint} />
            <Text style={[styles.menuItemText, { color: colors.text }]}>
              {item.label}
            </Text>
            {item.badge && item.badge > 0 && (
              <View style={[styles.badge, { backgroundColor: colors.error }]}>
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
              color={isFavorite ? '#FFD700' : colors.text}
            />
          </TouchableOpacity>
        </TouchableOpacity>
        {!isLastInSection && <View style={[styles.separator, { backgroundColor: colors.border }]} />}
      </View>
    );
  };

  const renderSection = (section: MenuSection, sectionIndex: number) => {
    const isExpanded = expandedSections[section.title];

    return (
      <View key={section.title} style={styles.section}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => toggleSection(section.title)}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {section.title}
          </Text>
          <IconSymbol
            name={isExpanded ? 'chevron.down' : 'chevron.right'}
            size={16}
            color={colors.muted}
          />
        </TouchableOpacity>
        {isExpanded && section.items.map((item, itemIndex) => renderMenuItem(item, sectionIndex, itemIndex))}
      </View>
    );
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.headerText, { color: colors.text }]}>
          Fast Food Delivery
        </Text>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => props.navigation.closeDrawer()}
        >
          <IconSymbol name="xmark" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.menuContainer}>
        {menuSections.map((section, index) => renderSection(section, index))}
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: colors.border }]}>
        <TouchableOpacity
          style={styles.collapseButton}
          onPress={() => props.navigation.closeDrawer()}
        >
          <IconSymbol name="chevron.left" size={20} color={colors.text} />
          <Text style={[styles.collapseText, { color: colors.text }]}>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
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
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 6,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 0,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginLeft: 16,
  },
  favoriteItem: {},
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
    marginHorizontal: 24,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
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
