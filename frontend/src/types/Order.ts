import type { OrderItem } from "./OrderItem";

export interface Order {

    orderId: number;
    userId: number;
    orderDate: string;
    status: string;
    totalAmount: number;

}

export interface OrderState {

    orders: Order[];

    orderItems: OrderItem[];

    loading: boolean;

    error: string | null;

}

