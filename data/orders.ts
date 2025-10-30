import { OrderHistory } from '@/types';

export const mockOrderHistory: OrderHistory[] = [
  {
    id: '1',
    items: [
      { id: '1', name: 'Classic Burger', price: 8.99, image: '', category: 'burgers', description: '', rating: 4.5, quantity: 2 },
      { id: '5', name: 'French Fries', price: 4.99, image: '', category: 'fries', description: '', rating: 4.2, quantity: 1 },
      { id: '6', name: 'Coca Cola', price: 2.99, image: '', category: 'drinks', description: '', rating: 4.0, quantity: 1 },
    ],
    total: 25.96,
    date: '2024-10-01',
    deliveryTime: 20,
  },
  {
    id: '2',
    items: [
      { id: '3', name: 'Margherita Pizza', price: 12.99, image: '', category: 'pizzas', description: '', rating: 4.8, quantity: 1 },
      { id: '9', name: 'Sweet Potato Fries', price: 5.99, image: '', category: 'fries', description: '', rating: 4.5, quantity: 1 },
      { id: '10', name: 'Fresh Orange Juice', price: 3.99, image: '', category: 'drinks', description: '', rating: 4.6, quantity: 2 },
    ],
    total: 26.96,
    date: '2024-10-02',
    deliveryTime: 25,
  },
  {
    id: '3',
    items: [
      { id: '2', name: 'Cheese Burger', price: 9.99, image: '', category: 'burgers', description: '', rating: 4.7, quantity: 1 },
      { id: '4', name: 'Pepperoni Pizza', price: 14.99, image: '', category: 'pizzas', description: '', rating: 4.6, quantity: 1 },
      { id: '6', name: 'Coca Cola', price: 2.99, image: '', category: 'drinks', description: '', rating: 4.0, quantity: 1 },
    ],
    total: 27.97,
    date: '2024-10-03',
    deliveryTime: 22,
  },
  {
    id: '4',
    items: [
      { id: '7', name: 'Veggie Burger', price: 10.99, image: '', category: 'burgers', description: '', rating: 4.3, quantity: 1 },
      { id: '5', name: 'French Fries', price: 4.99, image: '', category: 'fries', description: '', rating: 4.2, quantity: 2 },
    ],
    total: 20.97,
    date: '2024-10-04',
    deliveryTime: 18,
  },
  {
    id: '5',
    items: [
      { id: '8', name: 'BBQ Chicken Pizza', price: 15.99, image: '', category: 'pizzas', description: '', rating: 4.4, quantity: 1 },
      { id: '10', name: 'Fresh Orange Juice', price: 3.99, image: '', category: 'drinks', description: '', rating: 4.6, quantity: 1 },
    ],
    total: 19.98,
    date: '2024-10-05',
    deliveryTime: 20,
  },
  {
    id: '6',
    items: [
      { id: '1', name: 'Classic Burger', price: 8.99, image: '', category: 'burgers', description: '', rating: 4.5, quantity: 1 },
      { id: '3', name: 'Margherita Pizza', price: 12.99, image: '', category: 'pizzas', description: '', rating: 4.8, quantity: 1 },
      { id: '9', name: 'Sweet Potato Fries', price: 5.99, image: '', category: 'fries', description: '', rating: 4.5, quantity: 1 },
      { id: '6', name: 'Coca Cola', price: 2.99, image: '', category: 'drinks', description: '', rating: 4.0, quantity: 1 },
    ],
    total: 30.96,
    date: '2024-10-06',
    deliveryTime: 28,
  },
  {
    id: '7',
    items: [
      { id: '2', name: 'Cheese Burger', price: 9.99, image: '', category: 'burgers', description: '', rating: 4.7, quantity: 2 },
      { id: '5', name: 'French Fries', price: 4.99, image: '', category: 'fries', description: '', rating: 4.2, quantity: 1 },
    ],
    total: 24.97,
    date: '2024-10-07',
    deliveryTime: 20,
  },
];
