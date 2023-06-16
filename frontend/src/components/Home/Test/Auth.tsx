import { useDispatch } from "react-redux";
import {
    changePassword,
    forgotPasswordEmail,
    loginUser,
    ready,
    registerUser,
} from "../../../store/auth";
import { useState } from "react";
import { AppState } from "../../../store";
import { useSelector } from "react-redux";

export function Auth() {
    const [userInfo, setUserInfo] = useState({
        // const index = Math.floor(Math.random() * 1000000);

        email: "nhatducmo@gmail.com",
        username: "Tran Duy Nhat",
        password: "l38QVUS8u7cx8fVH",
    });
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
                        dispatch(changePassword(userInfo.password, "abcd"));
                        setUserInfo((prev) => {
                            return {
                                ...prev,
                                password: "abcd",
                            };
                        });
                    }}
                >
                    Change Password
                </button>
            </div>
        </div>
    );
}
