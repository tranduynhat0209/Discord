import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ReactDOM } from "react";
import { Provider } from "react-redux";

import "./App.scss";
import DarkMode from "./components/Home/DarkMode/DarkMode";
import configureStore from "./store/configure-store";
import Signup from "./components/Home/DarkMode/signup/Signup";

function App() {
    return (
        <Provider store={configureStore()}>
        <BrowserRouter>
            <div className="App">
                <Signup/>
            </div>
        </BrowserRouter>
        </Provider>
    );
}

export default App;
