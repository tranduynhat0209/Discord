import HomeIcon from "./HomeIcon/HomeIcon";
import TopbarNavigation from "./TopbarNavigation/TopbarNavigation";
import DirectMessagesAndNavigation from "./DiectMessagesAndNavigation/DirectMessagesAndNavigation";
import Content from "./Content/Content";
import DiscoverCategories from "./DiscoverCategories/DiscoverCategories";
import UserProfile from "./UserProfile/UserProfile";
import DiscoverList from "./DiscoverList/DiscoverList";
import StudentHubs from "./DiscoverList/StudentHub";
import { Routes, Route, Outlet } from "react-router-dom";
import ChatChanel from "./ChatChanel/ChatChanel";
import AddNewServer from "./HomeIcon/AddNewServer";
import NewServer from "./HomeIcon/NewServer";

import "../../../style/scss/DarkMode/DarkMode.scss";

export default function DarkMode() {
    const { showAddServer } = AddNewServer();
    return (
        <div className="dark-mode">
            <HomeIcon />

            <Outlet />
            <Routes>
                <Route
                    path=""
                    element={
                        <>
                            <div className="main-content">
                                <div className="topbar-nav">
                                    <TopbarNavigation />
                                </div>
                                <div className="chat">
                                    <DirectMessagesAndNavigation />
                                    <Content />
                                </div>
                            </div>
                        </>
                    }
                ></Route>
                <Route
                    path="kenhchat1"
                    element={
                        <>
                            <ChatChanel />
                        </>
                    }
                ></Route>
                <Route
                    path="kenhchat2"
                    element={
                        <>
                            <ChatChanel />
                        </>
                    }
                ></Route>
            </Routes>
        </div>
    );
}
