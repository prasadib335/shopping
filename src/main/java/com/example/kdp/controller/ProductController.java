package com.example.kdp.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import com.example.kdp.dto.ProductResponseDto;
import com.example.kdp.dto.ProductDto;
import com.example.kdp.dto.ProductRequestDto;
import com.example.kdp.service.ProductService;

@RestController
@RequestMapping("/products")
public class ProductController {

         private final ProductService productService;

         public ProductController(ProductService productService) {
            this.productService = productService;
         }  

         @GetMapping
         public List<ProductResponseDto> getProducts() {
               return productService.getProducts();
         }

         @GetMapping("/{id}")
         public ProductDto getProduct(@PathVariable int id) {
               return productService.getProduct(id);
         }
         @PostMapping
         public String addProduct(@RequestBody ProductRequestDto dto) {

            System.out.println("Controller Hit");

            productService.addProduct(dto);

            return "Product added successfully";
         }

         @DeleteMapping("/{id}")
         public String deleteProduct(@PathVariable int id) {
             return productService.deleteProduct(id);
         }

         @PutMapping("/{id}")
         public String updateProduct(@PathVariable int id, @RequestBody ProductRequestDto dto)  {
             return productService.updateProduct(id, dto);
         }

         @PatchMapping("/{id}")
         public String patchProduct(@PathVariable int id, @RequestBody ProductRequestDto dto) {
            return productService.patchProduct(id,dto);
         }
   }



