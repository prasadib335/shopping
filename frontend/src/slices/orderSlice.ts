import { createSlice } from "@reduxjs/toolkit";
import type { OrderState } from "../types/Order";
import { fetchOrderItems, fetchOrders } from "../thunks/orderThunk";

const initialState: OrderState = {
    orders: [],
    orderItems: [],
    loading: false,
    error: null
};

const orderSlice = createSlice({
    name: "orders",
    initialState,

    reducers: {},

    extraReducers(builder) {

        // FETCH ORDERS
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.orders = action.payload;
                state.loading = false;
            })
            .addCase(fetchOrders.rejected, (state) => {
                state.loading = false;
                state.error = "Something went wrong";
            });


        // FETCH ORDER ITEMS
        builder
            .addCase(fetchOrderItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderItems.fulfilled, (state, action) => {
                state.orderItems = action.payload;
                state.loading = false;
            })
            .addCase(fetchOrderItems.rejected, (state) => {
                state.loading = false;
                state.error = "Something went wrong";
            });
    },
});

const orderReducer = orderSlice.reducer;

export default orderReducer;