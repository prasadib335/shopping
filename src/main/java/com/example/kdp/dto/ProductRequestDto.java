package com.example.kdp.dto;

public class ProductRequestDto {

        private String productName;
        private double sellingPrice;
        private double originalPrice;
        private String companyName;

        public ProductRequestDto() {

        }

        public String getProductName() {
            return productName;
        }
 
        public void setProductName(String productName) {
            this.productName = productName;
        }

        public double getSellingPrice() {
            return sellingPrice;
        }

        public void setSellingPrice(double sellingPrice) {
            this.sellingPrice = sellingPrice;
        }

        public double getOriginalPrice() {
             return originalPrice;
        }

        public void setOriginalPrice(double originalPrice) {
             this.originalPrice = originalPrice;
        }

        public String getCompanyName() {
             return companyName;
        }
         
        public void setCompanyName(String companyName) {
             this.companyName = companyName;
        }

}
