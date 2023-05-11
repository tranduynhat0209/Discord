import React from "react";
import icon from "../../../../assets/image/home/pngfind.com-discord-icon-png-1187431.png";
import ServerList from "./ServerList";
import "./HomeIcon.scss";

function HomeIcon() {
    return (
        <>
            <div className="home">
                <div className="main-logo">
                    <img src={icon} alt="logo" />
                </div>
                <span className="line"></span>
                <ServerList />
            </div>
        </>
    );
}

export default HomeIcon;
