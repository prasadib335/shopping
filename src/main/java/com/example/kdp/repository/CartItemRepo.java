package com.example.kdp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.kdp.entity.*;
import java.util.List;
@Repository
public interface CartItemRepo extends JpaRepository<CartItem,Integer> {
         CartItem findByCartAndProduct(
               Cart cart,
               Product product
         );

        List<CartItem> findByCart(Cart cart);

        // make sure to keep the products same in cart page when its quantity is updated
        List<CartItem> findByCartOrderByCartItemIdAsc(Cart cart);

        

         void deleteByCart(Cart cart);

         
}