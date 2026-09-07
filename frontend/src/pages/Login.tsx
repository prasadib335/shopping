import { Link, useNavigate } from "react-router";
import '../styles/login.css';
import { useState } from "react";
import type { LoginRequest } from "../types/User";
import { userLogin } from "../api/userApi";

function Login() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState<LoginRequest>({
             email : "",
             password : ""
    });

    async function handleSubmit(
            event: React.FormEvent<HTMLFormElement>
    ) {
           event.preventDefault();

           try {
                 const response = await userLogin(formData);

                 alert("Welcome back! You’re now signed in.");

                 navigate('/products');

           }catch(error) {
             
                alert("Login failed. Please check your email and password.");

                console.log("something went wrong ",error);
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

                        <button type="submit">
                            Sign in
                        </button>

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
