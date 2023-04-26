import React from "react";

import MessageItem from "../MessageItem";

export default class UserInfo extends React.Component {
    render() {
        return (
            <div className="user">
                <MessageItem />
                <div className="user-info">
                    <p className="user-name">abc</p>
                    <p className="user-discriminator">#0001</p>
                </div>
            </div>
        );
    }
}
