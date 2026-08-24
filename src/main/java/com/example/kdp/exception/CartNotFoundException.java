package com.example.kdp.exception;

public class CartNotFoundException extends RuntimeException {
        public CartNotFoundException(String msg) {
               super(msg);
        }
}
