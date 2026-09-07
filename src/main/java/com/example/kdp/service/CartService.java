package com.example.kdp.service;

import java.util.ArrayList;
import java.util.Date;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.kdp.repository.CartItemRepo;
import com.example.kdp.repository.CartRepo;
import com.example.kdp.repository.ProductRepo;
import com.example.kdp.repository.UserRepo;
import com.example.kdp.dto.CartDto;
import com.example.kdp.dto.CartItemDto;
import com.example.kdp.entity.Cart;
import com.example.kdp.entity.CartItem;
import com.example.kdp.entity.Product;
import com.example.kdp.entity.User;
import com.example.kdp.exception.CartItemNotFoundException;
import com.example.kdp.exception.CartNotFoundException;
import com.example.kdp.exception.ProductNotFoundException;
import com.example.kdp.exception.UserNotFoundException;

import java.util.List;

@Service
public class CartService {
       
         private CartRepo cartRepo;
         private ProductRepo productRepo;
         private CartItemRepo cartItemRepo;
         private UserRepo userRepo;


         public CartService(
              CartRepo cartRepo,
              ProductRepo productRepo,
              CartItemRepo cartItemRepo,
              UserRepo userRepo
         ) {
              this.cartRepo = cartRepo;
              this.productRepo = productRepo;
              this.cartItemRepo = cartItemRepo;
              this.userRepo = userRepo;
         }

         // creating a cart for only new user

         public void createCart(User user) {
                boolean isExisted = cartRepo.existsByUser(user);
                if(isExisted) return;
                Cart cart = new Cart();
                cart.setCreatedAt(new Date());
                cart.setUser(user);

                cartRepo.save(cart);
         }

         public String addToCart(
            int userId,
            int productId,
            int quantity
        ) {
            
             Cart cart = 
                     cartRepo.findByUserUserId(userId)
                     .orElseThrow(()->
                       new CartNotFoundException("Cart Not Found")
                    );
             Product product = 
                     productRepo.findById(productId)
                     .orElseThrow(()->
                          new ProductNotFoundException("Product with id " + productId + " not found")
                      );
             
             CartItem existedCartItem = 
                       cartItemRepo.findByCartAndProduct(cart, product);
            if(existedCartItem != null) {
                    int newQuantity = 
                    existedCartItem.getQuantity()+quantity;
                    existedCartItem.setQuantity(newQuantity);
                    existedCartItem.setPrice(newQuantity*product.getSellingPrice());
                    cartItemRepo.save(existedCartItem);
            }else {
                    CartItem cartItem = new CartItem();
                    cartItem.setQuantity(quantity);
                    cartItem.setProduct(product);
                    cartItem.setPrice(product.getSellingPrice() * quantity);
                    cartItem.setCart(cart);
                    cartItemRepo.save(cartItem);
            }
             return "Product added successfully";
         }

         public String removeFromCart(int userId, int productId) {
               
                User user = 
                      userRepo.findById(userId)
                      .orElseThrow(()->
                         new UserNotFoundException("User with "+userId+" Not Found")
                       );
                 
                 Cart cart = 
                     cartRepo.findByUserUserId(userId)
                     .orElseThrow(()->
                       new CartNotFoundException("Cart Not Found")
                    );

                Product product = 
                     productRepo.findById(productId)
                     .orElseThrow(()->
                          new ProductNotFoundException("Product with id " + productId + " not found")
                    );

                CartItem cartItem = cartItemRepo.findByCartAndProduct(cart, product);

                if(cartItem == null) {
                    return "Product is not in the cart";
                }
                cartItemRepo.delete(cartItem);
                
                return "Product removed successfully";
         }

         public CartDto viewCartItems(int userId) {
                  Cart cart = 
                       cartRepo.findByUserUserId(userId)
                       .orElseThrow(()->
                        new CartNotFoundException("User's Cart Not Found")
                    );  

                  List<CartItem> cartItems = cartItemRepo.findByCartOrderByCartItemIdAsc(cart);

                  CartDto dto = new CartDto();
                  
                  List<CartItemDto> items = new ArrayList<>();

                  for(CartItem cartItem : cartItems) {

                          CartItemDto item = new CartItemDto();
                          item.setCartItemId(cartItem.getCartItemId());
                          item.setProductId(cartItem.getProduct().getProductId());
                          item.setProductName(cartItem.getProduct().getProductName());
                          item.setPrice(cartItem.getProduct().getSellingPrice());
                          item.setQuantity(cartItem.getQuantity());
                          item.setSubTotal(cartItem.getPrice());

                          items.add(item);
                  }

                  dto.setCartId(cart.getCartId());
                  dto.setUserId(userId);
                  dto.setTotalAmount(getCartTotal(userId));
                  dto.setItems(items);

                  return dto;
         }

         public double getCartTotal(int userId) {

                User user = 
                       userRepo.findById(userId)
                       .orElseThrow(()->
                            new UserNotFoundException("User with "+userId+" Not Found")
                        );
                       
                Cart cart = 
                       cartRepo.findByUserUserId(userId)
                       .orElseThrow(()->
                           new CartNotFoundException("Cart Not Found")
                       );
                
                double amount = 0;
                
                List<CartItem> cartItems = cartItemRepo.findByCart(cart);

                for(CartItem cartItem : cartItems) amount += cartItem.getPrice();

                return amount;
         }

         public String increaseQuantity(
             int userId,
             int productId
         ) {

                 Cart cart = 
                     cartRepo.findByUserUserId(userId)
                     .orElseThrow(()->
                       new CartNotFoundException("Cart Not Found")
                    );
             

              Product product = 
                     productRepo.findById(productId)
                     .orElseThrow(()->
                          new ProductNotFoundException("Product with id " + productId + " not found")
                    );
            
           
              CartItem existedCartItem = 
                       cartItemRepo.findByCartAndProduct(cart, product);

              if(existedCartItem == null) {
                    throw new CartItemNotFoundException("Product not found in cart");
              }
              
            int newQuantity = 
            existedCartItem.getQuantity()+1;
            
            existedCartItem.setQuantity(newQuantity);
            existedCartItem.setPrice(newQuantity*product.getSellingPrice());
            cartItemRepo.save(existedCartItem);

              return "Quantity increased successfully";
            }

         public String decreaseQuantity(
             int userId,
             int productId
         ) {
              Product product = 
                     productRepo.findById(productId)
                     .orElseThrow(()->
                          new ProductNotFoundException("Product with id " + productId + " not found")
                    );
            
              Cart cart = 
                     cartRepo.findByUserUserId(userId)
                     .orElseThrow(()->
                       new CartNotFoundException("Cart Not Found")
                    );
             

              CartItem existedCartItem = 
                       cartItemRepo.findByCartAndProduct(cart, product);
              
              
               if(existedCartItem == null) {
                    throw new CartItemNotFoundException("Product not found in cart");
               }
                  int newQuantity = existedCartItem.getQuantity()-1;
                
                  if(newQuantity <= 0) {
                       cartItemRepo.delete(existedCartItem);
                  }else {
                      existedCartItem.setQuantity(newQuantity);
                      existedCartItem.setPrice(newQuantity*product.getSellingPrice());
                      cartItemRepo.save(existedCartItem);
                  }

              return "Quantity decreased successfully";
            }

            @Transactional
            public void clearCart(int userId) {
                    Cart cart = 
                         cartRepo.findByUserUserId(userId)
                         .orElseThrow(()->
                            new CartNotFoundException("Cart Not Found")
                         );
                    
                    cartItemRepo.deleteByCart(cart);
            }
}
