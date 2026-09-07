import { createSlice } from "@reduxjs/toolkit";
import type { Product, ProductState } from "../types/Product";
import { fetchProductById, fetchProducts } from "../thunks/productThunk";


const initialState : ProductState = {
       products : [],
       singleProduct : null,
       loading : false,
       error : null
};

const productSlice = createSlice({
        name : "product",
        initialState,
        reducers : {

        },
        extraReducers(builder) {
               builder.addCase(fetchProducts.fulfilled,(state,action) =>  {
                       state.products = action.payload;
                       state.loading = false;
               })
               .addCase(fetchProducts.pending,(state,action) => {
                        state.loading = true;
               })
               .addCase(fetchProducts.rejected,(state,action) => {
                        state.error = "something went wrong";
                        state.loading = false;
               })

               builder.addCase(fetchProductById.fulfilled,(state,action) => {
                       state.singleProduct = action.payload;
                       state.loading = false;
               })
               .addCase(fetchProductById.pending,(state,action) => {
                      state.loading = true;
               })
               .addCase(fetchProductById.rejected,(state,action) => {
                      state.error = "something went wrong";
               })

        },
});

const productReducer = productSlice.reducer;

export default productReducer;