# TODO: Integrate Supabase Fully in FastFoodDeliveryApp

## Overview
The app currently has partial Supabase integration with fallbacks to static data. The goal is to make Supabase the primary data source, removing static fallbacks and implementing full CRUD operations.

## Current State Analysis
- Supabase client setup in `utils/supabase.ts`
- Fetch functions in data files with fallbacks to static data
- Hooks use fetch functions with error handling
- Contexts manage local state without syncing to Supabase
- Screens use hooks but don't perform mutations

## Tasks

### 1. Update Supabase Configuration
- [x] Modify `utils/supabase.ts` to throw error if Supabase not configured instead of returning null
- [x] Ensure environment variables are documented

### 2. Update Data Layer
- [x] Remove static fallbacks from `data/orders.ts`, `data/users.ts`, `data/payments.ts`, `data/foodItems.ts`
- [x] Add mutation functions for creating/updating data:
  - Orders: `createOrder`, `updateOrder`
  - Users: `createUser`, `updateUser`
  - Payments: `createPayment`, `updatePayment`
  - Food Items: `createFoodItem`, `updateFoodItem`, `deleteFoodItem`

### 3. Update Hooks
- [x] Modify `use-orders.ts`, `use-users.ts`, `use-payments.ts` to handle Supabase errors without fallbacks
- [x] Add mutation hooks or functions for creating/updating data
- [x] Ensure proper error handling and loading states

### 4. Update Contexts
- [x] Modify `CartContext.tsx` to save orders to Supabase when placing order
- [x] Modify `UserContext.tsx` to save user settings to Supabase
- [x] Add real-time subscriptions if needed for live updates (not required for basic integration)

### 5. Update Screens
- [x] Update `menu.tsx` to save new food items to Supabase
- [x] Update `cart.tsx` to create orders and payments in Supabase
- [x] Update user profile/settings screens to save to Supabase
- [x] Ensure all CRUD operations are implemented

### 6. Database Schema Verification
- [x] Verify all required tables exist in Supabase
- [x] Ensure Database interface in `utils/supabase.ts` matches schema
- [x] Add any missing fields (e.g., timestamps, user associations)

### 7. Testing and Error Handling
- [ ] Test all operations with Supabase
- [ ] Implement proper error messages for users
- [ ] Add offline handling if needed

### 8. Documentation
- [x] Update README with Supabase setup instructions
- [x] Document environment variables required
