package com.example.kdp.service;

import com.example.kdp.exception.CartNotFoundException;
import com.example.kdp.exception.EmptyCartException;
import com.example.kdp.exception.OrderNotFoundException;
import com.example.kdp.exception.UserNotFoundException;
import com.example.kdp.repository.CartItemRepo;
import com.example.kdp.repository.CartRepo;
import com.example.kdp.repository.OrderItemRepo;
import com.example.kdp.repository.OrderRepo;
import com.example.kdp.repository.UserRepo;

import java.util.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.kdp.dto.OrderDto;
import com.example.kdp.dto.OrderItemDto;
import com.example.kdp.entity.*;

@Service
public class OrderService {
       
         private CartRepo cartRepo;
         private CartItemRepo cartItemRepo;
         private UserRepo userRepo;
         private OrderRepo orderRepo;
         private OrderItemRepo orderItemRepo;
         public OrderService(
              CartRepo cartRepo,
              CartItemRepo cartItemRepo,
              UserRepo userRepo,
              OrderRepo orderRepo,
              OrderItemRepo orderItemRepo
         ) {
              this.cartRepo = cartRepo;
              this.cartItemRepo = cartItemRepo;
              this.userRepo = userRepo;
              this.orderRepo = orderRepo;
              this.orderItemRepo = orderItemRepo;
         }
          
         @Transactional
         public String placeOrder(int userId) {
             
             User user =
                       userRepo.findById(userId)
                       .orElseThrow(()->
                           new UserNotFoundException("User with "+userId+" Not Found")
                        );
              
              Cart cart = 
                       cartRepo.findByUserUserId(userId)
                       .orElseThrow(()->
                           new CartNotFoundException("Cart Not Found")
                        );

              List<CartItem> cartItems = 
                         cartItemRepo.findByCart(cart);


              if(cartItems.size() == 0) {
                    throw new EmptyCartException("Cart is Empty");
              }
                           
              double totalAmount = 0;
                     for(CartItem cartItem : cartItems) {
                         totalAmount += cartItem.getPrice();
                     }
              Order order = new Order();
              order.setOrderDate(new Date());
              order.setStatus("Ordered");
              order.setTotalAmount(totalAmount);
              order.setUser(user);
              
              orderRepo.save(order);

              for(CartItem cartItem : cartItems) {
                     OrderItem orderItem = new OrderItem();
                     orderItem.setPrice(cartItem.getPrice());
                     orderItem.setQuantity(cartItem.getQuantity());
                     orderItem.setOrder(order);
                     orderItem.setProduct(cartItem.getProduct());
                    
                     orderItemRepo.save(orderItem);
              }
              
              cartItemRepo.deleteByCart(cart);

              return "Order placed Successfully";
         }
  
        // get only placed order per customer
         public List<OrderDto> getOrderByUser(int userId) {
             User user =
                    userRepo.findById(userId)
                    .orElseThrow(()->
                        new UserNotFoundException("User with "+userId+" Not Found")
                     );
             List<Order> orders = orderRepo.getOrdersByUser(userId);

             List<OrderDto> dto = new  ArrayList<>();
             for(Order order : orders) {
                      OrderDto orderDto = new OrderDto();
                      orderDto.setOrderId(order.getOrderId());
                      orderDto.setUserId(order.getUser().getUserId());
                      orderDto.setTotalAmount(order.getTotalAmount());
                      orderDto.setStatus(order.getStatus());
                      orderDto.setOrderDate(order.getOrderDate());

                      dto.add(orderDto);
             }

             return dto;
         }

         // get order items per order 
        public List<OrderItemDto> getOrderItemsByOrder(int orderId) {

                Order order = 
                  orderRepo.findById(orderId)
                  .orElseThrow(()->
                     new OrderNotFoundException("Order with "+orderId+" Not Found")
                   );

                List<OrderItem> items =
                        orderItemRepo.getOrderItemsByOrder(orderId);

                List<OrderItemDto> dtoList = new ArrayList<>();

                for (OrderItem item : items) {

                    OrderItemDto dto = new OrderItemDto();

                    dto.setOrderItemId(item.getOrderItemId());
                    dto.setProductId(item.getProduct().getProductId());
                    dto.setProductName(item.getProduct().getProductName());
                    dto.setQuantity(item.getQuantity());
                    dto.setPrice(item.getPrice());

                    dtoList.add(dto);
                }

                return dtoList;
            }

}
