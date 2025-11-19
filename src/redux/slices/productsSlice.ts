import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {Product, ProductsState } from '../../types/types';

// Async thunk для загрузки продуктов
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (): Promise<Product[]> => {
        const response = await fetch('https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json');

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        return await response.json() as Product[];
    }
);

const initialState: ProductsState = {
    items: [],
    loading: false,
    error: null,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        // редюсер для управления loading
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong.';
            });
    },
});

export  const  {  setLoading  } = productsSlice.actions;
export  default  productsSlice.reducer;