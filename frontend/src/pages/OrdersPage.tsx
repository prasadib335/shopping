import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { Order } from "../types/Order";
import {getOrders}  from "../api/orderApi";
import NavBar from "../components/NavBar";
import "../styles/orders.css";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { fetchOrders } from "../thunks/orderThunk";

function OrdersPage() {
    
    const dispatch = useDispatch<AppDispatch>();

    const navigate = useNavigate();

    const {orders,loading} = useSelector((state : RootState) => {
            return state.orders;
    });

    useEffect(() => {
            dispatch(fetchOrders(1));
    },[dispatch]);
    
    if (loading) {
        return <h2 className="orders-loading">Loading orders...</h2>;
    }

    return (
        orders &&
        <div className="orders-page">

            <NavBar />

            <div className="orders-container">

                <h1 className="orders-title">
                    My Orders
                </h1>

                {orders.length === 0 ? (

                    <div className="no-orders">
                        <h2>No orders yet</h2>
                        <p>
                            Your orders will appear here once you
                            purchase something.
                        </p>

                        <button
                            onClick={() => navigate("/")}
                        >
                            Start Shopping
                        </button>
                    </div>

                ) : (

                    <div className="orders-list">

                        {orders.map((order) => (

                            <div
                                className="order-card"
                                key={order.orderId}
                                onClick={() =>
                                    navigate(`/orders/${order.orderId}`)
                                }
                            >

                                <div className="order-card-header">

                                    <div>
                                        <h2>
                                            Order #{order.orderId}
                                        </h2>

                                        <p className="order-date">
                                            {new Date(
                                                order.orderDate
                                            ).toLocaleDateString("en-IN", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>

                                    <span className="order-status">
                                        {order.status}
                                    </span>

                                </div>


                                <div className="order-card-footer">

                                    <div>
                                        <span>Total Amount</span>

                                        <strong>
                                            ₹{order.totalAmount.toLocaleString(
                                                "en-IN"
                                            )}
                                        </strong>
                                    </div>

                                    <button
                                        onClick={(event) => {
                                            event.stopPropagation();

                                            navigate(
                                                `/orders/${order.orderId}`
                                            );
                                        }}
                                    >
                                        View Details →
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default OrdersPage;