import React from "react";
import logo from "../../../../assets/image/logo.png";
import Plus from "../../../../assets/image/home/Plus.png";
import Discovery from "../../../../assets/image/home/Discovery.png";
import Logo from "./Logo";

export default function ServerList() {
    return (
        <ul className="list-avatar">
            <Logo />
            <Logo />
            <Logo />
            <li className="folder-chat">
                <img className="mini-avatar" src={logo} alt="logo" />
                <img className="mini-avatar" src={logo} alt="logo" />
                <img className="mini-avatar" src={logo} alt="logo" />
                <img className="mini-avatar" src={logo} alt="logo" />
            </li>
            <li className="add-server plus cover">
                <img src={Plus} alt="Add server" />
            </li>
            <li className="discovery cover">
                <img src={Discovery} alt="Discovery" />
            </li>
            <span className="line"></span>
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
        </ul>
    );
}
