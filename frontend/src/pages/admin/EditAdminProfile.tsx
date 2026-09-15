import { useState } from "react";
import { useNavigate } from "react-router";

import "../../styles/editAdminProfile.css";


function EditAdminProfile() {

    const navigate = useNavigate();


    const [formData, setFormData] = useState({

        name: "Admin",

        email: "admin@example.com"

    });


    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    // --------------------------------
    // HANDLE CHANGE
    // --------------------------------

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {

        const { name, value } = event.target;

        setFormData((previous) => ({

            ...previous,

            [name]: value

        }));

    }


    // --------------------------------
    // HANDLE SUBMIT
    // --------------------------------

    async function handleSubmit(
        event: React.FormEvent
    ) {

        event.preventDefault();

        setError("");

        setLoading(true);


        try {

            /*
             * Later replace this with your
             * actual backend API / Redux thunk.
             *
             * Example:
             *
             * await dispatch(
             *     updateMyProfile(formData)
             * ).unwrap();
             */

            console.log(
                "Updated admin profile:",
                formData
            );


            // Temporary
            // simulate successful update

            await new Promise(
                (resolve) =>
                    setTimeout(resolve, 500)
            );


            navigate("/admin/profile");

        } catch (error) {

            console.error(error);

            setError(
                "Unable to update profile."
            );

        } finally {

            setLoading(false);

        }

    }


    return (

        <main className="edit-admin-profile-page">


            {/* =========================
                HEADER
            ========================= */}

            <header className="edit-profile-header">

                <div>

                    <h1>
                        Edit Admin Profile
                    </h1>

                    <p>
                        Update your administrator account information.
                    </p>

                </div>

            </header>


            {/* =========================
                FORM
            ========================= */}

            <form
                className="edit-admin-profile-form"
                onSubmit={handleSubmit}
            >


                {error && (

                    <p
                        className="edit-admin-profile-error"
                        role="alert"
                    >
                        {error}
                    </p>

                )}


                {/* NAME */}

                <div className="form-group">

                    <label htmlFor="name">
                        Name
                    </label>

                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                </div>


                {/* EMAIL */}

                <div className="form-group">

                    <label htmlFor="email">
                        Email
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                </div>


                {/* ROLE */}

                <div className="form-group">

                    <label>
                        Role
                    </label>

                    <input
                        type="text"
                        value="Administrator"
                        disabled
                    />

                    <small>
                        Administrator role cannot be changed.
                    </small>

                </div>


                {/* ACTIONS */}

                <div className="form-actions">

                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={() =>
                            navigate("/admin/profile")
                        }
                    >
                        Cancel
                    </button>


                    <button
                        type="submit"
                        className="save-btn"
                        disabled={loading}
                    >
                        {loading
                            ? "Saving..."
                            : "Save Changes"}
                    </button>

                </div>

            </form>

        </main>
    );
}


export default EditAdminProfile;