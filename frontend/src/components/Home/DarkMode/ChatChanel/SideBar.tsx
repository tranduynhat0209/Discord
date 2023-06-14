import "./SideBar.scss";
import UserProfile from "../UserProfile/UserProfile";
import HeaderSidebar from "./HeaderSidebar";
import ChatChanelNames from "./ChatChanelNames";

export default function SideBar() {
    return (
        <div className="side-bar">
            <HeaderSidebar />
            <ChatChanelNames />
            <UserProfile />
        </div>
    );
}
