package com.example.kdp.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.kdp.service.OrderService;
import com.example.kdp.dto.OrderDto;
import com.example.kdp.dto.OrderItemDto;
import com.example.kdp.entity.*;
import java.util.*;

@RestController
@RequestMapping("/order")
public class OrderController {

    private OrderService orderService;

    public OrderController(OrderService orderService) {
            this.orderService = orderService;
    }

    @PostMapping("/placeorder/{userId}")
    public String placeOrder(@PathVariable int userId) {
           return orderService.placeOrder(userId);
    }

    @GetMapping("/{userId}")
    public List<OrderDto> getOrderByUser(@PathVariable int userId) {
           return orderService.getOrderByUser(userId);
    }

    @GetMapping("/orderitems/{orderId}") 
    public List<OrderItemDto> getOrderItemsByOrder(@PathVariable int orderId) {
           return orderService.getOrderItemsByOrder(orderId);
    }
}
