import React from "react";
import Server from "./Server";
import "../../../../style/scss/DarkMode/Servers.scss";

export default function Servers({ ...props }) {
    return (
        <div className="servers-list">
            <h2 className="title">Cộng đồng nổi bật</h2>
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
