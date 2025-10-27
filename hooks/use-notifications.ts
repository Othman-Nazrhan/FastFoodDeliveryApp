import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';

export const useNotifications = () => {
  const [notificationPermission, setNotificationPermission] = useState<boolean | null>(null);

  useEffect(() => {
    checkNotificationPermissions();
  }, []);

  const checkNotificationPermissions = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    setNotificationPermission(status === 'granted');
  };

  const requestNotificationPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    setNotificationPermission(status === 'granted');
    return status === 'granted';
  };

  const scheduleNotification = async (title: string, body: string, data?: any) => {
    try {
      if (!notificationPermission) {
        const granted = await requestNotificationPermissions();
        if (!granted) {
          console.warn('Notification permissions not granted');
          return;
        }
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data: data || {},
        },
        trigger: null, // Send immediately
      });
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  };

  return {
    notificationPermission,
    requestNotificationPermissions,
    scheduleNotification,
  };
};
