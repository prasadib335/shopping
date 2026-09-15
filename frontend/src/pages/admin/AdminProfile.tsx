import { Link, useNavigate } from "react-router";

import "../../styles/adminProfile.css";


function AdminProfile() {

    const navigate = useNavigate();

    return (

        <main className="admin-profile-page">

            {/* =========================
                HEADER
            ========================= */}

            <header className="profile-header">

                <div>

                    <h1>
                        Admin Profile
                    </h1>

                    <p>
                        View your administrator account information.
                    </p>

                </div>


                <Link to="/admin">
                    Back to Dashboard
                </Link>

            </header>


            {/* =========================
                PROFILE CARD
            ========================= */}

            <section className="profile-card">

                <div className="profile-avatar">
                    A
                </div>


                <div className="profile-main-info">

                    <h2>
                        Admin
                    </h2>

                    <p>
                        admin@example.com
                    </p>

                    <span className="admin-role">
                        ADMINISTRATOR
                    </span>

                </div>

            </section>


            {/* =========================
                ACCOUNT INFORMATION
            ========================= */}

            <section className="profile-details-card">

                <div className="profile-card-header">

                    <div>

                        <h2>
                            Account Information
                        </h2>

                        <p>
                            Your administrator account details.
                        </p>

                    </div>

                </div>


                <div className="profile-details">

                    {/* NAME */}

                    <div className="profile-field">

                        <span className="field-label">
                            Name
                        </span>

                        <span className="field-value">
                            Admin
                        </span>

                    </div>


                    {/* EMAIL */}

                    <div className="profile-field">

                        <span className="field-label">
                            Email
                        </span>

                        <span className="field-value">
                            admin@example.com
                        </span>

                    </div>


                    {/* ROLE */}

                    <div className="profile-field">

                        <span className="field-label">
                            Role
                        </span>

                        <span className="field-value">
                            Administrator
                        </span>

                    </div>


                    {/* STATUS */}

                    <div className="profile-field">

                        <span className="field-label">
                            Account Status
                        </span>

                        <span className="status-active">
                            Active
                        </span>

                    </div>

                </div>


                {/* =========================
                    ACTIONS
                ========================= */}

                <div className="profile-actions">

                 <button
                    type="button"
                    className="edit-profile-btn"
                    onClick={() =>
                        navigate("/admin/profile/edit")
                    }
                 >
                 Edit Profile
                 </button>

                </div>

            </section>

        </main>
    );
}


export default AdminProfile;