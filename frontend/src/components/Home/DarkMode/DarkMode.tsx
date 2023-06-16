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
import Download from "./Download/Download";
import useShowDownload from "./Download/useShowDownload";

import "../../../style/scss/DarkMode/DarkMode.scss";

export default function DarkMode() {
    const { showAddServer } = AddNewServer();
    const { showDownload } = useShowDownload();
    return (
        <div className="dark-mode">
            <HomeIcon />
            {showAddServer && <NewServer />}

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
                <Route
                    path="/discover"
                    element={
                        <>
                            <DiscoverCategories />
                            <DiscoverList />
                        </>
                    }
                >
                    <Route
                        path="/discover/home"
                        element={
                            <>
                                {" "}
                                <main className="main-chat">
                                    <DiscoverCategories />
                                    {/* <UserProfile /> */}
                                    <DiscoverList titleSearch="các cộng đồng" />
                                </main>
                            </>
                        }
                    ></Route>
                    <Route
                        path="/discover/gaming"
                        element={
                            <main className="main-chat">
                                <DiscoverCategories />
                                <DiscoverList titleSearch="Khám phá máy chủ gaming" />
                            </main>
                        }
                    ></Route>
                    <Route
                        path="/discover/amnhac"
                        element={
                            <main className="main-chat">
                                <DiscoverCategories />
                                {/* <UserProfile /> */}
                                <DiscoverList titleSearch="Khám phá máy chủ âm nhạc" />
                            </main>
                        }
                    ></Route>
                    <Route
                        path="/discover/giaoduc"
                        element={
                            <main className="main-chat">
                                <DiscoverCategories />
                                {/* <UserProfile /> */}
                                <DiscoverList titleSearch="Khám phá máy chủ giáo dục" />
                            </main>
                        }
                    ></Route>
                    <Route
                        path="/discover/khoahoc&congnghe"
                        element={
                            <main className="main-chat">
                                <DiscoverCategories />
                                <DiscoverList titleSearch="Khám phá máy chủ Khoa Học & Công Nghệ" />
                            </main>
                        }
                    ></Route>
                    <Route
                        path="/discover/giaitri"
                        element={
                            <main className="main-chat">
                                <DiscoverCategories />
                                {/* <UserProfile /> */}
                                <DiscoverList titleSearch="Khám phá máy chủ Giải Trí" />
                            </main>
                        }
                    ></Route>
                    <Route
                        path="/discover/studenthubs"
                        element={
                            <main className="main-chat">
                                <DiscoverCategories />
                                <StudentHubs />
                            </main>
                        }
                    ></Route>
                </Route>
            </Routes>
            {showDownload && <Download />}
        </div>
    );
}
