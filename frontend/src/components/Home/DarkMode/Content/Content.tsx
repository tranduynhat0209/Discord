import React from "react";

import FriendsList from "./FriendsList";
import ActiveList from "./ActiveList";

import "../../../../style/scss/DarkMode/Content/Content.scss";

export default function Content() {
    return (
        <div className="content">
            <FriendsList />
            <ActiveList />
        </div>
    );
}
