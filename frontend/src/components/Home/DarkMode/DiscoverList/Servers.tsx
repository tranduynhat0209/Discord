import React from "react";
import Server from "./Server";
import "../../../../style/scss/DarkMode/Servers.scss";

export default function Servers() {
    return (
        <div className="servers-list">
            <h2 className="title">Featured communities</h2>
            <div className="servers">
                <Server />
                <Server />
                <Server />
                <Server />
                <Server />
            </div>
        </div>
    );
}
