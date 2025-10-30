import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Input } from '@/components/ui/Input';
import { useThemeColor } from '@/hooks/use-theme-color';
import { profileStyles } from '@/styles/profileStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const cardBackground = useThemeColor({}, 'cardBackground');
  const shadowColor = useThemeColor({}, 'shadow');
  const muted = useThemeColor({}, 'muted');
  const primary = useThemeColor({}, 'primary');
  const buttonText = useThemeColor({}, 'buttonText');
  const background = useThemeColor({}, 'background');

  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, State 12345',
    avatar: 'https://via.placeholder.com/150',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editProfile, setEditProfile] = useState(profile);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant permission to access your photos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setEditProfile({ ...editProfile, avatar: result.assets[0].uri });
    }
  };

  const handleSave = () => {
    if (!editProfile.name || !editProfile.email) {
      Alert.alert('Error', 'Name and email are required');
      return;
    }
    setProfile(editProfile);
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditProfile(profile);
    setIsEditing(false);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: background }}>
      <ThemedView style={profileStyles.container}>
        <ThemedText type="title" style={profileStyles.title}>
          Profile
        </ThemedText>

        {/* Avatar Section */}
        <ThemedView style={[profileStyles.avatarContainer, { backgroundColor: cardBackground, shadowColor }]}>
          <TouchableOpacity
            onPress={isEditing ? pickImage : undefined}
            style={profileStyles.avatarTouchable}
          >
            <Image source={{ uri: isEditing ? editProfile.avatar : profile.avatar }} style={profileStyles.avatar} />
            {isEditing && (
              <View style={[profileStyles.editOverlay, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
                <Ionicons name="camera" size={24} color="white" />
              </View>
            )}
          </TouchableOpacity>
          <ThemedText type="subtitle" style={[profileStyles.name, { color: primary }]}>
            {isEditing ? editProfile.name : profile.name}
          </ThemedText>
        </ThemedView>

        {/* Profile Details */}
        <ThemedView style={[profileStyles.detailsContainer, { backgroundColor: cardBackground, shadowColor }]}>
          <ProfileField
            label="Name"
            value={isEditing ? editProfile.name : profile.name}
            onChangeText={(text) => setEditProfile({ ...editProfile, name: text })}
            editable={isEditing}
            icon="person"
          />
          <ProfileField
            label="Email"
            value={isEditing ? editProfile.email : profile.email}
            onChangeText={(text) => setEditProfile({ ...editProfile, email: text })}
            editable={isEditing}
            icon="mail"
            keyboardType="email-address"
          />
          <ProfileField
            label="Phone"
            value={isEditing ? editProfile.phone : profile.phone}
            onChangeText={(text) => setEditProfile({ ...editProfile, phone: text })}
            editable={isEditing}
            icon="call"
            keyboardType="phone-pad"
          />
          <ProfileField
            label="Address"
            value={isEditing ? editProfile.address : profile.address}
            onChangeText={(text) => setEditProfile({ ...editProfile, address: text })}
            editable={isEditing}
            icon="location"
            multiline
          />
        </ThemedView>

        {/* Action Buttons */}
        <ThemedView style={profileStyles.buttonContainer}>
          {isEditing ? (
            <>
              <TouchableOpacity
                style={[profileStyles.button, { backgroundColor: primary }]}
                onPress={handleSave}
              >
                <Ionicons name="checkmark" size={20} color={buttonText} style={{ marginRight: 8 }} />
                <ThemedText type="defaultSemiBold" style={[profileStyles.buttonText, { color: buttonText }]}>
                  Save Changes
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[profileStyles.button, { backgroundColor: muted }]}
                onPress={handleCancel}
              >
                <Ionicons name="close" size={20} color={buttonText} style={{ marginRight: 8 }} />
                <ThemedText type="defaultSemiBold" style={[profileStyles.buttonText, { color: buttonText }]}>
                  Cancel
                </ThemedText>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={[profileStyles.button, { backgroundColor: primary }]}
              onPress={() => setIsEditing(true)}
            >
              <Ionicons name="pencil" size={20} color={buttonText} style={{ marginRight: 8 }} />
              <ThemedText type="defaultSemiBold" style={[profileStyles.buttonText, { color: buttonText }]}>
                Edit Profile
              </ThemedText>
            </TouchableOpacity>
          )}
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

interface ProfileFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  editable: boolean;
  icon: keyof typeof Ionicons.glyphMap;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  multiline?: boolean;
}

function ProfileField({ label, value, onChangeText, editable, icon, keyboardType = 'default', multiline = false }: ProfileFieldProps) {
  const muted = useThemeColor({}, 'muted');
  const primary = useThemeColor({}, 'primary');

  return (
    <View style={profileStyles.fieldContainer}>
      <View style={profileStyles.fieldHeader}>
        <Ionicons name={icon} size={20} color={primary} style={{ marginRight: 8 }} />
        <ThemedText type="defaultSemiBold" style={[profileStyles.fieldLabel, { color: primary }]}>
          {label}
        </ThemedText>
      </View>
      {editable ? (
        <Input
          value={value}
          onChangeText={onChangeText}
          placeholder={`Enter ${label.toLowerCase()}`}
          keyboardType={keyboardType}
          multiline={multiline}
        />
      ) : (
        <ThemedText style={[profileStyles.fieldValue, { color: muted }]}>
          {value}
        </ThemedText>
      )}
    </View>
  );
}
