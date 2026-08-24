package com.example.kdp.dto;

import java.util.Date;

public class OrderDto {

    private int orderId;
    private int userId;
    private double totalAmount;
    private String status;
    private Date orderDate;

    public OrderDto() {
    }

    public OrderDto(int orderId, int userId, double totalAmount,
                    String status, Date orderDate) {
        this.orderId = orderId;
        this.userId = userId;
        this.totalAmount = totalAmount;
        this.status = status;
        this.orderDate = orderDate;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }
}