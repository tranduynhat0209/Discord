import React from "react";

import DirectMessages from "./DirectMessages";
import HomeNavigation from "./HomeNavigation";
import UserProfile from "../UserProfile/UserProfile";

import "./DirectMessagesAndNavigation.scss";

export default function DirectMessagesAndNavigation() {
    return (
        <div className="main-nav">
            <HomeNavigation />
            <DirectMessages />
            <UserProfile />
        </div>
    );
}
