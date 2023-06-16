import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import "./Login.scss";
import loginBackground from "../../../../../assets/image/login/login.png";
// import { actions } from "../../../../../store/api";
import { AppState } from "../../../../../store";
import { loginUser, forgotPasswordEmail } from "../../../../../store/auth";
const Login = ({ hideLogin }) => {
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
                                    onClick={(event) => {
                                        event.preventDefault();
                                        dispatch(
                                            //@ts-ignore
                                            forgotPasswordEmail(loginData.email)
                                        );
                                    }}
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
                                            dispatch(
                                                //@ts-ignore
                                                loginUser(loginData)
                                            );
                                            console.log(JSON.stringify(data));
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
