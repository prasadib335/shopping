package com.example.kdp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    
@ExceptionHandler(ProductNotFoundException.class)
public ResponseEntity<String> handleProductNotFound(ProductNotFoundException ex) {
    return new ResponseEntity<>(
        ex.getMessage(),
        HttpStatus.NOT_FOUND
    );
}

@ExceptionHandler(UserNotFoundException.class)
public ResponseEntity<String> handleUserNotFound(UserNotFoundException ex) {
    return new ResponseEntity<>(
        ex.getMessage(),
        HttpStatus.NOT_FOUND
    );
}


@ExceptionHandler(EmailAlreadyExistsException.class)
public ResponseEntity<String> handleEmailAlreadyExists(EmailAlreadyExistsException ex) {
    return new ResponseEntity<>(
        ex.getMessage(),
        HttpStatus.BAD_REQUEST
    );
}

@ExceptionHandler(CartNotFoundException.class)
public ResponseEntity<String> handleCartNotFound(CartNotFoundException ex) {
      return new ResponseEntity<>(
          ex.getMessage(),
          HttpStatus.NOT_FOUND
      );
}

@ExceptionHandler(EmptyCartException.class)
public ResponseEntity<String> handleEmptyCart(EmptyCartException ex) {
       return new ResponseEntity<>(
           ex.getMessage(),
           HttpStatus.NOT_FOUND
       );
}

@ExceptionHandler(OrderNotFoundException.class)
public ResponseEntity<String> handleOrderNotFound(OrderNotFoundException ex) {
       return new ResponseEntity<>(
           ex.getMessage(),
           HttpStatus.NOT_FOUND
       );
}

@ExceptionHandler(CartItemNotFoundException.class)
public ResponseEntity<String> handleCartItemNotFound(CartItemNotFoundException ex) {
      return new ResponseEntity<>(
           ex.getMessage(),
           HttpStatus.NOT_FOUND
      );
}

}
