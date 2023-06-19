import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import "./Login.scss";
import loginBackground from "../../../../../assets/image/login/login.png";
// import { actions } from "../../../../../store/api";
import { AppState } from "../../../../../store";
import { loginUser, forgotPasswordEmail } from "../../../../../store/auth";
import { Link } from "react-router-dom";
const Login = () => {
    const dispatch = useDispatch();
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const data = useSelector((state: AppState) => state);
    return (
        <div className="login-container">
            <div className="main-login">
                <div className="background">
                    <img src={loginBackground} alt="" />
                    <div className="wrap-login-form">
                        <form className="login-form">
                            <div className="title">
                                <h1>Welcome back!</h1>
                                
                            </div>
                            <div className="user">
                                <div className="group">
                                    <label htmlFor="login-email">
                                        Email<span>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="login-email"
                                        onChange={(event) =>
                                            setLoginData({
                                                ...loginData,
                                                email: event.target.value,
                                            })
                                        }
                                        value={loginData.email}
                                    />
                                </div>
                                <div className="group">
                                    <label htmlFor="password">
                                        Password<span>*</span>
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        onChange={(event) =>
                                            setLoginData({
                                                ...loginData,
                                                password: event.target.value,
                                            })
                                        }
                                        value={loginData.password}
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="forgot-password"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        dispatch(
                                            //@ts-ignore
                                            forgotPasswordEmail(loginData.email)
                                        );
                                    }}
                                >
                                    Forgot Password?
                                </button>
                                <button
                                    type="submit"
                                    className="login-button"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        if (
                                            !loginData.email ||
                                            !loginData.password
                                        ) {
                                            console.log("loi");
                                            return;
                                        } else {
                                            dispatch(
                                                //@ts-ignore
                                                loginUser(loginData)
                                            );
                                            console.log(JSON.stringify(data));
                                        }
                                    }}
                                >
                                    Login
                                </button>
                                <div className="need-account">
                                    <span>Haven't had an account yet? </span>
                                    <Link to="/signup">
                                    <button type="button">
                                        Sign up
                                    </button>
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
