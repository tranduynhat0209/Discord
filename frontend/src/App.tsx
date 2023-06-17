import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Home/DarkMode/Auth/login/Login";
import DarkMode from "./components/Home/DarkMode/DarkMode";
import Signup from "./components/Home/DarkMode/Auth/signup/Signup";
import useHideLogin from "./components/Home/DarkMode/Auth/login/useHideLogin";
import ConfigRoles from "./components/Home/DarkMode/ConfigRoles/ConfigRoles";
import { VerifyPage } from "./components/Home/DarkMode/Auth/verify/Verify";
import { Auth as AuthTest } from "./components/Home/Test/Auth";
import { Me } from "./components/Home/Test/Me";
import "./App.scss";
import useShowHideRoles from "./components/Home/DarkMode/ConfigRoles/useShowHideRoles";
import Account from "./components/Home/DarkMode/UserProfile/Account";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { ready } from "./store/auth";
import fetchEntities from "./store/actions/fetch-entities";
import WSListener from "./components/ws-listener";

function App() {
    const { hideLogin, handleHideLogin, handleShowLogin } = useHideLogin();
    const { showRole } = useShowHideRoles();
    const dispatch = useDispatch();
    useEffect(() => {
        // @ts-ignore
        dispatch(ready());
        // @ts-ignore
        dispatch(fetchEntities());
    }, []);
    return (
        <BrowserRouter>
            <WSListener />

            <div className="App">
                <Routes>
                    <Route
                        path="*"
                        element={
                            <>
                                {/* <DarkMode /> */}
                                {/* {hideLogin ? (
                                    <Signup showLogin={handleShowLogin} />
                                ) : (
                                    <Login hideLogin={handleHideLogin} />
                                )} */}
                                {/* <ConfigRoles /> */}
                                <Account />
                            </>
                        }
                    />
                    <Route path="/test-auth" element={<AuthTest />} />
                    <Route path="/verify" element={<VerifyPage />} />
                    <Route path="/me" element={<Me />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
