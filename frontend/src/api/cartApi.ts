import axios from "axios";
import type { Cart } from "../types/Cart";

// get cart items

export async function getCartItems(userId : number) : Promise<Cart> {

        const response =  axios.get<Cart>(
              `http://localhost:8080/cart/${userId}`
        )

        return (await response).data;
        
}

// add to cart

export async function addToCart(
          userId : number,
          productId : number,
          quantity : number
) : Promise<string> {
       const response = await axios.post<string>(
          `http://localhost:8080/cart/${userId}/add/${productId}/${quantity}`,
           {
                
           }
       );

       return response.data;
}

export async function increaseQuantity(
        userId : number,
        productId : number
) : Promise<string> {
        const response = await axios.put<string>(
                `http://localhost:8080/cart/${userId}/increase/${productId}`
        );
        
        return response.data;
}

// handle decrese

export async function decreaseQuantity(
        userId : number,
        productId : number
) : Promise<string> {
        const response = await axios.put<string>(
                `http://localhost:8080/cart/${userId}/decrease/${productId}`
        );

        return response.data;

}

// remove from cart 

export async function removeFromCart(
        userId : number,
        productId : number
) :Promise<string> {
        const response = await axios.delete(
                `http://localhost:8080/cart/${userId}/remove/${productId}`
        );

        return response.data;
}
// clear cart 

export async function clearCart(
        userId : number
) : Promise<string> {
         const response = await axios.delete<string>(
              `http://localhost:8080/cart/${userId}/clear`
         );

         return response.data;
}

// placing orders

export async function placeOrder(userId : number) : Promise<string> {
       const response =  await axios.post<string>(
               `http://localhost:8080/order/placeorder/${userId}`
       );

       return response.data;
}