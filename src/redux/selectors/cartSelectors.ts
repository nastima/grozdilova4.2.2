import { RootState } from '../store/store';

// Просто возвращаем данные из cart slice
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartOpen = (state: RootState) => state.cart.isOpen;