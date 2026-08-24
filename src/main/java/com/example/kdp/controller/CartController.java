package com.example.kdp.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.kdp.service.CartService;
import com.example.kdp.dto.CartDto;
import com.example.kdp.entity.CartItem;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/{userId}")
    public CartDto viewCartItems(
            @PathVariable int userId) {

        return cartService.viewCartItems(userId);
    }

    @PostMapping("/{userId}/add/{productId}/{quantity}")
    public String addToCart(
            @PathVariable int userId,
            @PathVariable int productId,
            @PathVariable int quantity) {

        return cartService.addToCart(
                userId,
                productId,
                quantity
        );
    }

    @DeleteMapping("/{userId}/remove/{productId}")
    public String removeFromCart(
            @PathVariable int userId,
            @PathVariable int productId) {

        return cartService.removeFromCart(
                userId,
                productId
        );
    }

    @GetMapping("/total/{userId}")
    public double getCartTotal(@PathVariable int userId) {
          return cartService.getCartTotal(userId);
    }
    @PutMapping("/{userId}/increase/{productId}")
    public String increaseQuantity(
            @PathVariable int userId,
            @PathVariable int productId) {

        return cartService.increaseQuantity(
                userId,
                productId
        );
    }

   @PutMapping("/{userId}/decrease/{productId}")
    public String decreaseQuantity(
            @PathVariable int userId,
            @PathVariable int productId) {

        return cartService.decreaseQuantity(
                userId,
                productId
        );
    }

    @DeleteMapping("/{userId}/clear")
    public void clearCart(
            @PathVariable int userId) {

        cartService.clearCart(userId);
    }
}