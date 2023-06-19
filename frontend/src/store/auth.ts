import { REST, WS } from "../types";
import { createSlice } from "@reduxjs/toolkit";
import { actions as api } from "./api";
import { actions as ui } from "./ui";
import { token } from "./utils/rest-headers";
import { Action, AppState } from ".";

const slice = createSlice({
  name: "auth",
  initialState: {
    attemptedLogin: false,
    shouldVerify: false,
  } as AppState["auth"],
  reducers: {
    ready: (auth, { payload }: Action<WS.Args.Ready>) => {
      auth.user = payload.user;
    },
    updatedUser: (auth, { payload }: Action<WS.Args.UserUpdate>) => {
      Object.assign(auth.user, payload.partialUser);
    },
    loggedInAttempted: (auth) => {
      auth.attemptedLogin = true;
    },
    loggedOut: (auth) => {
      delete auth.user;
      auth.attemptedLogin = false;
      auth.shouldVerify = false;
    },
    shouldVerify: (auth) => {
      auth.shouldVerify = true;
    },
  },
});

export const actions = slice.actions;
export default slice.reducer;

export const ready = () => (dispatch, getState: () => AppState) => {
  if (getState().auth.user || !token()) return;

  dispatch(
    api.wsCallBegan({
      event: "READY",
      data: { token: token() } as WS.Params.Ready,
    })
  );
};

// handle side effects here
export const loginUser =
  (data: REST.Params.Post["/auth/login"]) => (dispatch) => {
    dispatch(
      api.restCallBegan({
        onSuccess: [],
        method: "post",
        data,
        url: `/auth/login`,
        callback: (payload) => {
          dispatch(actions.loggedInAttempted());

          if (payload.token) {
            localStorage.setItem("token", payload.token);
            dispatch(ready());
          }
          if (payload.message) {
            dispatch(actions.shouldVerify());
            dispatch(ui.openVerificationForm());
          }
        },
        errorCallback: (payload) => {
          dispatch(actions.loggedInAttempted());
          dispatch(
            ui.openModal({ content: payload.message, variant: "error" })
          );
        },
      })
    );
  };

export const forgotPasswordEmail = (email: string) => (dispatch) => {
  if (!email) return;

  dispatch(
    api.restCallBegan({
      callback: () => dispatch(ui.openVerificationForm()),
      url: `/auth/email/forgot-password?email=${email}`,
    })
  );
};

export const logoutUser = () => (dispatch) => {
  dispatch(actions.loggedOut());
  localStorage.removeItem("token");
};

export const registerUser =
  (data: REST.Params.Post["/auth/register"]) => (dispatch) => {
    dispatch(
      api.restCallBegan({
        onSuccess: [actions.loggedInAttempted.type],
        method: "post",
        data,
        url: `/auth/register`,
        callback: (payload) => {
          dispatch(ui.openVerificationForm());
        },
      })
    );
  };
export const sendVerifyCode = (code: string) => (dispatch) => {
  dispatch(
    api.restCallBegan({
      onSuccess: [],
      url: `/auth/verify?code=${code}`,
      callback: ({ message, token }: REST.Return.Get["/auth/verify"]) => {
        if (message)
          dispatch(ui.openModal({ content: message, variant: "info" }));
        if (token) {
          dispatch(
            ui.openModal({ content: "Verify successfully", variant: "info" })
          );
          localStorage.setItem("token", token);
          dispatch(ready());
        }
      },
    })
  );
};

export const changePassword =
  (oldPassword: string, newPassword: string) =>
  (dispatch, getState: () => AppState) => {
    const user = getState().auth.user!;

    dispatch(
      api.restCallBegan({
        onSuccess: [],
        method: "post",
        url: `/auth/change-password`,
        data: { email: user.email, oldPassword, newPassword },
        callback: ({
          message,
          token,
        }: REST.Return.Post["/auth/change-password"]) => {
          if (message)
            dispatch(ui.openModal({ content: message, variant: "info" }));
          if (token) localStorage.setItem("token", token);
        },
      })
    );
  };
