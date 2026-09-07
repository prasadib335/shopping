import type { OrderItem } from "./OrderItem";

export interface Order {

        orderId: number;
        userId: number;
        orderDate: string;
        status: string;
        totalAmount: number;
        
}

// const initialState : ProductState = {
//        products : [],
//        singleProduct : null,
//        loading : false,
//        error : null
// };

export interface OrderState {

         orders : Order[] | null;
         orderItems : OrderItem[] | null;
         loading : boolean;
         error : string | null;
}