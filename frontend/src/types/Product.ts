
// "productId": 1,
//     "productName": "Oppo Find X8",
//     "companyName": "Oppo",
//     "sellingPrice": 61999
export interface Products {

        productId : number;
        productName : string;
        companyName : string;
        sellingPrice : number;
}

export interface Product {
      
      productId : number;
      productName : string;
      companyName : string;
      sellingPrice : number;
      originalPrice : number;
      postedDate : string;
}

export interface ProductState {

       products : Products[];
       singleProduct : Product | null;
       loading : boolean;
       error : string  | null;

}