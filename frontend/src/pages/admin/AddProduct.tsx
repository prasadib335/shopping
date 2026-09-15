import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import type { AppDispatch } from "../../store";
import { createProduct } from "../../thunks/productThunk";

import "../../styles/editProduct.css";

function AddProduct() {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        productName: "",
        companyName: "",
        sellingPrice: "",
        originalPrice: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


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

        setError(null);
        setLoading(true);

        try {

            await dispatch(
                createProduct({
                    productName: formData.productName,
                    companyName: formData.companyName,
                    sellingPrice: Number(formData.sellingPrice),
                    originalPrice: Number(formData.originalPrice),
                })
            ).unwrap();

            navigate("/admin/products");

        } catch (error) {

            setError(
                typeof error === "string"
                    ? error
                    : "Unable to create product."
            );

        } finally {

            setLoading(false);

        }
    }


    return (

        <main className="edit-product-page">

            <h1>Add Product</h1>

            <form
                className="edit-product-form"
                onSubmit={handleSubmit}
            >

                {/* Description */}

                <p className="form-description">
                    Create a new product for your store.
                </p>


                {/* Error */}

                {error && (
                    <p
                        className="edit-product-error"
                        role="alert"
                    >
                        {error}
                    </p>
                )}


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
                        min="0"
                        value={formData.originalPrice}
                        onChange={handleChange}
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
                        min="0"
                        value={formData.sellingPrice}
                        onChange={handleChange}
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
                        disabled={loading}
                    >
                        Cancel
                    </button>

                    <button
                        className="update-btn"
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating..."
                            : "Add Product"}
                    </button>

                </div>

            </form>

        </main>
    );
}

export default AddProduct;