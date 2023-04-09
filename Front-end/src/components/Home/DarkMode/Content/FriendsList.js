import React from "react";

import UserComponent from "../ReusableComponents/UserConpmonent";

export default class FriendsList extends React.Component {
    render() {
        return (
            <div className="friends">
                <div className="title">
                    <p>Online</p> - <span>6</span>
                </div>
                <ul className="list-friends">
                    <UserComponent />
                    <UserComponent />
                    <UserComponent />
                </ul>
            </div>
        );
    }
}
