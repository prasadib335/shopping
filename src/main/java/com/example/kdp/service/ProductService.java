package com.example.kdp.service;

import org.springframework.stereotype.Service;

import com.example.kdp.dto.ProductDto;
import com.example.kdp.dto.ProductRequestDto;
import com.example.kdp.dto.ProductResponseDto;
import com.example.kdp.entity.Product;
import com.example.kdp.exception.ProductNotFoundException;
import com.example.kdp.repository.ProductRepo;

import java.util.*;

@Service
public class ProductService {

        private ProductRepo productrepo;

        public ProductService(ProductRepo productrepo) {
              this.productrepo = productrepo;
        }

        private Product findProductOrThrow(int productId) {
              return productrepo.findById(productId)
                     .orElseThrow(() ->
                       new ProductNotFoundException(
                            "Product with id " + productId + " not found"
                       )
                    );
        }

        public List<ProductResponseDto> getProducts() {
             List<Product> products = productrepo.findAll();
             List<ProductResponseDto> productDtos = new ArrayList<>();

             for(Product product : products) {
                    ProductResponseDto dto = new ProductResponseDto(
                            product.getProductId(),
                            product.getProductName(),
                            product.getSellingPrice(),
                            product.getCompanyName()
                    );

                    productDtos.add(dto);
             }

            return productDtos;
        }

        public void addProduct(ProductRequestDto dto) {

            Product product = new Product();

            product.setProductName(dto.getProductName());
            product.setSellingPrice(dto.getSellingPrice());
            product.setOriginalPrice(dto.getOriginalPrice());
            product.setPostedDate(new Date());
            product.setCompanyName(dto.getCompanyName());

            try {
                productrepo.save(product);
                System.out.println("Saved");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        public ProductDto getProduct(int productId) {

                Product product = findProductOrThrow(productId);

                ProductDto productDto = new ProductDto();

                productDto.setProductId(product.getProductId());
                productDto.setProductName(product.getProductName());
                productDto.setSellingPrice(product.getSellingPrice());
                productDto.setOriginalPrice(product.getOriginalPrice());
                productDto.setCompanyName(product.getCompanyName());
                productDto.setPostedDate(product.getPostedDate());

                return productDto;
        }

        public String deleteProduct(int productId) {
              Product product = findProductOrThrow(productId);

              productrepo.delete(product);

              return "Product with id " + productId + " deleted successfully";
        }

        public String updateProduct(int productId, ProductRequestDto dto) {

             Product product = findProductOrThrow(productId);

             product.setProductName(dto.getProductName());
             product.setSellingPrice(dto.getSellingPrice());
             product.setOriginalPrice(dto.getOriginalPrice());
             product.setCompanyName(dto.getCompanyName());
             product.setPostedDate(new Date());

             productrepo.save(product);

             return "Product has been updated sucessfully";
        }

        public String patchProduct(int productId, ProductRequestDto dto) {

           Product product = findProductOrThrow(productId);

           if(dto.getProductName() != null) {
                product.setProductName(dto.getProductName());
           }

           if(dto.getOriginalPrice() > 0) {
                product.setOriginalPrice(dto.getOriginalPrice());
           }

           if(dto.getSellingPrice() > 0) {
                product.setSellingPrice(dto.getSellingPrice());
           }

           if(dto.getCompanyName() != null) {
                product.setCompanyName(dto.getCompanyName());
           }

           product.setPostedDate(new Date());

           productrepo.save(product);

           return "Product has been updated successfully";
        }
}