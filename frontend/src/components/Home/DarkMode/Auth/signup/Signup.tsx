import "./Signup.scss";
import signupBackground from "../../../../../assets/image/login/login.png";
import useHideLogin from "../login/useHideLogin";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../../../store/auth";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
const initState = {
  email: "",
  password: "",
  username: "",
};
const Signup = () => {
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
                <h1>Register new account</h1>
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
                  <label htmlFor="login-name">User name</label>
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
                  <label htmlFor="password">Password</label>
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
                    Register
                  </button>
                </div>
                <Link to="/login">
                  <span className="have-account">Already have an account?</span>
                </Link>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
