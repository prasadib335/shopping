package com.example.kdp.dto;

public class ProductResponseDto {
  
      private final int productId;
      private final String productName;
      private final double sellingPrice;
      private final String companyName;
    
      public ProductResponseDto(
           int productId,
           String productName,
           double sellingprice,
           String companyName
      ) {

         this.productId = productId;
         this.productName = productName;
         this.sellingPrice = sellingprice;
         this.companyName = companyName;
      }

     
     public int getProductId() {
        return productId;
     }

     public String getProductName() {
        return productName;
     }

     public double getSellingPrice() {
        return sellingPrice;
     }

     public String getCompanyName() {
        return companyName;
     } 
}
