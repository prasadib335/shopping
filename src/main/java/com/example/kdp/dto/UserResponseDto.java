package com.example.kdp.dto;

import java.util.Date;

public class UserResponseDto {

    private int userId;
    private String name;
    private String email;
    private String role;
    private Date createdAt;
    private boolean active;

    public UserResponseDto() {

    }

    public UserResponseDto(
            int userId,
            String name,
            String email,
            String role,
            Date createdAt,
            boolean active) {

        this.userId = userId;
        this.name = name;
        this.email = email;
        this.role = role;
        this.createdAt = createdAt;
        this.active = active;
    }

    // Setters

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    // Getters

    public int getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public boolean isActive() {
        return active;
    }
}