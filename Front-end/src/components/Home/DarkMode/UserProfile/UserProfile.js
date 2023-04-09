import React from "react";

import UserInfo from "./UserInfo";
import Interactions from "./Interactions";

import "../../../../style/scss/DarkMode/UserProfile/UserProfile.scss";

export default class UserProfile extends React.Component {
    render() {
        return (
            <div className="user-profile">
                <UserInfo />
                <Interactions />
            </div>
        );
    }
}
