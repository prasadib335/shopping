import "./App.css";

import { Route, Routes } from "react-router";

import ProductCardPage from "./pages/ProductCardPage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfilePage from "./pages/ProfilePage";


// ADMIN PAGES
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import ManageUsers from "./pages/admin/ManageUsers";
import AdminOrders from "./pages/admin/AdminOrders";
import OrderDetails from "./pages/admin/OrderDetails";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminProfile from "./pages/admin/AdminProfile";
import EditAdminProfile from "./pages/admin/EditAdminProfile";


function App() {

    return (

        <Routes>

            {/* =========================
                USER ROUTES
            ========================= */}

            <Route
                path="/"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/profile"
                element={<ProfilePage />}
            />

            <Route
                path="/products"
                element={<ProductsPage />}
            />

            <Route
                path="/products/:id"
                element={<ProductCardPage />}
            />

            <Route
                path="/cart"
                element={<CartPage />}
            />

            <Route
                path="/orders"
                element={<OrdersPage />}
            />

            <Route
                path="/orders/:id"
                element={<OrderDetailsPage />}
            />


            {/* =========================
                ADMIN ROUTES
            ========================= */}
       <Route path="/admin" element={<AdminDashboard />} />

            <Route
                path="/admin/products"
                element={<AdminProducts />}
            />

            <Route
                path="/admin/products/new"
                element={<AddProduct />}
            />

            <Route
                path="/admin/products/:productId/edit"
                element={<EditProduct />}
            />

            <Route
                path="/admin/orders"
                element={<AdminOrders />}
            />

            <Route
                path="/admin/orders/:orderId"
                element={<OrderDetails />}
            />

            <Route
                path="/admin/users"
                element={<ManageUsers />}
            />

            <Route
                path="/admin/categories"
                element={<AdminCategories />}
            />

            <Route
                path="/admin/profile"
                element={<AdminProfile />}
            />

            <Route
                path="/admin/profile/edit"
                element={<EditAdminProfile />}
             />
        </Routes>

    );
}

export default App;
