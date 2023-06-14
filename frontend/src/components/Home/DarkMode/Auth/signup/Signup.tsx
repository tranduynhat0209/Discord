import "./Signup.scss";
import signupBackground from "../../../../assets/image/login/login.png";
import useHideLogin from "../login/useHideLogin";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../../../store/auth";
const Signup = () => {
  const dispatch = useDispatch();
  const showLogin = () => {
    // nagvigate to login page
  };

  // const { handleShowLogin } = useHideLogin();
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
                  <input type="text" id="email" />
                </div>
                <div className="group">
                  <label htmlFor="login-name">Ten dang nhap</label>
                  <input type="text" id="login-name" />
                </div>
                <div className="group">
                  <label htmlFor="password">Mat khau</label>
                  <input type="password" id="password" />
                </div>
                <div className="birthday">
                  <p>Ngay sinh</p>
                  <div className="input-birthday">
                    <input type="text" placeholder="Ngay" />
                    <input type="text" placeholder="Thang" />
                    <input type="text" placeholder="Nam" />
                  </div>
                </div>
                <div className="checkbox">
                  <input type="checkbox" id="checkbox" />
                  <label htmlFor="checkbox">
                    (Không bắt buộc) Chấp nhận email thông báo về cập nhật của
                    Discord, các mẹo cũng như ưu đãi đặc biệt. Bạn có thể bỏ tùy
                    chọn này bất cứ lúc nào.
                  </label>
                </div>
                <div className="signup-button">
                  <button
                    type="submit"
                    className=""
                    onClick={(event) => {
                      event.preventDefault();
                      dispatch(
                        // @ts-ignore
                        registerUser({
                          username: "Tran Duy Nhat",
                          email: "abc33336@gmail.com",
                          password: "0xnhattranduy",
                        })
                      );
                    }}
                  >
                    Tiep tuc
                  </button>
                </div>
                <span className="have-account" onClick={showLogin}>
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
