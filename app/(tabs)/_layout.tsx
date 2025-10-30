import { Drawer } from 'expo-router/drawer';
import React from 'react';

import CustomDrawer from '@/components/CustomDrawer';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function DrawerLayout() {
  const colorScheme = useColorScheme();

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
      }}>
      <Drawer.Screen
        name="index"
        options={{
          title: 'Home',
          drawerLabel: 'Home',
        }}
      />
      <Drawer.Screen
        name="menu"
        options={{
          title: 'Menu',
          drawerLabel: 'Menu',
        }}
      />
      <Drawer.Screen
        name="stats"
        options={{
          title: 'Dashboard',
          drawerLabel: 'Dashboard',
        }}
      />
      <Drawer.Screen
        name="orders"
        options={{
          title: 'Orders',
          drawerLabel: 'Orders',
        }}
      />
      <Drawer.Screen
        name="analytics"
        options={{
          title: 'Analytics',
          drawerLabel: 'Analytics',
        }}
      />
      <Drawer.Screen
        name="users"
        options={{
          title: 'Users',
          drawerLabel: 'Users',
        }}
      />
      <Drawer.Screen
        name="payments"
        options={{
          title: 'Payments',
          drawerLabel: 'Payments',
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          title: 'Settings',
          drawerLabel: 'Settings',
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          title: 'Profile',
          drawerLabel: 'Profile',
        }}
      />
    </Drawer>
  );
}


