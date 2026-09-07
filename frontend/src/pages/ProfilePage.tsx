import { useEffect, useState } from "react";
import { getUser, updateUser} from "../api/userApi";
import type { User, RegisterUser } from "../types/User";
import "../styles/user.css";

function ProfilePage() {

    const [user, setUser] = useState<User | null>(null);

    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState<RegisterUser>({
        name: "",
        email: "",
        password: ""
    });

    async function userData() {
        try {
            const response = await getUser(1);

            setUser(response);

            setFormData({
                name: response.name,
                email: response.email,
                password: ""
            });

        } catch (error) {
            console.log("Something went wrong", error);
        }
    }

    useEffect(() => {
        userData();
    }, []);

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    async function handleUpdate(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        try {

            await updateUser(1,formData);

            alert("Your profile has been updated successfully!");

            setIsEditing(false);

            await getUser(1);
        } catch (error) {

            alert("Unable to update your profile.");

            console.log("Something went wrong", error);
        }
    }

    if (user === null) {
        return (
            <div className="user-loading">
                Loading profile...
            </div>
        );
    }

    return (
        <div className="user-page">

            <div className="user-header">
                <h1>Your Account</h1>
                <p>Manage your personal information</p>
            </div>

            <div className="user-card">

                <div className="user-avatar">
                    {user.name.charAt(0).toUpperCase()}
                </div>

                {!isEditing ? (

                    <div className="user-info">

                        <h2>{user.name}</h2>

                        <div className="user-detail">
                            <span className="detail-label">
                                Email
                            </span>

                            <span className="detail-value">
                                {user.email}
                            </span>
                        </div>

                        <div className="user-detail">
                            <span className="detail-label">
                                Role
                            </span>

                            <span className="detail-value">
                                {user.role}
                            </span>
                        </div>

                        <div className="user-detail">
                            <span className="detail-label">
                                Account status
                            </span>

                            <span
                                className={
                                    user.active
                                        ? "status active"
                                        : "status inactive"
                                }
                            >
                                {user.active ? "Active" : "Inactive"}
                            </span>
                        </div>

                        <button
                            className="edit-profile-button"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Profile
                        </button>

                    </div>

                ) : (

                    <form
                        className="edit-profile-form"
                        onSubmit={handleUpdate}
                    >

                        <h2>Edit Profile</h2>

                        <div className="edit-form-group">

                            <label htmlFor="name">
                                Name
                            </label>

                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="edit-form-group">

                            <label htmlFor="email">
                                Email
                            </label>

                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="edit-form-group">

                            <label htmlFor="password">
                                New Password
                            </label>

                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter new password"
                                required
                            />

                        </div>

                        <div className="edit-actions">

                            <button
                                type="submit"
                                className="save-button"
                            >
                                Save Changes
                            </button>

                            <button
                                type="button"
                                className="cancel-button"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                )}

            </div>

        </div>
    );
}

export default ProfilePage;
