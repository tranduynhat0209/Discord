import React from "react";

import UserInfo from "./UserInfo";
import Interactions from "./Interactions";

import "../../../../style/scss/DarkMode/UserProfile/UserProfile.scss";

export default function UserProfile() {
    return (
        <div className="user-profile">
            <UserInfo />
            <Interactions />
        </div>
    );
}
