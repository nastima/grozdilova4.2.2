import { RootState } from '../store/store';

// Просто возвращаем данные из products slice
export const selectProducts = (state: RootState) => state.products.items;
export const selectProductsLoading = (state: RootState) => state.products.loading;
