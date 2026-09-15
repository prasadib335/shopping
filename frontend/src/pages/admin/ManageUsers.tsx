import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link} from "react-router";

import type { AppDispatch, RootState } from "../../store";
import '../../styles/manageUsers.css';

import {
    fetchUsers,
    deactivateUserData,
    activateUserData,
    removeUser
} from "../../thunks/userThunk";


function ManageUsers() {

    const dispatch = useDispatch<AppDispatch>();



    // --------------------------------
    // GET USERS FROM REDUX
    // --------------------------------

    const {
        users,
        loading,
        error
    } = useSelector(
        (state: RootState) => state.user
    );


    // --------------------------------
    // FETCH USERS
    // --------------------------------

    useEffect(() => {

        console.log("page gets rendered");

        dispatch(fetchUsers());

    }, [dispatch]);


    // --------------------------------
    // DEACTIVATE USER
    // --------------------------------

    async function handleDeactivate(userId: number) {

        const confirmed = window.confirm(
            "Are you sure you want to deactivate this user?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await dispatch(
                deactivateUserData(userId)
            ).unwrap();

            // Get fresh users from backend
            dispatch(fetchUsers());

        } catch (error) {

            console.error(
                "Unable to deactivate user:",
                error
            );

        }
    }


    // --------------------------------
    // ACTIVATE USER
    // --------------------------------

    async function handleActivate(userId: number) {

        try {

            await dispatch(
                activateUserData(userId)
            ).unwrap();

            // Get fresh users from backend
            dispatch(fetchUsers());

        } catch (error) {

            console.error(
                "Unable to activate user:",
                error
            );

        }
    }


    // --------------------------------
    // DELETE USER
    // --------------------------------

    async function handleDelete(userId: number) {

        const confirmed = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await dispatch(
                removeUser(userId)
            ).unwrap();

            // Get fresh users from backend
            dispatch(fetchUsers());

        } catch (error) {

            console.error(
                "Unable to delete user:",
                error
            );

        }
    }


    // --------------------------------
    // LOADING
    // --------------------------------

    if (loading && users.length === 0) {

        return (
            <main>

                <h1>Manage Users</h1>

                <p>Loading users...</p>

            </main>
        );

    }


    return (

        <main className="manage-users">


            {/* =========================
                HEADER
            ========================= */}

            <header className="page-header">

                <div>

                    <h1>
                        Manage Users
                    </h1>

                    <p>
                        View and manage registered users.
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

                <p role="alert">

                    {error}

                </p>

            )}


            {/* =========================
                USER COUNT
            ========================= */}

            <section className="user-summary">

                <div>

                    <strong>
                        {users.length}
                    </strong>

                    <span>
                        Total Users
                    </span>

                </div>


                <div>

                    <strong>
                        {
                            users.filter(
                                (user) => user.active
                            ).length
                        }
                    </strong>

                    <span>
                        Active Users
                    </span>

                </div>


                <div>

                    <strong>
                        {
                            users.filter(
                                (user) => !user.active
                            ).length
                        }
                    </strong>

                    <span>
                        Inactive Users
                    </span>

                </div>

            </section>


            {/* =========================
                USERS TABLE
            ========================= */}

            <section className="users-card">


                <div className="card-header">

                    <div>

                        <h2>
                            Users
                        </h2>

                        <p>
                            All registered users
                        </p>

                    </div>

                </div>


                {users.length === 0 ? (

                    <p>
                        No users found.
                    </p>

                ) : (

                    <div className="users-table">


                        {/* TABLE HEADER */}

                        <div className="user-row user-heading">

                            <span>
                                ID
                            </span>

                            <span>
                                Name
                            </span>

                            <span>
                                Email
                            </span>

                            <span>
                                Role
                            </span>

                            <span>
                                Status
                            </span>

                            <span>
                                Created
                            </span>

                            <span>
                                Actions
                            </span>

                        </div>


                        {/* USERS */}

                        {users.map((user) => (

                            <div
                                className="user-row"
                                key={user.userId}
                            >


                                {/* ID */}

                                <span>
                                    #{user.userId}
                                </span>


                                {/* NAME */}

                                <span>
                                    {user.name}
                                </span>


                                {/* EMAIL */}

                                <span>
                                    {user.email}
                                </span>


                                {/* ROLE */}

                                <span>
                                    {user.role}
                                </span>


                                {/* STATUS */}

                                <span>

                                    {user.active ? (
                                        <span className="status active">
                                            Active
                                        </span>
                                    ) : (
                                        <span className="status inactive">
                                            Inactive
                                        </span>
                                    )}

                                </span>


                                {/* CREATED DATE */}

                                <span>

                                    {new Date(
                                        user.createdAt
                                    ).toLocaleDateString("en-IN")}

                                </span>


                                {/* ACTIONS */}

                                <span className="user-actions">

                                    {/* ACTIVATE / DEACTIVATE */}

                                    {user.active ? (

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDeactivate(
                                                    user.userId
                                                )
                                            }
                                        >
                                            Deactivate
                                        </button>

                                    ) : (

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleActivate(
                                                    user.userId
                                                )
                                            }
                                        >
                                            Activate
                                        </button>

                                    )}


                                    {/* DELETE */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDelete(
                                                user.userId
                                            )
                                        }
                                    >
                                        Delete
                                    </button>


                                </span>

                            </div>

                        ))}

                    </div>

                )}

            </section>

        </main>
    );
}


export default ManageUsers;

