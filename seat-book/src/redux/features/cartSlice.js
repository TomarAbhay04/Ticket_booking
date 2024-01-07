import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    cart: [],
    // total: 0,
    // totalItems: 0,

};

// createSlice() will generate action creators and action types that correspond to the reducers and state.

const cartSlice = createSlice({
    name: 'cartslice',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const product = state.cart.find((item) => item.id === item.id);
            if (product) {
                product.quantity += 1;
            } else {
                state.cart.push({...item, quantity: 1});
            }
        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            const product = state.cart.find((item) => item.id === id);
            if (product.quantity === 1) {
                state.cart = state.cart.filter((item) => item.id !== id);
            } else {
                product.quantity -= 1;
            }
        },
        clearCart: (state) => {
            state.cart = [];
        },
    },
});

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;