import "./SideBar.scss";
import UserProfile from "../UserProfile/UserProfile";
import ChatChanelNames from "./ChatChanelNames";

export default function SideBar() {
    return (
        <div className="side-bar">
            <ChatChanelNames />
            <UserProfile />
        </div>
    );
}
