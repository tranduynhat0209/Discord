import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ReactDOM } from "react";
import { Provider, useDispatch } from "react-redux";

import "./App.scss";
import DarkMode from "./components/Home/DarkMode/DarkMode";
import { Ready } from "./components/Test/Ready";
import { Auth as AuthTest } from "./components/Test/Auth";
import { VerifyPage } from "./components/Home/DarkMode/Auth/verify/Verify";
import { ready } from "./store/auth";
import WSListener from "./components/ws-listener";
import { Me } from "./components/Test/Me";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // @ts-ignore
    dispatch(ready());
  }, []);
  return (
    <BrowserRouter>
      <WSListener />
      <Routes>
        <Route path="/test-auth" element={<AuthTest />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="me" element={<Me />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
