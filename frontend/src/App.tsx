import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ReactDOM } from "react";
import { Provider } from "react-redux";

import "./App.scss";
import DarkMode from "./components/Home/DarkMode/DarkMode";
import configureStore from "./store/configure-store";
import { Ready } from "./components/Test/Ready";
import { Auth as AuthTest } from "./components/Test/Auth";
import { VerifyPage } from "./components/Home/DarkMode/Auth/verify/Verify";

function App() {
  return (
    <Provider store={configureStore()}>
      <BrowserRouter>
        <Routes>
          <Route path="/test-auth" element={<AuthTest />} />
          <Route path="/verify" element={<VerifyPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
