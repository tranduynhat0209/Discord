import { useEffect } from "react";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./App.scss";
import { ready } from "./store/auth";
import WSListener from "./components/ws-listener";
import fetchEntities from "./store/actions/fetch-entities";
import Account from "./components/Home/DarkMode/UserProfile/Account";
import DarkMode from "./components/Home/DarkMode/DarkMode";
import ChatChanel from "./components/Home/DarkMode/ChatChanel/ChatChanel";
import DMChannel from "./components/Home/DarkMode/DMChannel/DMChannel";
import MainChat from "./components/Home/DarkMode/ChatChanel/MainChat";
import RoleManager from "./components/Home/DarkMode/Roles/RoleManager";
import MemberManager from "./components/Home/DarkMode/MemberManager/MemberManager";
import Signup from "./components/Home/DarkMode/Auth/signup/Signup";
import Login from "./components/Home/DarkMode/Auth/login/Login";
import { AppState } from "./store";
import { Dialog } from "@mui/material";
import { actions } from "./store/ui";
import { VerifyByCode } from "./components/Home/DarkMode/Auth/verify/Verify";
import { SnackbarProvider } from "notistack";
import { Notification } from "./components/Home/DarkMode/Notification/Notification";
import { Welcome } from "./components/Home/DarkMode/Welcome";
import { token } from "./store/utils/rest-headers";

function App() {
  const dispatch = useDispatch();
  const ui = useSelector((state: AppState) => state.ui);
  const user = useSelector((state: AppState) => state.auth.user);
  const t = token();
  useEffect(() => {
    // @ts-ignore
    dispatch(ready());
      // @ts-ignore
      dispatch(fetchEntities());
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <SnackbarProvider>
          <WSListener />
          <Dialog
            open={ui.openVerification === true}
            onClose={() => dispatch(actions.closeVerificationForm())}
          >
            <VerifyByCode />
          </Dialog>
          {ui.openModal && (
            <Dialog
              open={ui.openModal !== undefined}
              onClose={() => dispatch(actions.closeModal())}
            >
              <Notification
                content={ui.openModal!.content}
                variant={ui.openModal!.variant}
              />
            </Dialog>
          )}
          {ui.openUserProfile && (
            <Dialog
              open={ui.openUserProfile !== undefined}
              onClose={() => dispatch(actions.closeUserProfile())}
            >
              <Account/>
            </Dialog>
          )}
          <Routes>
            {!user || !token() ? (
              <Route path="/">
                <Route path="signup" element={<Signup />} />
                <Route path="login" element={<Login />} />
                <Route path="*" element={<Navigate to="login" replace />} />
              </Route>
            ) : (
              <Route path="/" element={<DarkMode />}>
                {ui.activeGuild && (
                  <Route path="" element={<ChatChanel />}>
                    {!ui.activeChannel && (
                      <Route path="members" element={<MemberManager />} />
                    )}
                    {!ui.activeChannel && (
                      <Route path="roles" element={<RoleManager />} />
                    )}
                    <Route path="" element={<MainChat />} />
                    <Route path="*" element={<Navigate to="" replace />} />
                  </Route>
                )}
                {!ui.activeGuild && (
                  <Route>
                    <Route
                      path=""
                      element={
                        ui.openDirectMessage ? <DMChannel /> : <Welcome />
                      }
                    />
                    <Route path="*" element={<Navigate to="" replace />} />
                  </Route>
                )}
              </Route>
            )}
          </Routes>
        </SnackbarProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
