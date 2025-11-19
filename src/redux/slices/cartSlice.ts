import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {CartState, Product} from '../../types/types';

const initialState: CartState = {
    items: [],
    isOpen: false,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<{product: Product; quantity: number}>) => {
            const { product, quantity } = action.payload;
            const existingItem = state.items.find((item) => item.id === product.id);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.items.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: quantity,
                });
            }
        },

        updateQuantity: (state, action: PayloadAction<{id: number; quantity: number}>) => {
            const {id, quantity} = action.payload;

            if(quantity === 0) {
                state.items = state.items.filter(item => item.id !== id);
            } else {
                const item = state.items.find(item => item.id === id);
                if (item) {
                    item.quantity = quantity;
                }
            }
        },

        toggleCart: (state) => {
            state.isOpen = !state.isOpen;
        },

        closeCart: (state) => {
            state.isOpen = false;
        },
    },
});

export const {addToCart, updateQuantity, toggleCart, closeCart} = cartSlice.actions;
export default cartSlice.reducer;