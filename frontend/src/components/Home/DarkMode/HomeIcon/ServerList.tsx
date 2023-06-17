import Plus from "../../../../assets/image/home/Plus.png";
import Logo from "./Logo";
import { NavLink } from "react-router-dom";
import AddNewServer from "./AddNewServer";

export default function ServerList() {
    const { showAddServer, handleAddClick } = AddNewServer();
    return (
        <ul className="list-avatar">
            <NavLink end to="kenhchat1">
                <Logo />
            </NavLink>
            <NavLink end to="kenhchat2">
                <Logo />
            </NavLink>
            <NavLink end to="kenhchat3">
                <Logo />
            </NavLink>
            <li
                className="add-server plus cover"
                onClick={() => handleAddClick()}
            >
                <img src={Plus} alt="Add server" />
            </li>
        </ul>
    );
}
