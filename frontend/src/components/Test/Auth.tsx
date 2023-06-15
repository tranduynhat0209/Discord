import { useDispatch, useSelector } from "react-redux";
import {
  changePassword,
  forgotPasswordEmail,
  loginUser,
  logoutUser,
  ready,
  registerUser,
} from "../../store/auth";
import { useState } from "react";
import { AppState } from "../../store";

export function Auth() {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [newPassword, setNewPassword] = useState<string>();
  const [email, setEmail] = useState<string>();

  const user = useSelector((state: AppState) => state.auth.user);

  const dispatch = useDispatch();
  return (
    <div>
      <p>Username</p>
      <input
        type="text"
        onChange={(e) => {
          e.preventDefault();
          setUsername(e.target.value);
        }}
      />

      <p>Email</p>
      <input
        type="text"
        onChange={(e) => {
          e.preventDefault();
          setEmail(e.target.value);
        }}
      />

      <p>Password</p>
      <input
        type="text"
        onChange={(e) => {
          e.preventDefault();
          setPassword(e.target.value);
        }}
      />
      <div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              //@ts-ignore
              dispatch(registerUser({ email, username, password }));
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
                  email,
                  password,
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
              dispatch(forgotPasswordEmail(email));
            }}
          >
            Forgot Password
          </button>
        </div>
        <div>
          <p>New Password</p>
          <input
            type="text"
            onChange={(e) => {
              e.preventDefault();
              setNewPassword(e.target.value);
            }}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              //@ts-ignore
              dispatch(changePassword(password, newPassword));
            }}
          >
            Change Password
          </button>
        </div>
        <div>{JSON.stringify(user)}</div>

        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              // @ts-ignore
              dispatch(logoutUser());
            }}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
