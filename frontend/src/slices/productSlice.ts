import { createSlice } from "@reduxjs/toolkit";

import type { ProductState } from "../types/Product";

import {
    createProduct,
    fetchProductById,
    fetchProducts,
    updateProduct
} from "../thunks/productThunk";


const initialState: ProductState = {

    products: [],

    singleProduct: null,

    loading: false,

    error: null

};


const productSlice = createSlice({

    name: "product",

    initialState,

    reducers: {

    },

    extraReducers(builder) {


        // =================================
        // FETCH ALL PRODUCTS
        // =================================

        builder

            .addCase(fetchProducts.fulfilled, (state, action) => {

                state.products = action.payload;

                state.loading = false;

            })

            .addCase(fetchProducts.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(fetchProducts.rejected, (state) => {

                state.error = "Something went wrong";

                state.loading = false;

            });


        // =================================
        // FETCH PRODUCT BY ID
        // =================================

        builder

            .addCase(fetchProductById.fulfilled, (state, action) => {

                state.singleProduct = action.payload;

                state.loading = false;

            })

            .addCase(fetchProductById.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(fetchProductById.rejected, (state) => {

                state.error = "Something went wrong";

                state.loading = false;

            });


        // =================================
        // CREATE PRODUCT
        // =================================

        builder

            .addCase(createProduct.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(createProduct.fulfilled, (state, action) => {

                state.products.push(action.payload);

                state.loading = false;

            })

            .addCase(createProduct.rejected, (state) => {

                state.loading = false;

                state.error = "Unable to create product.";

            });


        // =================================
        // UPDATE PRODUCT
        // =================================

        builder

            .addCase(updateProduct.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(updateProduct.fulfilled, (state, action) => {

                // Update currently selected product

                state.singleProduct = action.payload;


                // Find the product in products[]

                const index = state.products.findIndex(
                    (product) =>
                        product.productId === action.payload.productId
                );


                // Replace old product with updated product

                if (index !== -1) {

                    state.products[index] = action.payload;

                }


                state.loading = false;

            })

            .addCase(updateProduct.rejected, (state) => {

                state.loading = false;

                state.error = "Unable to update product.";

            });

    }

});


const productReducer = productSlice.reducer;

export default productReducer;

