package com.example.kdp.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cartItemId;
    private int quantity;
    private double price;

    @ManyToOne
    @JoinColumn(name = "cartId")
    private Cart cart;

    @ManyToOne
    @JoinColumn(name =  "productId")
    private Product product;

    public CartItem() {

    }

    public CartItem(
        int cartItemId,
        int quantity,
        double price
    ) {
       this.cartItemId = cartItemId;
       this.quantity = quantity;
       this.price = price;
    }
    
    public void setCartItemId(int cartItemId) {
         this.cartItemId = cartItemId;
    }

    public void setQuantity(int quantity) {
         this.quantity = quantity;
    }

    public void setPrice(double price) {
         this.price = price;
    }

    public void setCart(Cart cart) {
         this.cart = cart;
    }

    public void setProduct(Product product) {
          this.product = product;
    }

    public int getCartItemId() {
    return cartItemId;
    }

    public int getQuantity() {
        return quantity;
    }

    public double getPrice() {
        return price;
    }

    public Cart getCart() {
        return cart;
    }

    public Product getProduct() {
        return product;
    }
    
}
