import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from '../../components/cartItems'

const url = "https://course-api.com/react-useReducer-cart-project";
const initialState = {
    cartItems: cartItems,
    amount: 4,
    total: 0,
    isLoading: true,
};
export const getCartItems = createAsyncThunk("cart/getCartItems", () => {
    return fetch(url)
        .then(resp => resp.json())
        .catch((err) => console.log(err))
})
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
        },
        removeItem: (state, action) => {
            const ItemId = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== ItemId)
        },
        increase: (state, { payload }) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            cartItem.amount = cartItem.amount + 1
        },
        decrease: (state, { payload }) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            cartItem.amount = cartItem.amount - 1
        },
        calculateTotal: (state) => {
            let total = 0;
            let amount = 0;
            state.cartItems.forEach((item) => {
                amount = amount + item.amount;
                total += item.amount * item.price;
            })
            state.amount = amount;
            state.total = total;
        },
    },
    extraReducers: {
        [getCartItems.pending]: (state) => {
            state.isLoading = true
        },
        [getCartItems.fulfilled]: (state, action) => {
            console.log(action)
            state.isLoading = false
            state.cartItem = action.payload
        },
        [getCartItems.rejected]: (state) => {
            state.isLoading = false
        }
    }
})
console.log(cartSlice)
export const { clearCart, increase, decrease, removeItem, calculateTotal } = cartSlice.actions;
export default cartSlice.reducer