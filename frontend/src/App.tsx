import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ReactDOM } from "react";

import "./App.scss";
import DarkMode from "./components/Home/DarkMode/DarkMode";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <DarkMode />
            </div>
        </BrowserRouter>
    );
}

export default App;
