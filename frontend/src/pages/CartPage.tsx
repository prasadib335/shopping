import { useEffect } from "react";
import "../styles/cart.css";

import {
    placeOrder
} from "../api/cartApi";

import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import type { RootState , AppDispatch} from "../store";

import {
    addQuantity,
    clearAllProductsFromCart,
    deleteFromCart,
    fetchCart,
    removeQuantity
} from "../thunks/cartThunks";


function CartPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    // Getting cart state from Redux
    const cart = useSelector(
        (state: RootState) => state.cart
    );


    // Fetch cart when page loads
    useEffect(() => {

        dispatch(fetchCart(1));

    }, []);


    // Increase quantity
    async function handleIncrease(productId: number) {

        await dispatch(
            addQuantity({
                userId: 1,
                productId: productId
            })
        );

        // Fetch updated cart
        await dispatch(fetchCart(1));
    }


    // Decrease quantity
    async function handleDecrease(productId: number) {

        await dispatch(
            removeQuantity({
                userId: 1,
                productId: productId
            })
        );

        // Fetch updated cart
        await dispatch(fetchCart(1));
    }


    // Remove item
    async function handleRemove(productId: number) {

        await dispatch(
            deleteFromCart({
                userId: 1,
                productId: productId
            })
        );

        // Fetch updated cart
        await dispatch(fetchCart(1));
    }


    // Clear cart
    async function handleClearCart() {


        await dispatch(clearAllProductsFromCart(1));

        await dispatch(fetchCart(1));

      
    }


    // Checkout
    async function handleCheckout() {

        try {

            await placeOrder(1);

            alert(
                "Order placed successfully! 🎉"
            );

            navigate("/orders");

        } catch (error) {

            console.log(
                "Checkout failed:",
                error
            );

            alert(
                "Something went wrong while placing the order."
            );
        }
    }


    // Show loading
    if (cart.loading) {

        return (
            <h2 className="cart-loading">
                Loading...
            </h2>
        );
    }


    return (

        <div className="cart-page">

            <h1 className="cart-title">
                Your Cart
            </h1>


            <div className="cart-container">


                {/* =========================
                    CART ITEMS
                ========================= */}

                <div className="cart-items">


                    <div className="cart-items-header">

                        <h2>
                            Cart Items
                        </h2>


                        {cart.cart.items.length > 0 && (

                            <button
                                className="clear-cart-button"
                                onClick={handleClearCart}
                            >
                                🗑️ Clear Cart
                            </button>

                        )}

                    </div>


                    {/* Empty Cart */}

                    {cart.cart.items.length === 0 ? (

                        <div className="empty-cart">

                            <div className="empty-cart-icon">
                                🛒
                            </div>


                            <h2>
                                Your cart is empty
                            </h2>


                            <p>
                                Looks like you haven't added
                                anything to your cart yet.
                            </p>


                            <button
                                className="continue-shopping-button"
                                onClick={() => navigate("/products")}
                            >
                                🛍️ Continue Shopping
                            </button>

                        </div>

                    ) : (


                        /* Cart Items */

                        cart.cart.items.map((item) => (

                            <div
                                className="cart-item"
                                key={item.cartItemId}
                            >


                                <div className="cart-item-info">


                                    <h2>
                                        {item.productName}
                                    </h2>


                                    <p className="cart-item-price">
                                        ₹{item.price} each
                                    </p>


                                    {/* Quantity Controls */}

                                    <div className="quantity-control">


                                        {/* Decrease */}

                                        <button
                                            className="quantity-button"
                                            onClick={() =>
                                                handleDecrease(
                                                    item.productId
                                                )
                                            }
                                            disabled={
                                                item.quantity <= 1
                                            }
                                        >
                                            −
                                        </button>


                                        {/* Current Quantity */}

                                        <span className="quantity-value">
                                            {item.quantity}
                                        </span>


                                        {/* Increase */}

                                        <button
                                            className="quantity-button"
                                            onClick={() =>
                                                handleIncrease(
                                                    item.productId
                                                )
                                            }
                                        >
                                            +
                                        </button>

                                    </div>


                                    {/* Remove */}

                                    <button
                                        className="remove-item-button"
                                        onClick={() =>
                                            handleRemove(
                                                item.productId
                                            )
                                        }
                                    >
                                        🗑️ Remove
                                    </button>


                                </div>


                                {/* Subtotal */}

                                <div className="cart-item-total">

                                    ₹{item.subTotal}

                                </div>


                            </div>

                        ))
                    )}

                </div>


                {/* =========================
                    CART SUMMARY
                ========================= */}

                <div className="cart-summary">


                    <h2>
                        Order Summary
                    </h2>


                    {/* Total Items */}

                    <div className="summary-row">

                        <span>
                            Items
                        </span>


                        <span>

                            {cart.cart.items.reduce(
                                (total, item) =>
                                    total + item.quantity,
                                0
                            )}

                        </span>

                    </div>


                    {/* Total Amount */}

                    <div className="summary-row total-row">

                        <span>
                            Total
                        </span>


                        <span>
                            ₹{cart.cart.totalAmount}
                        </span>

                    </div>


                    {/* Checkout */}

                    <button
                        className="checkout-button"
                        onClick={handleCheckout}
                        disabled={
                            cart.cart.items.length === 0
                        }
                    >
                        Proceed to Checkout
                    </button>


                </div>

            </div>

        </div>
    );
}

export default CartPage;