import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { Product } from "../types/Product";
import NavBar from "../components/NavBar";
import "../styles/productDetails.css";
import { getProductById } from "../api/productApi";
import { addToCart } from "../api/cartApi";
import { addProductToCart, fetchCart } from "../thunks/cartThunks";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { fetchProductById } from "../thunks/productThunk";

function ProductCardPage() {
    const { id } = useParams();
    const[quantity, setQuantity] = useState(1);
    const dispatch = useDispatch<AppDispatch>();

    const product = useSelector((state : RootState) => {
           return state.products.singleProduct;
    });

    useEffect(() => {
           dispatch(fetchProductById(Number(id)));
    },[dispatch]);

    if (!product) {
        return <h2 className="product-loading">Loading...</h2>;
    }

    async function handleCart() {
             
             await dispatch(addProductToCart({
                     userId : 1,
                     productId : Number(id),
                     quantity : quantity
             }));

             alert("🛒 Product added to your cart successfully!");

             await dispatch(fetchCart(1));

    }

    return (
        <>
            <NavBar />

            <main className="product-details-page">

                <div className="product-details-card">

                    {/* Product information */}

                    <div className="product-info">

                        <p className="product-brand">
                            {product.companyName}
                        </p>

                        <h1 className="product-title">
                            {product.productName}
                        </h1>

                        <p className="product-description">
                            Experience powerful performance and modern
                            design with the {product.productName}.
                        </p>

                        <div className="posted-date">
                            Posted on{" "}
                            {new Date(
                                product.postedDate
                            ).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </div>

                    </div>


                    {/* Price and actions */}

                    <div className="product-purchase">

                        <div className="price-section">

                            <p className="original-price">
                                ₹{product.originalPrice}
                            </p>

                            <p className="selling-price">
                                ₹{product.sellingPrice}
                            </p>

                            <span className="discount">
                                {Math.round(
                                    ((product.originalPrice -
                                        product.sellingPrice) /
                                        product.originalPrice) *
                                        100
                                )}
                                % OFF
                            </span>

                        </div>
                          
                        <div className="quantity-section">
                            <label htmlFor="quantity">Quantity:</label>

                            <select 
                            id="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            >
                            {[1,2,3,4,5,6].map((qty)=> (
                                 <option key={qty} value={qty}>
                                     {qty}
                                 </option>
                            ))}
                            </select>

                        </div>
                        <button
                            className="add-cart-button"
                            onClick={handleCart}
                        >
                            🛒 Add to Cart
                        </button>

                    </div>

                </div>

            </main>
        </>
    );
}

export default ProductCardPage;