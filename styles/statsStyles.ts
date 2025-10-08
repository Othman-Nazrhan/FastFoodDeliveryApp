import { StyleSheet } from 'react-native';

export const statsStyles = StyleSheet.create({
  headerPlaceholder: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  statsContainer: {
    paddingHorizontal: 16,
  },
  statCard: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
});
