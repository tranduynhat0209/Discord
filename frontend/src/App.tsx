import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ReactDOM } from "react";
import Login from "./components/Home/DarkMode/login/Login";

import "./App.scss";
import DarkMode from "./components/Home/DarkMode/DarkMode";
import Signup from "./components/Home/DarkMode/signup/Signup";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                {/* <DarkMode /> */}
                {/* <Login /> */}
                <Signup />
            </div>
        </BrowserRouter>
    );
}

export default App;
