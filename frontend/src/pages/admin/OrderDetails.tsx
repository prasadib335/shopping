import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../../store";
import { fetchOrders } from "../../thunks/orderThunk";

import '../../styles/adminOrderDetails.css';

function OrderDetails() {

    const { orderId } = useParams<{ orderId: string }>();

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { orders, loading, error } = useSelector(
        (state: RootState) => state.orders
    );

    useEffect(() => {
        if (orders.length === 0) {
            dispatch(fetchOrders(1));
        }
    }, [dispatch, orders.length]);

    const order = orders.find(
        (item) => item.orderId === Number(orderId)
    );

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }).format(amount);
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    if (loading && !order) {
        return (
            <main className="order-details-page">
                <div className="order-details-message">
                    <div className="loading-spinner"></div>
                    <h2>Loading order...</h2>
                    <p>Please wait while we fetch the order details.</p>
                </div>
            </main>
        );
    }

    if (error && !order) {
        return (
            <main className="order-details-page">
                <div className="order-details-message error-message">
                    <div className="message-icon">!</div>
                    <h2>Unable to load order</h2>
                    <p>{error}</p>

                    <button
                        type="button"
                        className="back-btn"
                        onClick={() => navigate("/admin/orders")}
                    >
                        ← Back to Orders
                    </button>
                </div>
            </main>
        );
    }

    if (!order) {
        return (
            <main className="order-details-page">
                <div className="order-details-message">
                    <div className="message-icon">?</div>
                    <h2>Order not found</h2>
                    <p>
                        The order you are looking for does not exist.
                    </p>

                    <button
                        type="button"
                        className="back-btn"
                        onClick={() => navigate("/admin/orders")}
                    >
                        ← Back to Orders
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="order-details-page">

            {/* PAGE HEADER */}

            <div className="order-page-header">

                <div>
                    <button
                        type="button"
                        className="back-link"
                        onClick={() => navigate("/admin/orders")}
                    >
                        ← Back to Orders
                    </button>

                    <div className="order-title-row">

                        <div>
                            <h1>
                                Order #{order.orderId}
                            </h1>

                            <p>
                                Placed on {formatDate(order.orderDate)}
                            </p>
                        </div>

                        <span
                            className={`large-status ${order.status.toLowerCase()}`}
                        >
                            {order.status}
                        </span>

                    </div>
                </div>

            </div>


            {/* ORDER SUMMARY */}

            <section className="order-summary-grid">

                <div className="summary-card">

                    <div className="summary-icon blue">
                        🛍️
                    </div>

                    <div>
                        <span>Total Amount</span>
                        <strong>
                            {formatCurrency(order.totalAmount)}
                        </strong>
                    </div>

                </div>


                <div className="summary-card">

                    <div className="summary-icon purple">
                        👤
                    </div>

                    <div>
                        <span>Customer</span>
                        <strong>
                            User #{order.userId}
                        </strong>
                    </div>

                </div>


                <div className="summary-card">

                    <div className="summary-icon green">
                        📅
                    </div>

                    <div>
                        <span>Order Date</span>
                        <strong>
                            {formatDate(order.orderDate)}
                        </strong>
                    </div>

                </div>

            </section>


            {/* MAIN CONTENT */}

            <section className="order-details-grid">

                {/* LEFT SIDE */}

                <div className="order-main-column">

                    {/* ORDER ITEMS */}

                    <div className="order-card">

                        <div className="card-header">

                            <div>
                                <h2>Order Items</h2>
                                <p>
                                    Products included in this order
                                </p>
                            </div>

                            <span className="item-count">
                                Order #{order.orderId}
                            </span>

                        </div>


                        <div className="order-item">

                            <div className="product-placeholder">
                                📦
                            </div>

                            <div className="product-info">

                                <h3>
                                    Order Products
                                </h3>

                                <p>
                                    Product details will appear here
                                    once order items are available.
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* CUSTOMER INFORMATION */}

                    <div className="order-card">

                        <div className="card-header">

                            <div>
                                <h2>Customer Information</h2>
                                <p>
                                    Customer associated with this order
                                </p>
                            </div>

                        </div>

                        <div className="customer-info">

                            <div className="customer-avatar">
                                U
                            </div>

                            <div>
                                <h3>
                                    User #{order.userId}
                                </h3>

                                <p>
                                    Customer ID: {order.userId}
                                </p>
                            </div>

                        </div>

                    </div>

                </div>


                {/* RIGHT SIDE */}

                <div className="order-side-column">

                    {/* ORDER STATUS */}

                    <div className="order-card status-card">

                        <div className="card-header">

                            <div>
                                <h2>Order Status</h2>
                                <p>
                                    Current order status
                                </p>
                            </div>

                        </div>


                        <div className="status-display">

                            <span
                                className={`status-circle ${order.status.toLowerCase()}`}
                            >
                                ✓
                            </span>

                            <div>
                                <span className="status-label">
                                    Current Status
                                </span>

                                <strong>
                                    {order.status}
                                </strong>
                            </div>

                        </div>


                        <div className="status-actions">

                            <button
                                type="button"
                                className="status-btn"
                            >
                                Update Status
                            </button>

                        </div>

                    </div>


                    {/* PAYMENT SUMMARY */}

                    <div className="order-card">

                        <div className="card-header">

                            <div>
                                <h2>Order Summary</h2>
                                <p>
                                    Payment summary
                                </p>
                            </div>

                        </div>


                        <div className="price-row">

                            <span>Subtotal</span>

                            <strong>
                                {formatCurrency(order.totalAmount)}
                            </strong>

                        </div>


                        <div className="price-row">

                            <span>Shipping</span>

                            <strong>
                                Free
                            </strong>

                        </div>


                        <div className="price-divider"></div>


                        <div className="total-row">

                            <span>Total</span>

                            <strong>
                                {formatCurrency(order.totalAmount)}
                            </strong>

                        </div>

                    </div>

                </div>

            </section>

        </main>
    );
}

export default OrderDetails;