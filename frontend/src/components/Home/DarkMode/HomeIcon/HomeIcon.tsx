import React from "react";
import icon from "../../../../assets/image/home/pngfind.com-discord-icon-png-1187431.png";
import ServerList from "./ServerList";
import "./HomeIcon.scss";
import { NavLink } from "react-router-dom";

function HomeIcon() {
    return (
        <>
            <nav className="home">
                <NavLink end to="/">
                    <div className="main-logo">
                        <img src={icon} alt="logo" />
                    </div>
                </NavLink>
                <span className="line"></span>

                <ServerList />
            </nav>
        </>
    );
}

export default HomeIcon;
