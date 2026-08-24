package com.example.kdp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.kdp.entity.Order;
import com.example.kdp.entity.User;
import java.util.*;

@Repository
public interface OrderRepo extends JpaRepository<Order,Integer> {
          
        @Query("SELECT o from Order o WHERE o.user.userId = :userId")
        List<Order> getOrdersByUser(@Param("userId") int userId);

        @Query("SELECT o.user from Order o WHERE o.orderId = :orderId")
        Optional<User> getUserByOrderId(@Param("orderId") int orderId);


}