import React from "react";

import DirectMessages from "./DirectMessages";
import HomeNavigation from "./HomeNavigation";
import UserProfile from "../UserProfile/UserProfile";

import "../../../../style/scss/DarkMode/DirectMessagesAndNavigation/DirectMessagesAndNavigation.scss";

export default class DirectMessagesAndNavigation extends React.Component {
    render() {
        return (
            <div className="main-nav">
                <HomeNavigation />
                <DirectMessages />
                <UserProfile />
            </div>
        );
    }
}
