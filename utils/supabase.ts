import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

// Create Supabase client only if valid URLs are provided
export const supabase = (supabaseUrl && supabaseUrl.startsWith('http') && supabaseAnonKey && supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY')
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Database types (extend the existing types.ts)
export interface Database {
  public: {
    Tables: {
      food_items: {
        Row: {
          id: string;
          name: string;
          price: number;
          image: string;
          category: string;
          description: string;
          rating: number;
          is_vegetarian: boolean | null;
        };
        Insert: {
          id?: string;
          name: string;
          price: number;
          image: string;
          category: string;
          description: string;
          rating: number;
          is_vegetarian?: boolean | null;
        };
        Update: {
          id?: string;
          name?: string;
          price?: number;
          image?: string;
          category?: string;
          description?: string;
          rating?: number;
          is_vegetarian?: boolean | null;
        };
      };
      orders: {
        Row: {
          id: string;
          items: any; // JSON array of CartItem
          total: number;
          date: string;
          delivery_time: number;
        };
        Insert: {
          id?: string;
          items: any;
          total: number;
          date: string;
          delivery_time: number;
        };
        Update: {
          id?: string;
          items?: any;
          total?: number;
          date?: string;
          delivery_time?: number;
        };
      };
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          avatar: string | null;
          join_date: string;
          total_orders: number;
          total_spent: number;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          avatar?: string | null;
          join_date: string;
          total_orders: number;
          total_spent: number;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          avatar?: string | null;
          join_date?: string;
          total_orders?: number;
          total_spent?: number;
        };
      };
      payments: {
        Row: {
          id: string;
          user_id: string;
          amount: number;
          method: string;
          status: string;
          date: string;
          order_id: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          amount: number;
          method: string;
          status: string;
          date: string;
          order_id?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          amount?: number;
          method?: string;
          status?: string;
          date?: string;
          order_id?: string | null;
        };
      };
    };
  };
}
