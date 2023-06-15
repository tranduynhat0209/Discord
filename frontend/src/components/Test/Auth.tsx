import { useDispatch, useSelector } from "react-redux";
import {
  changePassword,
  forgotPasswordEmail,
  loginUser,
  ready,
  registerUser,
} from "../../store/auth";
import { useState } from "react";
import { AppState } from "../../store";

export function Auth() {
  const [userInfo, setUserInfo] = useState({
    // const index = Math.floor(Math.random() * 1000000);

    email: "nhatducmo@gmail.com",
    username: "Tran Duy Nhat",
    password: "W673udWHS0Ipspuv",
  });
  const user = useSelector((state: AppState) => state.auth.user);

  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            //@ts-ignore
            dispatch(registerUser(userInfo));
          }}
        >
          Register
        </button>
      </div>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();

            dispatch(
              //@ts-ignore
              loginUser({
                email: userInfo.email,
                password: userInfo.password,
              })
            );
          }}
        >
          Log in
        </button>
      </div>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            //@ts-ignore
            dispatch(forgotPasswordEmail(userInfo.email));
          }}
        >
          Forgot Password
        </button>
      </div>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            //@ts-ignore
            dispatch(changePassword(userInfo.password, "abcdefgh"));
          }}
        >
          Change Password
        </button>
      </div>
      <div>{JSON.stringify(user)}</div>
      
    </div>
  );
}
