export interface FoodItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  isVegetarian?: boolean;
}

export const foodItems: { [key: string]: FoodItem[] } = {
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
};
