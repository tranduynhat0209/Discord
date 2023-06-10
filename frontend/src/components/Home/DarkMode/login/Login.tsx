import loginBackground from "../../../../assets/image/login/login.png";
import "./Login.scss";
const Login = () => {
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
                                    <input type="text" id="login-email" />
                                </div>
                                <div className="group">
                                    <label htmlFor="password">
                                        Mat khau<span>*</span>
                                    </label>
                                    <input type="text" id="password" />
                                </div>
                                <button
                                    type="button"
                                    className="forgot-password"
                                >
                                    Quen mat khau?
                                </button>
                                <button type="submit" className="login-button">
                                    Dang nhap
                                </button>
                                <div className="need-account">
                                    <span>Can mot tai khoan? </span>
                                    <button type="button">Dang ky</button>
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
