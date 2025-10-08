import { Dimensions, StyleSheet } from 'react-native';

export const indexStyles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    paddingHorizontal: 32,
  },
  sliderContainer: {
    marginBottom: 16,
    paddingHorizontal: 32,
  },
  sliderItem: {
    width: Dimensions.get('window').width - 64,
    height: 200,
  },
  sliderImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  sliderOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 16,
  },
  sliderTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  categoriesContainer: {
    flex: 1,
    paddingHorizontal: 32,
  },
  sectionTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  categoriesList: {
    paddingHorizontal: 0,
  },
  categoryCard: {
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
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  categoryIcon: {
    marginBottom: 8,
  },
  categoryName: {
    textAlign: 'center',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
