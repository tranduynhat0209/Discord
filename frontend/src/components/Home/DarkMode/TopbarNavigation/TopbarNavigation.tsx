import React from "react";

import Conversation from "./Conversation";
import Navigation from "./Navigation";

import "./TopbarNavigation.scss";

export default function TopbarNavigation() {
    return (
        <div className="top-nav">
            <div className="conversation">
                <Conversation />
            </div>
            <div className="navigation">
                <Navigation />
            </div>
        </div>
    );
}
