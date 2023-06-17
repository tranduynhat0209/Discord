import "./Signup.scss";
import signupBackground from "../../../../../assets/image/login/login.png";
import useHideLogin from "../login/useHideLogin";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../../../store/auth";
import { ChangeEvent, useState } from "react";
const initState = {
    email: "",
    password: "",
    username: "",
};
const Signup = ({ showLogin }) => {
    const dispatch = useDispatch();
    const [dataRegister, setDataRegister] = useState(initState);

    const handleSignup = () => {
        console.log(dataRegister);
        dispatch(
            //@ts-ignore
            registerUser({
                email: dataRegister.email,
                username: dataRegister.username,
                password: dataRegister.password,
            })
        );
        setDataRegister(initState);
    };
    return (
        <div className="signup-container">
            <div className="main-signup">
                <div className="wrap-signup-form">
                    <div className="main-background">
                        <img src={signupBackground} alt="" />
                        <form className="signup-form">
                            <div className="header">
                                <h1>Tao tai khoan</h1>
                            </div>
                            <div className="main-info">
                                <div className="group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="text"
                                        id="email"
                                        value={dataRegister.email}
                                        onChange={(event) =>
                                            setDataRegister({
                                                ...dataRegister,
                                                email: event.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="group">
                                    <label htmlFor="login-name">
                                        Ten dang nhap
                                    </label>
                                    <input
                                        type="text"
                                        id="login-name"
                                        value={dataRegister.username}
                                        onChange={(event) =>
                                            setDataRegister({
                                                ...dataRegister,
                                                username: event.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="group">
                                    <label htmlFor="password">Mat khau</label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={dataRegister.password}
                                        onChange={(event) =>
                                            setDataRegister({
                                                ...dataRegister,
                                                password: event.target.value,
                                            })
                                        }
                                    />
                                </div>

                                <div className="signup-button">
                                    <button
                                        type="submit"
                                        className=""
                                        onClick={(event) => {
                                            event.preventDefault();
                                            handleSignup();
                                        }}
                                    >
                                        Tiep tuc
                                    </button>
                                </div>
                                <span
                                    className="have-account"
                                    onClick={showLogin}
                                >
                                    Da co tai khoan
                                </span>
                            </div>
                            <p className="footer">
                                Khi nhấn nút đăng ký, nghĩa là bạn đã đồng ý với{" "}
                                <a href="/">Dieu khoan dich vu</a> va{" "}
                                <a href="/">Chinh sach bao mat </a>cua Discord
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
