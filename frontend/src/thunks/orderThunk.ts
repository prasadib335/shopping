import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Order } from "../types/Order";
import { getOrderItems, getOrders } from "../api/orderApi";
import type { OrderItem } from "../types/OrderItem";

export const fetchOrders = createAsyncThunk<
         Order[],
         number
>(
     "order/fetchOrders",
     async (userId : number) => {
          return await getOrders(userId);
     }
)

export const fetchOrderItems = createAsyncThunk<
     OrderItem[],
     number
>(
    "order/fetchOrderItems",
    async (orderId : number) => {
          return await getOrderItems(orderId);
    }
);