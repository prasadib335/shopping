import api from "./axios";
import type { CreateProduct, Product, Products ,UpdateProduct } from "../types/Product";
// getting all product 

export async function getProducts() : Promise<Products[]> {
      const response = await api.get<Products[]>(
          "/products"
      );

      return response.data;
}

// get single product

export async function getProductById(id : number) : Promise<Product> {
    const response = api.get<Product>(
        `/products/${id}`
    );

    return (await response).data;
}

export async function createProduct(
    productData: CreateProduct
): Promise<Product> {

    const response = await api.post<Product>(
        "/products",
        productData
    );

    return response.data;
}

export async function updateProduct( productId: number, productData: UpdateProduct ): Promise<Product> {
    const response = await api.put<Product>( `/products/${productId}`, productData ); 

     return response.data;
}