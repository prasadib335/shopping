import api from "./axios";
import type { Cart } from "../types/Cart";

// get cart items

export async function getCartItems(userId : number) : Promise<Cart> {

          const response = await api.get<Cart>(
                  `/cart/${userId}`
          );

          return response.data;
        
}

// add to cart

export async function addToCart(
          userId : number,
          productId : number,
          quantity : number
) : Promise<string> {
                 const response = await api.post<string>(
                         `/cart/${userId}/add/${productId}/${quantity}`
       );

       return response.data;
}

export async function increaseQuantity(
        userId : number,
        productId : number
) : Promise<string> {
        const response = await api.put<string>(
                `/cart/${userId}/increase/${productId}`
        );
        
        return response.data;
}

// handle decrese

export async function decreaseQuantity(
        userId : number,
        productId : number
) : Promise<string> {
        const response = await api.put<string>(
                `/cart/${userId}/decrease/${productId}`
        );

        return response.data;

}

// remove from cart 

export async function removeFromCart(
        userId : number,
        productId : number
) :Promise<string> {
        const response = await api.delete<string>(
                `/cart/${userId}/remove/${productId}`
        );

        return response.data;
}
// clear cart 

export async function clearCart(
        userId : number
) : Promise<string> {
            const response = await api.delete<string>(
                    `/cart/${userId}/clear`
         );

         return response.data;
}

// placing orders

export async function placeOrder(userId : number) : Promise<string> {
       const response =  await api.post<string>(
               `/order/placeorder/${userId}`
       );

       return response.data;
}