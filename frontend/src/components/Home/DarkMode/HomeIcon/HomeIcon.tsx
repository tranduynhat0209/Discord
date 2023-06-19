import React from "react";
import icon from "../../../../assets/image/home/pngfind.com-discord-icon-png-1187431.png";
import ServerList from "./ServerList";
import "./HomeIcon.scss";
import { Link, NavLink } from "react-router-dom";

function HomeIcon() {
  return (
    <>
      <nav className="home">
        <Link to="/main/direct-message">
          <div className="main-logo">
            <img src={icon} alt="logo" />
          </div>
        </Link>
        <span className="line"></span>

        <ServerList />
      </nav>
    </>
  );
}

export default HomeIcon;
