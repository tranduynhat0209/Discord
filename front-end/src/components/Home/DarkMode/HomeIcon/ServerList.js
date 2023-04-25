import React from "react";
import logo from "../../../../assets/image/logo.png";
import "../../../../style/scss/DarkMode/HomeIcon/HomeIcon.scss";
import Plus from "../../../../assets/image/home/Plus.png";
import Discovery from "../../../../assets/image/home/Discovery.png";

export default class ServerList extends React.Component {
    render() {
        return (
            <ul className="list-avatar">
                <li className="avatar-item">
                    <img className="avatar" src={logo} alt="logo" />
                </li>
                <li className="avatar-item">
                    <img className="avatar" src={logo} alt="logo" />
                </li>
                <li className="avatar-item">
                    <img className="avatar" src={logo} alt="logo" />
                </li>
                <li className="folder-chat">
                    <img className="avatar" src={logo} alt="logo" />
                    <img className="avatar" src={logo} alt="logo" />
                    <img className="avatar" src={logo} alt="logo" />
                    <img className="avatar" src={logo} alt="logo" />
                </li>
                <li className="add-server cover">
                    <img src={Plus} alt="Add server" />
                </li>
                <li className="discovery cover">
                    <img src={Discovery} alt="Discovery" />
                </li>
            </ul>
        );
    }
}
