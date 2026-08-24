package com.example.kdp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.kdp.entity.User;
import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<User,Integer> {
  
      List<User> findByActiveTrue();

      List<User> findByActiveFalse();

      boolean existsByEmail(String email);
      
      User findByEmail(String email);

}