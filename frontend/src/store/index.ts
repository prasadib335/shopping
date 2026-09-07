import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";
import productReducer from "../slices/productSlice";
import orderReducer from "../slices/orderSlice";

const store = configureStore({
       reducer : {
            cart : cartReducer,
            products : productReducer,
            orders : orderReducer
       }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;