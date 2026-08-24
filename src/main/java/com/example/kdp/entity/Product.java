package com.example.kdp.entity;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productId;
    private String productName;
    private double sellingPrice;
    private double originalPrice;
    private Date postedDate;
    private String companyName;


    public Product() {
    }

    public Product(
        String productName,
        double sellingPrice,
        double originalPrice,
        Date postedDate,
        String companyName) {

        this.productName = productName;
        this.sellingPrice = sellingPrice;
        this.originalPrice = originalPrice;
        this.postedDate = postedDate;
        this.companyName = companyName;
    }
    // Setters

    public void setProductId(int productId) {
        this.productId = productId;
    }
    public void setProductName(String productName) {
        this.productName = productName;
    }

    public void setSellingPrice(double sellingPrice) {
        this.sellingPrice = sellingPrice;
    }

    public void setOriginalPrice(double originalPrice) {
        this.originalPrice = originalPrice;
    }

    public void setPostedDate(Date postedDate) {
        this.postedDate = postedDate;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    // Getters

    public int getProductId() {
        return productId;
    }

    public String getProductName() {
        return productName;
    }

    public double getSellingPrice() {
        return sellingPrice;
    }

    public double getOriginalPrice() {
        return originalPrice;
    }

    public Date getPostedDate() {
        return postedDate;
    }

    public String getCompanyName() {
        return companyName;
    }
}