import { Link, useNavigate } from "react-router";
import "../styles/register.css";
import { useState } from "react";
import { userRegistration } from "../api/userApi";
import type { RegisterUser } from "../types/User";

function Register() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState<RegisterUser>({
            name : "",
            email : "",
            password : ""
    });

    async function handleSubmit(
        event : React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();
             try {
                 const response = await userRegistration(formData);

                 alert("Your account has been created successfully.");

                 navigate('/');

                 console.log(response);
             }catch(error) {
                  console.log("something went wrong ",error);
             }
    }
    return (
        <div className="register-page">
            <div className="register-container">

                <div className="register-logo">
                    <span>amazon</span>
                </div>

                <div className="register-card">
                    <h1>Create account</h1>

                    <form action="" method="POST" onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label htmlFor="username">
                                Your name
                            </label>

                            <input
                                type="text"
                                id="username"
                                name="name"
                                placeholder="First and last name"
                                required


                                onChange={(e)=> {
                                     return setFormData({
                                         ...formData,
                                         name : e.target.value
                                     });
                                }}  
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">
                                Email
                            </label>

                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
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
                                placeholder="At least 6 characters"
                                required

                                onChange={(e)=> {
                                      return setFormData({
                                           ...formData,
                                           password : e.target.value
                                      });
                                }}
                            />

                            <p className="password-hint">
                                Passwords must be at least 6 characters.
                            </p>
                        </div>

                        <button type="submit">
                            Create your account
                        </button>

                    </form>

                    <p className="terms">
                        By creating an account, you agree to our
                        <a href="#"> Conditions of Use</a> and
                        <a href="#"> Privacy Notice</a>.
                    </p>

                    <div className="login-section">
                        Already have an account?
                        <span><Link to='/'>Sign in</Link></span>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Register;
