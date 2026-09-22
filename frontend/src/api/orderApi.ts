import api from "./axios";
import  type {Order} from "../types/Order";
import type { OrderItem } from "../types/OrderItem";
// get order items

export async function getOrders(userId : number) : Promise<Order[]> {

    const response = await api.get<Order[]>(
                   `/order/${userId}`);

    return response.data;

}

export async function getOrderItems(
    orderId: number
): Promise<OrderItem[]> {

    const response = await api.get<OrderItem[]>(
        `/order/orderitems/${orderId}`
    );

    return response.data;
}

