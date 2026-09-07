import type { CartItem } from "./CartItem";

export interface Cart {
      cartId : number;
      userId : number;
      totalAmount : number;
      items : CartItem[];
}

export interface CartState {
     cart : Cart;
     loading : boolean;
     error: string | null;
}

