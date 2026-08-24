package com.example.kdp.exception;

public class OrderNotFoundException extends RuntimeException {
     
         public OrderNotFoundException(String msg) {
               super(msg);
         }
}
