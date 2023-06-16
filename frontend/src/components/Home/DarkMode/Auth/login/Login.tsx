import loginBackground from "../../../../../assets/image/login/login.png";
import "./Login.scss";
// import useHideLogin from "./useHideLogin";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { forgotPasswordEmail, loginUser } from "../../../../../store/auth";
import { AppState } from "../../../../../store";
const Login = ({ hideLogin }) => {
    const dispatch = useDispatch();
    const [loginData, setLoginData] = useState({
        email: "abc",
        password: "1234",
    });
    const handelLogin = () => {
        console.log(loginData);
        //@ts-ignore
        dispatch(loginUser(loginData));
    };
    const handleForgotPassword = () => {
        //@ts-ignore
        dispatch(forgotPasswordEmail(loginData.email));
    };
    const data = useSelector((state: AppState) => state);
    return (
        <div className="login-container">
            <div className="main-login">
                <div className="background">
                    <img src={loginBackground} alt="" />
                    <div className="wrap-login-form">
                        <form className="login-form">
                            <div className="title">
                                <h1>Chao mung tro lai</h1>
                                <span>Rat vui mung khi duoc gap lai ban</span>
                            </div>
                            <div className="user">
                                <div className="group">
                                    <label htmlFor="login-email">
                                        Email hoac so dien thoai<span>*</span>
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
                                        Mat khau<span>*</span>
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
                                    onClick={handleForgotPassword}
                                >
                                    Quen mat khau?
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
                                            handelLogin();
                                            console.log(data);
                                        }
                                    }}
                                >
                                    Dang nhap
                                </button>
                                <div className="need-account">
                                    <span>Can mot tai khoan? </span>
                                    <button type="button" onClick={hideLogin}>
                                        Dang ky
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className="qr-code">
                            <div className="qr"></div>
                            <h1 className="title">Dang nhap bang Ma QR</h1>
                            <p>
                                Quet bang <b>ung dung di dong Discord</b> de
                                dang nhap tuc thi.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
