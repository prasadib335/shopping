import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

import type { AppDispatch, RootState } from "../../store";
import {
    fetchProductById,
    updateProduct
} from "../../thunks/productThunk";

import "../../styles/editProduct.css";

function EditProduct() {

    const { productId } = useParams<{ productId: string }>();

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { singleProduct, loading, error } = useSelector(
        (state: RootState) => state.products
    );

    const [formData, setFormData] = useState({
        productName: "",
        companyName: "",
        sellingPrice: "",
        originalPrice: "",
    });


    // Get product from backend
    useEffect(() => {

        if (productId) {
            dispatch(fetchProductById(Number(productId)));
        }

    }, [dispatch, productId]);


    // Put backend product into form
    useEffect(() => {

        if (singleProduct) {

            setFormData({
                productName: singleProduct.productName,
                companyName: singleProduct.companyName,
                sellingPrice: String(singleProduct.sellingPrice),
                originalPrice: String(singleProduct.originalPrice),
            });

        }

    }, [singleProduct]);


    // Handle input changes
    function handleChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {

        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value,
        }));
    }


    // Handle form submit
    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {

        event.preventDefault();

        if (!productId) {
            return;
        }

        try {

            await dispatch(
                updateProduct({
                    productId: Number(productId),

                    productData: {
                        productName: formData.productName,
                        companyName: formData.companyName,
                        sellingPrice: Number(formData.sellingPrice),
                        originalPrice: Number(formData.originalPrice),
                    }
                })
            ).unwrap();

            navigate("/admin/products");

        } catch (error) {

            console.error("Update failed:", error);

        }
    }


    // Loading
    if (loading && !singleProduct) {

        return (
            <main className="edit-product-page">

                <h1>Loading product...</h1>

            </main>
        );
    }


    // Error
    if (error && !singleProduct) {

        return (
            <main className="edit-product-page">

                <div className="edit-product-message">

                    <h1>Unable to load product</h1>

                    <p>{error}</p>

                    <button
                        className="cancel-btn"
                        type="button"
                        onClick={() =>
                            navigate("/admin/products")
                        }
                    >
                        Back to products
                    </button>

                </div>

            </main>
        );
    }


    // Product not found
    if (!singleProduct) {

        return (
            <main className="edit-product-page">

                <div className="edit-product-message">

                    <h1>Product not found</h1>

                    <button
                        className="cancel-btn"
                        type="button"
                        onClick={() =>
                            navigate("/admin/products")
                        }
                    >
                        Back to products
                    </button>

                </div>

            </main>
        );
    }


    return (
        <main className="edit-product-page">

            <h1>Edit Product</h1>


            <form
                className="edit-product-form"
                onSubmit={handleSubmit}
            >

                {/* Product Name */}

                <div className="form-group">

                    <label htmlFor="productName">
                        Product Name
                    </label>

                    <input
                        id="productName"
                        name="productName"
                        type="text"
                        value={formData.productName}
                        onChange={handleChange}
                        required
                    />

                </div>


                {/* Company Name */}

                <div className="form-group">

                    <label htmlFor="companyName">
                        Company Name
                    </label>

                    <input
                        id="companyName"
                        name="companyName"
                        type="text"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                    />

                </div>


                {/* Original Price */}

                <div className="form-group">

                    <label htmlFor="originalPrice">
                        Original Price
                    </label>

                    <input
                        id="originalPrice"
                        name="originalPrice"
                        type="number"
                        value={formData.originalPrice}
                        onChange={handleChange}
                        min="0"
                        required
                    />

                </div>


                {/* Selling Price */}

                <div className="form-group">

                    <label htmlFor="sellingPrice">
                        Selling Price
                    </label>

                    <input
                        id="sellingPrice"
                        name="sellingPrice"
                        type="number"
                        value={formData.sellingPrice}
                        onChange={handleChange}
                        min="0"
                        required
                    />

                </div>


                {/* Buttons */}

                <div className="form-actions">

                    <button
                        className="cancel-btn"
                        type="button"
                        onClick={() =>
                            navigate("/admin/products")
                        }
                    >
                        Cancel
                    </button>


                    <button
                        className="update-btn"
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Updating..."
                            : "Update Product"}
                    </button>

                </div>

            </form>

        </main>
    );
}

export default EditProduct;