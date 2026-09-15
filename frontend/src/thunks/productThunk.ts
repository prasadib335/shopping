import { createAsyncThunk } from "@reduxjs/toolkit";

import type {
    Product,
    Products,
    CreateProduct,
    UpdateProduct
} from "../types/Product";

import {
    getProductById,
    getProducts,
    createProduct as createProductApi,
    updateProduct as updateProductApi
} from "../api/productApi";


export const fetchProducts = createAsyncThunk<
    Products[],
    void
>(
    "product/fetchProducts",
    async () => {

        return await getProducts();

    }
);


export const fetchProductById = createAsyncThunk<
    Product,
    number
>(
    "product/fetchProductById",
    async (productId: number) => {

        return await getProductById(productId);

    }
);


export const createProduct = createAsyncThunk<
    Product,
    CreateProduct
>(
    "product/createProduct",
    async (productData: CreateProduct) => {

        return await createProductApi(productData);

    }
);


export const updateProduct = createAsyncThunk<
    Product,
    {
        productId: number;
        productData: UpdateProduct;
    }
>(
    "product/updateProduct",
    async ({ productId, productData }) => {

        return await updateProductApi(
            productId,
            productData
        );

    }
);

