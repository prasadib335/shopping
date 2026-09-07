package com.example.kdp.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.kdp.service.UserService;
import com.example.kdp.dto.LoginRequestDto;
import com.example.kdp.dto.UserRequestDto;
import com.example.kdp.entity.User;

@RestController
@RequestMapping("/user")
public class UserController {

    private UserService userService;

    
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Get all users
    @GetMapping
    public List<User> getUsers() {
        return userService.getUsers();
    }

    // Get only active users
    @GetMapping("/activeusers")
    public List<User> getActiveUsers() {
        return userService.getActiveUsers();
    }

    // Get only inactive users
    @GetMapping("/inactiveusers")
    public List<User> getInactiveUsers() {
        return userService.getInactiveUsers();
    }

    // Get one user
    @GetMapping("/{id}")
    public User getUser(@PathVariable int id) {
        return userService.getUser(id);
    }

    // Add user
    @PostMapping
    public String createUser(@RequestBody UserRequestDto dto) {
        dto.setRole("USER");
        return userService.createUser(dto);
    }

    // Update user
    @PutMapping("/{id}")
    public String updateUser(
            @PathVariable int id,
            @RequestBody UserRequestDto dto) {

        return userService.upDateUser(id, dto);
    }

    // Customer deletes their own account
    @PatchMapping("/{id}/delete")
    public String deleteUser(@PathVariable int id) {
        return userService.deleteUser(id);
    }

    // Admin deactivates user
    @PatchMapping("/{id}/deactivate")
    public String deactivateUser(@PathVariable int id) {
        return userService.deactivatingUser(id);
    }

    // Admin activates user
    @PatchMapping("/{id}/activate")
    public String activateUser(@PathVariable int id) {
        return userService.activatingUser(id);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequestDto dto) {
         return userService.login(dto.getEmail(), dto.getPassword());
    }
}

