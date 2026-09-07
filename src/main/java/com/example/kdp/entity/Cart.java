package com.example.kdp.entity;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;

import jakarta.persistence.OneToOne;

@Entity
public class Cart {
     
      @Id
      @GeneratedValue(strategy = GenerationType.IDENTITY)
      private int cartId;
      private Date createdAt;
 
      @OneToOne
      @JoinColumn(name = "userId")
      private User user;

      public Cart() {

      }

      public Cart(
        int cartId,
        Date createdAt,
        User user
      ) {
        this.cartId = cartId;
        this.createdAt = createdAt;
        this.user = user;
      }

      public int getCartId() {
         return cartId;
      }

      public Date getCreatedAt() {
         return createdAt;
      }

      public User getUser() {
          return user;
      }

      public void setCartId(int cartId) {
          this.cartId = cartId;
      }

      public void setCreatedAt(Date createdAt) {
          this.createdAt = createdAt;
      }

      public void setUser(User user) {
          this.user = user;
      }
}
