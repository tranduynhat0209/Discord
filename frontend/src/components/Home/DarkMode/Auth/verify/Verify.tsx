import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../../../store";
import { redirect, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { sendVerifyCode } from "../../../../../store/auth";

export const VerifyPage = () => {
  const user = useSelector((s: AppState) => s.auth.user);
  const dispatch = useDispatch();
  const query = new URLSearchParams(useLocation().search);
  const code = query.get("code")?.toString();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();

        if (code) {
          // @ts-ignore
          dispatch(sendVerifyCode(code));
          redirect("/");
        }
      }}
    >
      Verify with code: {code}
    </button>
  );
};
