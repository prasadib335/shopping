import { createSlice } from "@reduxjs/toolkit";
import type { Cart, CartState } from "../types/Cart";
import {fetchCart,addQuantity,removeQuantity,deleteFromCart, addProductToCart, clearProductFromCart, clearAllProductsFromCart } from "../thunks/cartThunks";

const initialState : CartState = {
        cart : {
                cartId: 0,
                userId: 0,  
                totalAmount: 0,
                items: []
        },
        loading : false,
        error : null
};

const cartSlice = createSlice({
          name : "cart",
          initialState,
          reducers : {
               
          },
          extraReducers(builder) {
                builder.addCase(fetchCart.fulfilled,(state : CartState,action) => {
                        const cart: Cart = action.payload;
                        state.cart = cart;
                        state.loading = false;
                        state.error = null;
                        
                })
                .addCase(fetchCart.rejected,(state) => {
                       state.error = "something went wrong";
                       state.loading = false;
                })
                .addCase(fetchCart.pending,(state) => {
                       state.loading = true;
                });

                builder.addCase(addQuantity.fulfilled,(state) => {
                        state.error = null;
                })
                .addCase(addQuantity.rejected,(state) => {
                        state.error = "something went wrong";
                })

                builder.addCase(removeQuantity.fulfilled,(state) => {
                        state.error = null;
                })
                .addCase(removeQuantity.rejected,(state) => {
                        state.error = "something went wrong";
                })

                builder.addCase(deleteFromCart.fulfilled,(state) => {
                        state.error = null;
                })
                .addCase(deleteFromCart.rejected,(state) => {
                        state.error = "something went wrong";
                })

                builder.addCase(addProductToCart.fulfilled,(state) => {
                        state.error = null;
                })
                .addCase(addProductToCart.rejected,(state) => {
                        state.error = "something went wrong";
                })

                builder.addCase(clearProductFromCart.fulfilled,(state) => {
                        state.error = null;
                })
                .addCase(clearProductFromCart.rejected,(state) => {
                        state.error = "something went wrong";
                })

                builder.addCase(clearAllProductsFromCart.fulfilled,(state) => {
                        state.error = null;
                })
                .addCase(clearAllProductsFromCart.rejected,(state) => {
                        state.error = "something went wrong";
                })
   
          },
});

const cartReducer = cartSlice.reducer;

export default cartReducer;




