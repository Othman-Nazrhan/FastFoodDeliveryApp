import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useUser } from '@/contexts/UserContext';
import { useThemeColor } from '@/hooks/use-theme-color';
import { settingsStyles } from '@/styles/settingsStyles';
import { useEffect, useState } from 'react';
import { ScrollView, Switch, TouchableOpacity } from 'react-native';

export default function SettingsScreen() {
  const cardBackground = useThemeColor({}, 'cardBackground');
  const shadowColor = useThemeColor({}, 'shadow');

  const { state: userState, updateSettings } = useUser();

  const [notifications, setNotifications] = useState(userState.settings.notifications ?? true);
  const [darkMode, setDarkMode] = useState(userState.settings.darkMode ?? false);
  const [locationServices, setLocationServices] = useState(userState.settings.locationServices ?? true);

  // Update local state when user settings change
  useEffect(() => {
    setNotifications(userState.settings.notifications ?? true);
    setDarkMode(userState.settings.darkMode ?? false);
    setLocationServices(userState.settings.locationServices ?? true);
  }, [userState.settings]);

  const settingsSections = [
    {
      title: 'Account',
      items: [
        { icon: 'person.fill', label: 'Profile', action: 'profile' },
        { icon: 'lock.fill', label: 'Privacy & Security', action: 'privacy' },
        { icon: 'bell.fill', label: 'Notifications', action: 'notifications', toggle: notifications, setToggle: setNotifications },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { icon: 'moon.fill', label: 'Dark Mode', action: 'darkMode', toggle: darkMode, setToggle: setDarkMode },
        { icon: 'location.fill', label: 'Location Services', action: 'location', toggle: locationServices, setToggle: setLocationServices },
        { icon: 'globe', label: 'Language', action: 'language', value: 'English' },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: 'questionmark.circle.fill', label: 'Help & Support', action: 'help' },
        { icon: 'info.circle.fill', label: 'About', action: 'about' },
        { icon: 'star.fill', label: 'Rate App', action: 'rate' },
      ],
    },
  ];

  const handleToggleChange = async (setting: string, value: boolean) => {
    try {
      await updateSettings({ [setting]: value });
    } catch (error) {
      console.error(`Error updating ${setting}:`, error);
      // Revert the toggle if update failed
      if (setting === 'notifications') setNotifications(!value);
      else if (setting === 'darkMode') setDarkMode(!value);
      else if (setting === 'locationServices') setLocationServices(!value);
    }
  };

  const renderSettingItem = (item: any) => (
    <TouchableOpacity key={item.action} style={[settingsStyles.settingItem, { backgroundColor: cardBackground, shadowColor }]}>
      <ThemedView style={settingsStyles.settingLeft}>
        <IconSymbol name={item.icon} size={20} color={Colors.light.primary} />
        <ThemedText style={settingsStyles.settingLabel}>{item.label}</ThemedText>
      </ThemedView>
      {item.toggle !== undefined ? (
        <Switch
          value={item.toggle}
          onValueChange={(value) => {
            item.setToggle(value);
            handleToggleChange(item.action, value);
          }}
          trackColor={{ false: Colors.light.secondary, true: Colors.light.primary }}
          thumbColor={Colors.light.background}
        />
      ) : item.value ? (
        <ThemedView style={settingsStyles.settingRight}>
          <ThemedText style={settingsStyles.settingValue}>{item.value}</ThemedText>
          <IconSymbol name="chevron.right" size={16} color={Colors.light.secondary} />
        </ThemedView>
      ) : (
        <IconSymbol name="chevron.right" size={16} color={Colors.light.secondary} />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={settingsStyles.container}>
      <ThemedView style={settingsStyles.header}>
        <ThemedText type="title">Settings</ThemedText>
      </ThemedView>

      {settingsSections.map((section) => (
        <ThemedView key={section.title} style={settingsStyles.section}>
          <ThemedText type="subtitle" style={settingsStyles.sectionTitle}>{section.title}</ThemedText>
          {section.items.map(renderSettingItem)}
        </ThemedView>
      ))}

      <ThemedView style={settingsStyles.footer}>
        <TouchableOpacity style={settingsStyles.logoutButton}>
          <IconSymbol name="arrow.right.square.fill" size={20} color={Colors.light.error} />
          <ThemedText style={[settingsStyles.logoutText, { color: Colors.light.error }]}>Logout</ThemedText>
        </TouchableOpacity>
        <ThemedText style={settingsStyles.versionText}>Version 1.0.0</ThemedText>
      </ThemedView>
    </ScrollView>
  );
}
