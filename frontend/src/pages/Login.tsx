import { Link, useNavigate } from "react-router";
import '../styles/login.css';
import { useState } from "react";
import axios from "axios";
import type { LoginRequest } from "../types/User";
import { userLogin } from "../api/userApi";

function Login() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState<LoginRequest>({
             email : "",
             password : ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
) {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
        const response = await userLogin({
            email: formData.email.trim(),
            password: formData.password
        });

        console.log("Login response:", response);

        alert("Welcome back! You’re now signed in.");

        navigate("/products");
    } catch (error) {
        const message = axios.isAxiosError(error) && typeof error.response?.data === "string"
            ? error.response.data
            : "Login failed. Please check your email and password.";

        setErrorMessage(message);
    } finally {
        setIsSubmitting(false);
    }
}
    return (
        <div className="login-page">
            <div className="login-container">

                <div className="login-logo">
                    <span>amazon</span>
                </div>

                <div className="login-card">

                    <h1>Sign in</h1>

                    <form method="POST" onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label htmlFor="email">
                                Email
                            </label>

                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                required

                                onChange={(e)=> {
                                   return setFormData({
                                        ...formData,
                                        email : e.target.value
                                    });
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">
                                Password
                            </label>

                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                required

                                 onChange={(e)=> {
                                   return setFormData({
                                        ...formData,
                                        password : e.target.value
                                    });
                                }}
                            />
                        </div>

                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Signing in..." : "Sign in"}
                        </button>

                        {errorMessage && (
                            <p role="alert" className="login-error">
                                {errorMessage}
                            </p>
                        )}

                    </form>

                    <p className="terms">
                        By continuing, you agree to our
                        <a href="#"> Conditions of Use</a> and
                        <a href="#"> Privacy Notice</a>.
                    </p>

                    <div className="register-section">
                        <span>New to our store?</span>

                        <Link to="/register">
                            Create your account
                        </Link>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Login;
