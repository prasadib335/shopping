import { useEffect } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../../store";
import { fetchProducts } from "../../thunks/productThunk";
import {
    fetchUsers
} from "../../thunks/userThunk";
import {
    fetchOrders
} from "../../thunks/orderThunk";

import "../../styles/adminDashboard.css";

function AdminDashboard() {

    const dispatch = useDispatch<AppDispatch>();

    // -----------------------------
    // GET DATA FROM REDUX
    // -----------------------------

    const products = useSelector(
        (state: RootState) => state.products.products
    );

    const users = useSelector(
        (state: RootState) => state.user.users
    );

    const orders = useSelector(
        (state: RootState) => state.orders.orders
    );

    const productLoading = useSelector(
        (state: RootState) => state.products.loading
    );

    const userLoading = useSelector(
        (state: RootState) => state.user.loading
    );

    const orderLoading = useSelector(
        (state: RootState) => state.orders.loading
    );


    // -----------------------------
    // FETCH DASHBOARD DATA
    // -----------------------------

    useEffect(() => {

        dispatch(fetchProducts());
        dispatch(fetchUsers());
        dispatch(fetchOrders(1));

    }, [dispatch]);


    // -----------------------------
    // SAFE ARRAYS
    // -----------------------------

    const productList = products ?? [];
    const userList = users ?? [];
    const orderList = orders ?? [];


    // -----------------------------
    // TOTAL REVENUE
    // -----------------------------

    const totalRevenue = orderList.reduce(
        (total, order) => total + order.totalAmount,
        0
    );


    // -----------------------------
    // RECENT ORDERS
    // -----------------------------

    const recentOrders = [...orderList]
        .sort(
            (a, b) =>
                new Date(b.orderDate).getTime() -
                new Date(a.orderDate).getTime()
        )
        .slice(0, 5);


    // -----------------------------
    // LOADING
    // -----------------------------

    const loading =
        productLoading ||
        userLoading ||
        orderLoading;


    // -----------------------------
    // FORMAT CURRENCY
    // -----------------------------

    const formatCurrency = (amount: number) => {

        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }).format(amount);

    };


    // -----------------------------
    // FORMAT DATE
    // -----------------------------

    const formatDate = (date: string) => {

        return new Date(date).toLocaleDateString("en-IN");

    };


    return (

        <div className="admin-dashboard">

            {/* =========================
                SIDEBAR
            ========================= */}

            <aside className="admin-sidebar">

                <div className="admin-logo">
                    <h2>ShopAdmin</h2>
                </div>


                <nav className="admin-nav">

                    <Link
                        to="/admin"
                        className="active"
                    >
                        Dashboard
                    </Link>

                    <Link to="/admin/products">
                        Products
                    </Link>

                    <Link to="/admin/orders">
                        Orders
                    </Link>

                    <Link to="/admin/users">
                        Users
                    </Link>

                    <Link to="/admin/categories">
                        Categories
                    </Link>

                </nav>


                <div className="admin-sidebar-bottom">

                    <Link to="/admin/settings">
                        Settings
                    </Link>

                    <Link to="/logout">
                        Logout
                    </Link>

                </div>

            </aside>


            {/* =========================
                MAIN CONTENT
            ========================= */}

            <main className="admin-main">


                {/* HEADER */}

                <header className="admin-header">

                    <div>

                        <h1>Dashboard</h1>

                        <p>
                            Welcome back, Admin 👋
                        </p>

                    </div>


                <Link
                        to="/admin/profile"
                        className="admin-profile"
                    >
                        <div className="admin-avatar">
                            A
                        </div>

                        <div>
                            <strong>
                                Admin
                            </strong>

                            <span>
                                Administrator
                            </span>
                        </div>
            </Link>

                </header>


                {/* =========================
                    STATISTICS
                ========================= */}

                <section className="stats-grid">


                    {/* PRODUCTS */}

                    <div className="stat-card">

                        <div className="stat-icon">
                            📦
                        </div>

                        <div>

                            <p>
                                Total Products
                            </p>

                            <h2>
                                {loading
                                    ? "..."
                                    : productList.length}
                            </h2>

                        </div>

                    </div>


                    {/* USERS */}

                    <div className="stat-card">

                        <div className="stat-icon">
                            👥
                        </div>

                        <div>

                            <p>
                                Total Users
                            </p>

                            <h2>
                                {loading
                                    ? "..."
                                    : userList.length}
                            </h2>

                        </div>

                    </div>


                    {/* ORDERS */}

                    <div className="stat-card">

                        <div className="stat-icon">
                            🛒
                        </div>

                        <div>

                            <p>
                                Total Orders
                            </p>

                            <h2>
                                {loading
                                    ? "..."
                                    : orderList.length}
                            </h2>

                        </div>

                    </div>


                    {/* REVENUE */}

                    <div className="stat-card">

                        <div className="stat-icon">
                            ₹
                        </div>

                        <div>

                            <p>
                                Total Revenue
                            </p>

                            <h2>
                                {loading
                                    ? "..."
                                    : formatCurrency(totalRevenue)}
                            </h2>

                        </div>

                    </div>

                </section>


                {/* =========================
                    BOTTOM CONTENT
                ========================= */}

                <section className="dashboard-content">


                    {/* =========================
                        RECENT ORDERS
                    ========================= */}

                    <div className="dashboard-card orders-card">


                        <div className="card-header">

                            <div>

                                <h2>
                                    Recent Orders
                                </h2>

                                <p>
                                    Latest customer orders
                                </p>

                            </div>


                            <Link to="/admin/orders">
                                View All
                            </Link>

                        </div>


                        <div className="orders-table">


                            {/* TABLE HEADER */}

                            <div className="table-row table-heading">

                                <span>
                                    Order ID
                                </span>

                                <span>
                                    User ID
                                </span>

                                <span>
                                    Amount
                                </span>

                                <span>
                                    Status
                                </span>

                                <span>
                                    Date
                                </span>

                            </div>


                            {/* LOADING */}

                            {loading && (

                                <div className="table-row">

                                    <span>
                                        Loading orders...
                                    </span>

                                </div>

                            )}


                            {/* NO ORDERS */}

                            {!loading &&
                                recentOrders.length === 0 && (

                                    <div className="table-row">

                                        <span>
                                            No orders found.
                                        </span>

                                    </div>

                                )}


                            {/* ORDERS */}

                            {!loading &&
                                recentOrders.map((order) => (

                                    <div
                                        className="table-row"
                                        key={order.orderId}
                                    >

                                        <span>
                                            #{order.orderId}
                                        </span>

                                        <span>
                                            User #{order.userId}
                                        </span>

                                        <span>
                                            {formatCurrency(
                                                order.totalAmount
                                            )}
                                        </span>

                                        <span
                                            className={`status ${order.status.toLowerCase()}`}
                                        >
                                            {order.status}
                                        </span>

                                        <span>
                                            {formatDate(
                                                order.orderDate
                                            )}
                                        </span>

                                    </div>

                                ))}

                        </div>

                    </div>


                    {/* =========================
                        QUICK ACTIONS
                    ========================= */}

                    <div className="dashboard-card quick-actions">


                        <div className="card-header">

                            <div>

                                <h2>
                                    Quick Actions
                                </h2>

                                <p>
                                    Manage your store
                                </p>

                            </div>

                        </div>


                        <Link
                            to="/admin/products/new"
                            className="action-button"
                        >
                            <span>＋</span>
                            Add Product
                        </Link>


                        <Link
                            to="/admin/products"
                            className="action-button"
                        >
                            <span>📦</span>
                            Manage Products
                        </Link>


                        <Link
                            to="/admin/orders"
                            className="action-button"
                        >
                            <span>🛒</span>
                            Manage Orders
                        </Link>


                        <Link
                            to="/admin/users"
                            className="action-button"
                        >
                            <span>👥</span>
                            Manage Users
                        </Link>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default AdminDashboard;

