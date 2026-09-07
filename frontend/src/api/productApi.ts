import axios from "axios";
import type { Product } from "../types/Product";

// getting all product 

export async function getProducts() : Promise<Product[]> {
      const response = await axios.get<Product[]>(
          "http://localhost:8080/products"
      );

      return response.data;
}

// get single product

export async function getProductById(id : number) : Promise<Product> {
    const response = axios.get<Product>(
        `http://localhost:8080/products/${id}`
    );

    return (await response).data;
}

