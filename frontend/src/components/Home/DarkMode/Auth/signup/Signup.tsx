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
    isChecked: false,
    day: "",
    month: "",
    year: "",
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
                                <div className="birthday">
                                    <p>Ngay sinh</p>
                                    <div className="input-birthday">
                                        <input
                                            type="text"
                                            placeholder="Ngay"
                                            value={dataRegister.day}
                                            onChange={(event) =>
                                                setDataRegister({
                                                    ...dataRegister,
                                                    day: event.target.value,
                                                })
                                            }
                                        />
                                        <input
                                            type="text"
                                            placeholder="Thang"
                                            value={dataRegister.month}
                                            onChange={(event) =>
                                                setDataRegister({
                                                    ...dataRegister,
                                                    month: event.target.value,
                                                })
                                            }
                                        />
                                        <input
                                            type="text"
                                            placeholder="Nam"
                                            value={dataRegister.year}
                                            onChange={(event) =>
                                                setDataRegister({
                                                    ...dataRegister,
                                                    year: event.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="checkbox">
                                    <input
                                        type="checkbox"
                                        id="checkbox"
                                        checked={dataRegister.isChecked}
                                        onChange={(
                                            event: ChangeEvent<HTMLInputElement>
                                        ) =>
                                            setDataRegister({
                                                ...dataRegister,
                                                isChecked: event.target.checked,
                                            })
                                        }
                                    />
                                    <label htmlFor="checkbox">
                                        (Không bắt buộc) Chấp nhận email thông
                                        báo về cập nhật của Discord, các mẹo
                                        cũng như ưu đãi đặc biệt. Bạn có thể bỏ
                                        tùy chọn này bất cứ lúc nào.
                                    </label>
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
