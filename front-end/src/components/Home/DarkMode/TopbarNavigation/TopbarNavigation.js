import React from "react";

import Conversation from "./Conversation";
import Navigation from "./Navigation";

import "../../../../style/scss/DarkMode/TopbarNavigation/TopbarNavigation.scss";

export default class TopbarNavigation extends React.Component {
    render() {
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
}
