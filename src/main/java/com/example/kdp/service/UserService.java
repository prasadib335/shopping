package com.example.kdp.service;

import org.springframework.stereotype.Service;

import com.example.kdp.repository.UserRepo;
import com.example.kdp.dto.UserRequestDto;
import com.example.kdp.entity.User;
import com.example.kdp.exception.EmailAlreadyExistsException;
import com.example.kdp.exception.UserNotFoundException;

import java.util.Date;
import java.util.List;

@Service
public class UserService {

       private UserRepo userRepo;
       private CartService cartService;

       public UserService(UserRepo userRepo,CartService cartService) {
           this.userRepo = userRepo;
           this.cartService = cartService;
       }

       private User userNotFound(int userId) {

                 return userRepo.findById(userId)
                   .orElseThrow(() ->
                     new UserNotFoundException(
                        "User With " + userId + " Not Found"
                     )
                );

       }

       public String createUser(UserRequestDto dto) {
            boolean isExisted = userRepo.existsByEmail(dto.getEmail());

            if(isExisted) {
                throw new EmailAlreadyExistsException("Email already exists");
            }

            User user = new User();
            user.setName(dto.getName());
            user.setActive(true);
            user.setEmail(dto.getEmail());
            user.setPassword(dto.getPassword());
            user.setRole(dto.getRole());
            user.setCreatedAt(new Date());

            userRepo.save(user);

            cartService.createCart(user);

            return "User add successfully";
       }

       public String upDateUser(int userId, UserRequestDto dto) {

                  User user = userNotFound(userId);

                  User existingUser = userRepo.findByEmail(dto.getEmail());

                  if(existingUser != null && existingUser.getUserId() != userId) {
                      throw new EmailAlreadyExistsException("Email already exists");
                  }

                  user.setName(dto.getName());
                  user.setEmail(dto.getEmail());
                  user.setPassword(dto.getPassword());
                  user.setRole(dto.getRole());

                  userRepo.save(user);

                  return "Details updated successfully";
       }

       // Customer deletes their own account
       public String deleteUser(int userId) {
            User user = userNotFound(userId);
            user.setActive(false);

            userRepo.save(user);

            return "User deleted successfully";
       }

       // Admin deactivates user
       public String deactivatingUser(int userId) {
              User user = userNotFound(userId);
              user.setActive(false);

              userRepo.save(user);

              return "User deactivated successfully";
       }

       // Admin activates user
       public String activatingUser(int userId) {
              User user = userNotFound(userId);
              user.setActive(true);

              userRepo.save(user);

              return "User activated successfully";
       }

       // Getting all users including active and inactive
       public List<User> getUsers() {
            return userRepo.findAll();
       }

       // Getting only one user
       public User getUser(int userId) {
          return userNotFound(userId);
       }

       public List<User> getActiveUsers() {
          return userRepo.findByActiveTrue();
       }

       public List<User> getInactiveUsers() {
          return userRepo.findByActiveFalse();
       }
}