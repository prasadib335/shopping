import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../../store";
import { fetchProducts } from "../../thunks/productThunk";
import "../../styles/adminProducts.css";

function AdminProducts() {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { products, loading, error } = useSelector(
        (state: RootState) => state.products
    );

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <main className="admin-products">

            <h1>Manage Products</h1>

            <p className="admin-products-nav">
                <Link to="/admin">
                    Admin dashboard
                </Link>

                {" | "}

                <Link to="/admin/products/new">
                    Add product
                </Link>
            </p>


            {/* Loading */}
            {loading && (
                <p className="admin-products-message">
                    Loading products...
                </p>
            )}


            {/* Error */}
            {error && (
                <p
                    className="admin-products-error"
                    role="alert"
                >
                    {error}
                </p>
            )}


            {/* No products */}
            {!loading && !error && products.length === 0 && (
                <p className="admin-products-message">
                    No products found.
                </p>
            )}


            {/* Products */}
            {!loading && products.length > 0 && (

                <div className="admin-products-table-container">

                    <table>

                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Company</th>
                                <th>Selling price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {products.map((product) => (

                                <tr key={product.productId}>

                                    <td>
                                        {product.productName}
                                    </td>

                                    <td>
                                        {product.companyName}
                                    </td>
                                    
                                    <td>
                                        ₹{product.sellingPrice}
                                    </td>

                                    <td>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                navigate(
                                                    `/admin/products/${product.productId}/edit`
                                                )
                                            }
                                        >
                                            Edit
                                        </button>

                                        {" "}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                navigate(
                                                    `/admin/products/${product.productId}/delete`
                                                )
                                            }
                                        >
                                            Delete
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

export default AdminProducts;