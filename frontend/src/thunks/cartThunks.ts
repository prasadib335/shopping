import { createAsyncThunk } from "@reduxjs/toolkit";
import { addToCart, clearCart, decreaseQuantity as decreaseQuantityApi, getCartItems, increaseQuantity as increaseQuantityApi, removeFromCart as removeFromCartApi } from "../api/cartApi";
import type { Cart } from "../types/Cart";


export const fetchCart = createAsyncThunk<Cart,number>(
         "cart/fetchCart",
          async (userId) => {
                const cart : Cart = await getCartItems(userId);

                return cart;
          }
);


export const addProductToCart = createAsyncThunk<string,
    {
       userId : number,
       productId : number,
       quantity : number
    }
>(
      "cart/addProductToCart",
      async ({
            userId,productId,quantity
      }) => {
            return await addToCart(userId,productId,quantity);
      }
);

export const clearProductFromCart = createAsyncThunk<string,number>(
          "cart/clearProductFromCart",
          async (userId) => {
              return await clearCart(userId);
          }
)

export const addQuantity = createAsyncThunk<
           string,
           {
              userId : number,
              productId : number
           }
> (
      "cart/addQuantity",
       async ({userId,productId}) => {
             return await increaseQuantityApi(userId,productId);
       }
);

export const removeQuantity = createAsyncThunk<
             string,
             {
                  userId : number,
                  productId : number
             }
>(
      "cart/removeQuantity",
      async ({userId,productId}) => {
              return await decreaseQuantityApi(userId,productId);
      }
);

export const deleteFromCart = createAsyncThunk<
            string,
            {
                  userId : number,
                  productId : number
            }
>(
      "cart/deleteFromCart",
      async ({userId,productId}) => {
            return await removeFromCartApi(userId,productId);
      }
)

export const clearAllProductsFromCart = createAsyncThunk<string,number>(
         "cart/clearAllProductsFromCart",
         async (userId) => {
              return await clearCart(userId);
         }
);


