package com.example.kdp.dto;

import java.util.List;

public class CartDto {

    private int cartId;
    private int userId;
    private double totalAmount;
    private List<CartItemDto> items;

    public CartDto() {
    }

    public CartDto(int cartId, int userId,
                   double totalAmount,
                   List<CartItemDto> items) {
        this.cartId = cartId;
        this.userId = userId;
        this.totalAmount = totalAmount;
        this.items = items;
    }

    public int getCartId() {
        return cartId;
    }

    public void setCartId(int cartId) {
        this.cartId = cartId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public List<CartItemDto> getItems() {
        return items;
    }

    public void setItems(List<CartItemDto> items) {
        this.items = items;
    }
}