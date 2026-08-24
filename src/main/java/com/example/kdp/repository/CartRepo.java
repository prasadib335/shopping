package com.example.kdp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.kdp.entity.Cart;
import com.example.kdp.entity.User;

@Repository
public interface CartRepo extends JpaRepository<Cart,Integer> {
     boolean existsByUser(User user);
     Optional<Cart> findByUserUserId(int userId);
}
