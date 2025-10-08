import { StyleSheet } from 'react-native';

export const menuStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  itemsList: {
    paddingHorizontal: 16,
  },
  itemCard: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemName: {
    textAlign: 'center',
    marginBottom: 4,
  },
  itemDescription: {
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 14,
  },
  itemPrice: {
    textAlign: 'center',
    marginBottom: 8,
  },
  addButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  addButtonText: {
  },
});
