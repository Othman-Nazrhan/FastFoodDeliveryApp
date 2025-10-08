export interface FoodItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
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
    },
    {
      id: '2',
      name: 'Cheese Burger',
      price: 9.99,
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400',
      category: 'burgers',
      description: 'Classic burger topped with melted cheese and fresh veggies.',
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
    },
    {
      id: '4',
      name: 'Pepperoni Pizza',
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400',
      category: 'pizzas',
      description: 'Spicy pepperoni with cheese and tomato sauce.',
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
    },
  ],
};
