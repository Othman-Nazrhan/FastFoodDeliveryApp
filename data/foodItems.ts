import { FoodItem } from '@/types';
import { supabase } from '@/utils/supabase';

// Function to fetch food items from Supabase
export const fetchFoodItems = async (): Promise<{ [key: string]: FoodItem[] }> => {
  const { data, error } = await supabase
    .from('food_items')
    .select('*');

  if (error) {
    throw new Error(`Error fetching food items: ${error.message}`);
  }

  // Transform data to match the expected structure
  const foodItems: { [key: string]: FoodItem[] } = {};

  data?.forEach((item) => {
    const foodItem: FoodItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
      description: item.description,
      rating: item.rating,
      isVegetarian: item.is_vegetarian || undefined,
    };

    if (!foodItems[item.category]) {
      foodItems[item.category] = [];
    }
    foodItems[item.category].push(foodItem);
  });

  return foodItems;
};

// Function to create a new food item
export const createFoodItem = async (item: Omit<FoodItem, 'id'>): Promise<FoodItem> => {
  const { data, error } = await supabase
    .from('food_items')
    .insert({
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
      description: item.description,
      rating: item.rating,
      is_vegetarian: item.isVegetarian,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Error creating food item: ${error.message}`);
  }

  return {
    id: data.id,
    name: data.name,
    price: data.price,
    image: data.image,
    category: data.category,
    description: data.description,
    rating: data.rating,
    isVegetarian: data.is_vegetarian || undefined,
  };
};

// Function to update a food item
export const updateFoodItem = async (id: string, updates: Partial<FoodItem>): Promise<FoodItem> => {
  const updateData: any = {};
  if (updates.name !== undefined) updateData.name = updates.name;
  if (updates.price !== undefined) updateData.price = updates.price;
  if (updates.image !== undefined) updateData.image = updates.image;
  if (updates.category !== undefined) updateData.category = updates.category;
  if (updates.description !== undefined) updateData.description = updates.description;
  if (updates.rating !== undefined) updateData.rating = updates.rating;
  if (updates.isVegetarian !== undefined) updateData.is_vegetarian = updates.isVegetarian;

  const { data, error } = await supabase
    .from('food_items')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Error updating food item: ${error.message}`);
  }

  return {
    id: data.id,
    name: data.name,
    price: data.price,
    image: data.image,
    category: data.category,
    description: data.description,
    rating: data.rating,
    isVegetarian: data.is_vegetarian || undefined,
  };
};

// Function to delete a food item
export const deleteFoodItem = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('food_items')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Error deleting food item: ${error.message}`);
  }
};

// Static fallback data (same as before)
const getStaticFoodItems = (): { [key: string]: FoodItem[] } => ({
  burgers: [
    {
      id: '1',
      name: 'Classic Burger',
      price: 8.99,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
      category: 'burgers',
      description: 'Juicy beef patty with lettuce, tomato, and special sauce.',
      rating: 4.5,
      isVegetarian: false,
    },
    {
      id: '2',
      name: 'Cheese Burger',
      price: 9.99,
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400',
      category: 'burgers',
      description: 'Classic burger topped with melted cheese and fresh veggies.',
      rating: 4.7,
      isVegetarian: false,
    },
    {
      id: '7',
      name: 'Veggie Burger',
      price: 10.99,
      image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400',
      category: 'burgers',
      description: 'Plant-based patty with avocado, sprouts, and vegan mayo.',
      rating: 4.3,
      isVegetarian: true,
    },
  ],
  pizzas: [
    {
      id: '3',
      name: 'Margherita Pizza',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
      category: 'pizzas',
      description: 'Fresh mozzarella, tomato sauce, and basil on thin crust.',
      rating: 4.8,
      isVegetarian: true,
    },
    {
      id: '4',
      name: 'Pepperoni Pizza',
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400',
      category: 'pizzas',
      description: 'Spicy pepperoni with cheese and tomato sauce.',
      rating: 4.6,
      isVegetarian: false,
    },
    {
      id: '8',
      name: 'BBQ Chicken Pizza',
      price: 15.99,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
      category: 'pizzas',
      description: 'Grilled chicken, BBQ sauce, red onions, and cilantro.',
      rating: 4.4,
      isVegetarian: false,
    },
  ],
  fries: [
    {
      id: '5',
      name: 'French Fries',
      price: 4.99,
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400',
      category: 'fries',
      description: 'Crispy golden fries, perfect side dish.',
      rating: 4.2,
      isVegetarian: true,
    },
    {
      id: '9',
      name: 'Sweet Potato Fries',
      price: 5.99,
      image: 'https://images.unsplash.com/photo-1526230427044-d092040d6e3c?w=400',
      category: 'fries',
      description: 'Baked sweet potato fries with sea salt.',
      rating: 4.5,
      isVegetarian: true,
    },
  ],
  drinks: [
    {
      id: '6',
      name: 'Coca Cola',
      price: 2.99,
      image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400',
      category: 'drinks',
      description: 'Refreshing cola drink, ice cold.',
      rating: 4.0,
      isVegetarian: true,
    },
    {
      id: '10',
      name: 'Fresh Orange Juice',
      price: 3.99,
      image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400',
      category: 'drinks',
      description: 'Freshly squeezed orange juice, no added sugar.',
      rating: 4.6,
      isVegetarian: true,
    },
  ],
});

// Export static data for backward compatibility (deprecated, use fetchFoodItems instead)
export const foodItems: { [key: string]: FoodItem[] } = getStaticFoodItems();
