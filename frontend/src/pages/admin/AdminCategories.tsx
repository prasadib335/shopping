import { useEffect, useState } from "react";
import { Link } from "react-router";

import "../../styles/adminCategories.css";

interface Category {
    categoryId: number;
    categoryName: string;
}

function AdminCategories() {

    const [categories, setCategories] = useState<Category[]>([]);

    const [categoryName, setCategoryName] = useState("");

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // --------------------------------
    // FETCH CATEGORIES
    // --------------------------------

    useEffect(() => {

        async function fetchCategories() {

            try {

                setLoading(true);

                const response = await fetch(
                    "http://localhost:8080/api/categories"
                );

                if (!response.ok) {
                    throw new Error(
                        "Unable to fetch categories"
                    );
                }

                const data = await response.json();

                setCategories(data);

            } catch (error) {

                console.error(error);

                setError(
                    "Unable to load categories."
                );

            } finally {

                setLoading(false);

            }
        }

        fetchCategories();

    }, []);


    // --------------------------------
    // ADD CATEGORY
    // --------------------------------

    async function handleAddCategory(
        event: React.FormEvent
    ) {

        event.preventDefault();

        if (!categoryName.trim()) {
            return;
        }

        try {

            const response = await fetch(
                "http://localhost:8080/api/categories",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        categoryName: categoryName.trim()
                    })
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Unable to add category"
                );
            }

            const newCategory =
                await response.json();

            setCategories((previous) => [
                ...previous,
                newCategory
            ]);

            setCategoryName("");

        } catch (error) {

            console.error(error);

            setError(
                "Unable to add category."
            );

        }
    }


    // --------------------------------
    // DELETE CATEGORY
    // --------------------------------

    async function handleDelete(
        categoryId: number
    ) {

        const confirmed = window.confirm(
            "Are you sure you want to delete this category?"
        );

        if (!confirmed) {
            return;
        }

        try {

            const response = await fetch(
                `http://localhost:8080/api/categories/${categoryId}`,
                {
                    method: "DELETE"
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Unable to delete category"
                );
            }

            setCategories((previous) =>
                previous.filter(
                    (category) =>
                        category.categoryId !== categoryId
                )
            );

        } catch (error) {

            console.error(error);

            setError(
                "Unable to delete category."
            );

        }
    }


    // --------------------------------
    // LOADING
    // --------------------------------

    if (loading) {

        return (
            <main className="admin-categories">

                <h1>Manage Categories</h1>

                <p className="categories-message">
                    Loading categories...
                </p>

            </main>
        );
    }


    // --------------------------------
    // UI
    // --------------------------------

    return (

        <main className="admin-categories">

            {/* =========================
                HEADER
            ========================= */}

            <header className="categories-header">

                <div>

                    <h1>
                        Manage Categories
                    </h1>

                    <p>
                        Create and manage product categories.
                    </p>

                </div>

                <Link to="/admin">
                    Back to Dashboard
                </Link>

            </header>


            {/* =========================
                ERROR
            ========================= */}

            {error && (

                <p
                    className="categories-error"
                    role="alert"
                >
                    {error}
                </p>

            )}


            {/* =========================
                ADD CATEGORY
            ========================= */}

            <section className="add-category-card">

                <div>

                    <h2>
                        Add Category
                    </h2>

                    <p>
                        Create a new category for your products.
                    </p>

                </div>


                <form
                    onSubmit={handleAddCategory}
                    className="category-form"
                >

                    <input
                        type="text"
                        placeholder="Enter category name"
                        value={categoryName}
                        onChange={(event) =>
                            setCategoryName(
                                event.target.value
                            )
                        }
                    />

                    <button
                        type="submit"
                    >
                        Add Category
                    </button>

                </form>

            </section>


            {/* =========================
                CATEGORY LIST
            ========================= */}

            <section className="categories-card">

                <div className="card-header">

                    <div>

                        <h2>
                            Categories
                        </h2>

                        <p>
                            {categories.length} categories
                        </p>

                    </div>

                </div>


                {categories.length === 0 ? (

                    <p className="categories-message">
                        No categories found.
                    </p>

                ) : (

                    <div className="categories-table">

                        {/* HEADER */}

                        <div className="category-row category-heading">

                            <span>
                                ID
                            </span>

                            <span>
                                Category Name
                            </span>

                            <span>
                                Actions
                            </span>

                        </div>


                        {/* CATEGORIES */}

                        {categories.map(
                            (category) => (

                                <div
                                    className="category-row"
                                    key={category.categoryId}
                                >

                                    <span>
                                        #{category.categoryId}
                                    </span>

                                    <span className="category-name">
                                        {category.categoryName}
                                    </span>

                                    <span className="category-actions">

                                        <button
                                            type="button"
                                            className="edit-category-btn"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            className="delete-category-btn"
                                            onClick={() =>
                                                handleDelete(
                                                    category.categoryId
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </span>

                                </div>

                            )
                        )}

                    </div>

                )}

            </section>

        </main>
    );
}

export default AdminCategories;