import React from "react";
import logo from "../../../../assets/image/logo.png";
import ServerList from "./ServerList";
import "../../../../style/scss/DarkMode/HomeIcon/HomeIcon.scss";

function HomeIcon() {
    return (
        <>
            <div className="home">
                <img className="logo main-logo" src={logo} alt="logo" />
                <ServerList />
            </div>
        </>
    );
}

export default HomeIcon;
