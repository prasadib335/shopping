import axios from "axios";
import  type {Order} from "../types/Order";
import type { OrderItem } from "../types/OrderItem";
// get order items

export async function getOrders(userId : number) : Promise<Order[]> {

    const response = await axios.get<Order[]>(
                   `http://localhost:8080/order/${userId}`);

    return response.data;

}

export async function getOrderItems(
    orderId: number
): Promise<OrderItem[]> {

    const response = await axios.get<OrderItem[]>(
        `http://localhost:8080/order/orderitems/${orderId}`
    );

    return response.data;
}

