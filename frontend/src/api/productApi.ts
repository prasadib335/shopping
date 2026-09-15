import axios from "axios";
import type { CreateProduct, Product, Products ,UpdateProduct } from "../types/Product";
// getting all product 

export async function getProducts() : Promise<Products[]> {
      const response = await axios.get<Products[]>(
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

export async function createProduct(
    productData: CreateProduct
): Promise<Product> {

    const response = await axios.post<Product>(
        "http://localhost:8080/products",
        productData
    );

    return response.data;
}

export async function updateProduct( productId: number, productData: UpdateProduct ): Promise<Product> {
     const response = await axios.put<Product>( `http://localhost:8080/products/${productId}`, productData ); 

     return response.data;
}