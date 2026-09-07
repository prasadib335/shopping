import { useEffect, useState } from "react";
import { useParams } from "react-router";
import NavBar from "../components/NavBar";
import "../styles/orderDetails.css";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { fetchOrderItems } from "../thunks/orderThunk";

function OrderDetailsPage() {

    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const {orderItems,loading} = useSelector(
            (state : RootState) => state.orders
    );

    useEffect(() => {
          if(!id) return;
          dispatch(fetchOrderItems(Number(id)));
    },[dispatch,id])

    if (loading) {
        return (
            <>
                <NavBar />

                <div className="order-details-loading">
                    Loading order details...
                </div>
            </>
        );
    }


   const totalAmount = orderItems
    ? orderItems.reduce(
        (total, item) => total + item.price,
        0
      )
    : 0;


    return (
        orderItems &&
        <div className="order-details-page">

            <NavBar />

            <main className="order-details-container">

                <div className="order-details-header">

                    <div>
                        <p className="order-details-label">
                            Order Details
                        </p>

                        <h1>
                            Order #{id}
                        </h1>
                    </div>

                    <span className="order-details-status">
                        ✓ Ordered
                    </span>

                </div>


                <section className="order-items-section">

                    <h2>Items in this order</h2>

                    <div className="order-items">

                        {orderItems.map((item) => (

                            <div
                                className="order-item"
                                key={item.orderItemId}
                            >

                                <div className="order-item-icon">
                                    📦
                                </div>

                                <div className="order-item-info">

                                    <h3>
                                        {item.productName}
                                    </h3>

                                    <p>
                                        Product ID: {item.productId}
                                    </p>

                                    <p>
                                        Quantity: {item.quantity}
                                    </p>

                                </div>

                                <div className="order-item-price">

                                    <span>
                                        Price
                                    </span>

                                    <strong>
                                        ₹{item.price.toLocaleString("en-IN")}
                                    </strong>

                                </div>

                            </div>

                        ))}

                    </div>

                </section>


                <section className="order-summary">

                    <h2>Order Summary</h2>

                    <div className="summary-row">
                        <span>
                            Items
                        </span>

                        <span>
                            {orderItems.length}
                        </span>
                    </div>

                    <div className="summary-row total-row">
                        <strong>
                            Total Amount
                        </strong>

                        <strong>
                            ₹{totalAmount.toLocaleString("en-IN")}
                        </strong>
                    </div>

                </section>

            </main>

        </div>
    );
}

export default OrderDetailsPage;