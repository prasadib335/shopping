import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../../store";
import { fetchOrders } from "../../thunks/orderThunk";

import '../../styles/adminOrders.css';

function AdminOrders() {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { orders, loading, error } = useSelector(
        (state: RootState) => state.orders
    );

    // Get orders from backend
    useEffect(() => {
        dispatch(fetchOrders(1));
    }, [dispatch]);

    const orderList = orders ?? [];

    // Format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }).format(amount);
    };

    // Format date
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-IN");
    };

    return (
        <main className="admin-orders">

            <h1>Manage Orders</h1>

            <p className="admin-orders-nav">
                <Link to="/admin">Admin dashboard</Link>
            </p>

            {loading && (
                <p className="admin-orders-message">
                    Loading orders...
                </p>
            )}

            {error && (
                <p
                    className="admin-orders-error"
                    role="alert"
                >
                    {error}
                </p>
            )}

            {!loading && !error && orderList.length === 0 && (
                <p className="admin-orders-message">
                    No orders found.
                </p>
            )}

            {!loading && orderList.length > 0 && (
                <div className="admin-orders-table-container">

                    <table>

                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>User ID</th>
                                <th>Order Date</th>
                                <th>Total Amount</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {orderList.map((order) => (

                                <tr key={order.orderId}>

                                    <td className="order-id">
                                        #{order.orderId}
                                    </td>

                                    <td>
                                        User #{order.userId}
                                    </td>

                                    <td>
                                        {formatDate(order.orderDate)}
                                    </td>

                                    <td className="order-amount">
                                        {formatCurrency(order.totalAmount)}
                                    </td>

                                    <td>
                                        <span
                                            className={`order-status ${order.status.toLowerCase()}`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>

                                    <td>
                                        <button
                                            type="button"
                                            className="view-order-btn"
                                            onClick={() =>
                                                navigate(
                                                    `/admin/orders/${order.orderId}`
                                                )
                                            }
                                        >
                                            View
                                        </button>
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>
            )}

        </main>
    );
}

export default AdminOrders;