import React from "react";

import UserComponent from "../ReusableComponents/UserConpmonent";

export default function ActiveList() {
    return (
        <>
            <div className="active-people">
                <h1 className="title">Active now</h1>
                <ul className="list-active">
                    <UserComponent />
                    <UserComponent />
                    <UserComponent />
                </ul>
            </div>
        </>
    );
}