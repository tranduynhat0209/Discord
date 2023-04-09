import React from "react";

import FriendsList from "./FriendsList";
import ActiveList from "./ActiveList";

import "../../../../style/scss/DarkMode/Content/Content.scss";

export default class Content extends React.Component {
    render() {
        return (
            <div className="content">
                <FriendsList />
                <ActiveList />
            </div>
        );
    }
}
