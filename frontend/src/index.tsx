import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { Provider } from "react-redux";
import configureStore from "./store/configure-store";
const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
const store = configureStore();
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
