import React from "react";
import logo from "../../../../assets/image/logo.png";
import Plus from "../../../../assets/image/home/Plus.png";
import Discovery from "../../../../assets/image/home/Discovery.png";
import Logo from "./Logo";
import { NavLink } from "react-router-dom";
import AddNewServer from "./AddNewServer";

export default function ServerList() {
    const { showAddServer, handleAddClick } = AddNewServer();
    return (
        <ul className="list-avatar">
            <NavLink end to="/kenhchat1">
                <Logo />
            </NavLink>
            <NavLink end to="/kenhchat2">
                <Logo />
            </NavLink>
            <NavLink end to="/kenhchat3">
                <Logo />
            </NavLink>
            <li className="folder-chat">
                <img className="mini-avatar" src={logo} alt="logo" />
                <img className="mini-avatar" src={logo} alt="logo" />
                <img className="mini-avatar" src={logo} alt="logo" />
                <img className="mini-avatar" src={logo} alt="logo" />
            </li>

            <li
                className="add-server plus cover"
                onClick={() => handleAddClick()}
            >
                <img src={Plus} alt="Add server" />
            </li>
            <NavLink to="/discover" className="discovery cover">
                <li className="discovery cover">
                    <img src={Discovery} alt="Discovery" />
                </li>
            </NavLink>
            <span className="line"></span>
            <div className="download cover">
                <li className="download cover">
                    <svg
                        aria-hidden="true"
                        role="img"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                    >
                        <path d="M16.293 9.293L17.707 10.707L12 16.414L6.29297 10.707L7.70697 9.293L11 12.586V2H13V12.586L16.293 9.293ZM18 20V18H20V20C20 21.102 19.104 22 18 22H6C4.896 22 4 21.102 4 20V18H6V20H18Z"></path>
                    </svg>
                </li>
            </div>
        </ul>
    );
}
