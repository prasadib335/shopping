package com.example.kdp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.kdp.entity.OrderItem;
import java.util.*;

@Repository
public interface OrderItemRepo extends JpaRepository<OrderItem,Integer> {
            
            @Query("""
                SELECT oi
                FROM OrderItem oi
                WHERE oi.order.orderId = :orderId
            """)
            List<OrderItem> getOrderItemsByOrder(@Param("orderId") int orderId);

    }