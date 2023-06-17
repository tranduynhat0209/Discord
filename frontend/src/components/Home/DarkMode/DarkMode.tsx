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
import { AppState } from "../../../store";
import { useSelector } from "react-redux";
import "../../../style/scss/DarkMode/DarkMode.scss";
import { useShowAddServer } from "./AddNewServer/AddNewServer";
import AddNewServer from "./AddNewServer/AddNewServer";
import { useEffect } from "react";

export default function DarkMode() {
    const { hideCreateServer, handleShowCreateServer, handleHideCreateServer } =
        useShowAddServer();
    const guildIds = useSelector(
        (state: AppState) => state.auth.user?.guildIds
    );
    return (
        <div className="dark-mode">
            <HomeIcon hideCreateServer={handleShowCreateServer} />

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

                {guildIds &&
                    guildIds.map((guildIds) => (
                        <Route
                            path={`server/${guildIds}`}
                            key={guildIds}
                            element={
                                <>
                                    <ChatChanel />
                                </>
                            }
                        ></Route>
                    ))}
            </Routes>
            {hideCreateServer && (
                <AddNewServer hideCreateServer={handleHideCreateServer} />
            )}
        </div>
    );
}
