import { useEffect } from "react";
import "../styles/products.css";
import { useNavigate } from "react-router";
import NavBar from "../components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { fetchProducts } from "../thunks/productThunk";
import { getProducts } from "../api/productApi";

function ProductsPage() {
  // const [products, setProducts] = useState<Product[]>([]);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const {products,loading}= useSelector((state : RootState) => {
            return state.products;
    });

    useEffect(() => {
            dispatch(fetchProducts());
            console.log(getProducts());
    },[dispatch]);

    if(loading) {
          return(
             <><h1>Loading...</h1></>
          )
    }


    
    return (
        <div className="products-page">

            <NavBar />

            <section className="products-header">
                <h1>Our Products</h1>
                <p>Explore our latest collection</p>
            </section>

            <div className="products-grid">

                {products.map((product) => (
                    <div
                        className="product-card"
                        key={product.productId}
                    >

                        <div className="product-card-content">

                            <span className="product-company">
                                {product.companyName}
                            </span>

                            <h2 className="product-name">
                                {product.productName}
                            </h2>

                            <div className="product-price-section">
                                <span className="product-price">
                                    ₹{product.sellingPrice}
                                </span>

                                {
                                    <span className="product-original-price">
                                        ₹{product.sellingPrice}
                                    </span>
                                }
                            </div>

                            <button
                                className="details-button"
                                onClick={() =>
                                    navigate(
                                        `/products/${product.productId}`
                                    )
                                }
                            >
                                View Details
                            </button>

                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}

export default ProductsPage;