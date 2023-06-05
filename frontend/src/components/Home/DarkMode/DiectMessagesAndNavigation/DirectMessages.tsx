import React from "react";

import UserComponent from "../ReusableComponents/UserConpmonent";

export default function DirectMessages() {
    return (
        <div className="direct-messages">
            <div className="title">
                <h1> Direct Messages</h1>
                <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M6.81615 0.694336H5.56615V5.67684H0.582275V6.92684H5.56615V11.922H6.81615V6.92684H11.8087V5.67684H6.81615V0.694336Z"
                        fill="#B9BBBE"
                    />
                    <path
                        d="M7.00616 0.694336V0.504336H6.81615H5.56615H5.37615V0.694336V5.48684H0.582275H0.392275V5.67684V6.92684V7.11684H0.582275H5.37615V11.922V12.112H5.56615H6.81615H7.00616V11.922V7.11684H11.8087H11.9987V6.92684V5.67684V5.48684H11.8087H7.00616V0.694336Z"
                        stroke="#B9BBBE"
                        strokeWidth="0.38"
                    />
                </svg>
            </div>
            <ul className="messages-list">
                <UserComponent />
                <UserComponent />
                <UserComponent />
            </ul>
        </div>
    );
}
