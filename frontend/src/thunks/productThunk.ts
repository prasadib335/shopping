import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Product } from "../types/Product";
import { getProductById, getProducts } from "../api/productApi";

export const fetchProducts = createAsyncThunk<
           Product[],
           void
>(
        "product/fetchProducts",
        async () => {
              return await getProducts();
        }
)

export const fetchProductById = createAsyncThunk<
          Product,
          number
>(
        "product/fetchProductById",
        async (productId : number) => {
            return await getProductById(productId);
        }
)
