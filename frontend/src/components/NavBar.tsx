import { useNavigate } from "react-router";
import "../styles/navbar.css";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { fetchCart } from "../thunks/cartThunks";

function NavBar() {


    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
           dispatch(fetchCart(1));
    });

    const cartCount = useSelector(
        (state: RootState) =>
            state.cart.cart.items.reduce(
                (total, item) => total + item.quantity,
                0
            )
    );

    return (
        <nav className="navbar">

            <div
                className="navbar-logo"
                onClick={() => navigate("/products")}
            >
                MyStore
            </div>

            <div className="navbar-actions">

                <button
                    className="profile-button"
                    onClick={() => navigate("/profile")}
                >
                    <div className="profile-icon">
                        👤
                    </div>

                    <div className="profile-info">
                        <span className="profile-greeting">
                            Hello, User
                        </span>

                        <span className="profile-title">
                            Account & Lists ▾
                        </span>
                    </div>
                </button>

                <button
                    className="nav-button orders-button"
                    onClick={() => navigate("/orders")}
                >
                    📦 Orders
                </button>

                <button
                    className="nav-button cart-button"
                    onClick={() => navigate("/cart")}
                >
                    🛒 Cart ({cartCount})
                </button>

            </div>

        </nav>
    );
}

export default NavBar;