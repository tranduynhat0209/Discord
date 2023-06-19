import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../../../store";
import { redirect, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { sendVerifyCode } from "../../../../../store/auth";
import "./Verify.scss";
import { actions } from "../../../../../store/ui";

export const VerifyByCode = () => {
  const dispatch = useDispatch();
  const [code, setCode] = useState<string>("");

  return (
    <div className="verification-form">
      <div className="title">
        <h1>Verify by code:</h1>{" "}
      </div>
      <div className="content">
        <div>
          <input
            type="text"
            className="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <button
          className="verify-button"
          onClick={(e) => {
            e.preventDefault();

            if (code) {
              // @ts-ignores
              dispatch(sendVerifyCode(code));
              dispatch(actions.closeVerificationForm());
              redirect("/main");
            }
          }}
        >
          Verify
        </button>
      </div>
    </div>
  );
};
