import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'YOUR_SUPABASE_URL' || supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY') {
  throw new Error('Supabase is not properly configured. Please set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY environment variables.');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
          created_at: string;
          updated_at: string;
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
          created_at?: string;
          updated_at?: string;
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
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          items: any; // JSON array of CartItem
          total: number;
          date: string;
          delivery_time: number;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          items: any;
          total: number;
          date: string;
          delivery_time: number;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          items?: any;
          total?: number;
          date?: string;
          delivery_time?: number;
          status?: string;
          created_at?: string;
          updated_at?: string;
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
          settings: any; // JSON object for user settings
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          avatar?: string | null;
          join_date: string;
          total_orders?: number;
          total_spent?: number;
          settings?: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          avatar?: string | null;
          join_date?: string;
          total_orders?: number;
          total_spent?: number;
          settings?: any;
          created_at?: string;
          updated_at?: string;
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
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          amount: number;
          method: string;
          status: string;
          date: string;
          order_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          amount?: number;
          method?: string;
          status?: string;
          date?: string;
          order_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
