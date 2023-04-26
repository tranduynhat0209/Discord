import React from "react";
import logo from "../../../../assets/image/logo.png";
import ServerList from "./ServerList";
import "../../../../style/scss/DarkMode/HomeIcon/HomeIcon.scss";

class HomeIcon extends React.Component {
    render() {
        return (
            <div className="home">
                <img className="logo main-logo" src={logo} alt="logo" />
                <ServerList />
            </div>
        );
    }
}

export default HomeIcon;
