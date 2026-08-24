package com.example.kdp.entity;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderId;

    private Date orderDate;
    private double totalAmount;
    private String status;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    // for stopping recursion

    // @OneToMany(mappedBy = "order")
    // private List<OrderItem> orderItems;

    public Order() {
    }

    public Order(
            Date orderDate,
            double totalAmount,
            String status,
            User user) {

        this.orderDate = orderDate;
        this.totalAmount = totalAmount;
        this.status = status;
        this.user = user;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    // public List<OrderItem> getOrderItems() {
    //     return orderItems;
    // }

    // public void setOrderItems(List<OrderItem> orderItems) {
    //     this.orderItems = orderItems;
    // }
}