import React from "react";

import MessageItem from "../MessageItem";

export default class UserComponent extends React.Component {
    render() {
        return (
            <li className="message-item">
                <MessageItem />
                <div className="message-item-person">
                    <span className="name">Nelly</span>
                    <span className="activity">
                        Listening to&nbsp; <b>Spotify</b>
                        <svg
                            width="11"
                            height="11"
                            viewBox="0 0 11 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6.5 7.80176H2.5V6.80176H6.5V7.80176ZM8.5 5.80176H2.5V4.80176H8.5V5.80176ZM8.5 3.80176H2.5V2.80176H8.5V3.80176ZM9.38889 0.801758H1.61111C0.994444 0.801758 0.5 1.2962 0.5 1.91287V9.69065C0.5 10.3043 0.997461 10.8018 1.61111 10.8018H9.38889C10.0025 10.8018 10.5 10.3043 10.5 9.69065V1.91287C10.5 1.2962 10 0.801758 9.38889 0.801758Z"
                                fill="#8E9297"
                            />
                        </svg>
                    </span>
                </div>
            </li>
        );
    }
}
