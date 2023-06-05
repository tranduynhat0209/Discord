import React from "react";

import HomeIcon from "./HomeIcon/HomeIcon";
import TopbarNavigation from "./TopbarNavigation/TopbarNavigation";
import DirectMessagesAndNavigation from "./DiectMessagesAndNavigation/DirectMessagesAndNavigation";
import Content from "./Content/Content";
import DiscoverCategories from "./DiscoverCategories/DiscoverCategories";
import UserProfile from "./UserProfile/UserProfile";
import DiscoverList from "./DiscoverList/DiscoverList";
import { Routes, Route } from "react-router-dom";

import "../../../style/scss/DarkMode/DarkMode.scss";

export default function DarkMode() {
    return (
        <div className="dark-mode">
            <HomeIcon />
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <main className="main-chat">
                                <DiscoverCategories />
                                <UserProfile />
                                <DiscoverList titleSearch="các cộng đồng" />
                            </main>
                        </>
                    }
                >
                    {/* <HomeIcon /> */}
                    {/* <TopbarNavigation /> */}
                    {/* <DirectMessagesAndNavigation /> */}
                    {/* <Content /> */}
                </Route>
                <Route
                    path="/gaming"
                    element={
                        <main className="main-chat">
                            <DiscoverCategories />
                            <UserProfile />
                            <DiscoverList titleSearch="Khám phá máy chủ gaming" />
                        </main>
                    }
                ></Route>
                <Route
                    path="/amnhac"
                    element={
                        <main className="main-chat">
                            <DiscoverCategories />
                            <UserProfile />
                            <DiscoverList titleSearch="Khám phá máy chủ âm nhạc" />
                        </main>
                    }
                ></Route>
                <Route
                    path="/giaoduc"
                    element={
                        <main className="main-chat">
                            <DiscoverCategories />
                            <UserProfile />
                            <DiscoverList titleSearch="Khám phá máy chủ giáo dục" />
                        </main>
                    }
                ></Route>
                <Route
                    path="/khoahoc&congnghe"
                    element={
                        <main className="main-chat">
                            <DiscoverCategories />
                            <UserProfile />
                            <DiscoverList titleSearch="Khám phá máy chủ Khoa Học & Công Nghệ" />
                        </main>
                    }
                ></Route>
                <Route
                    path="/giaitri"
                    element={
                        <main className="main-chat">
                            <DiscoverCategories />
                            <UserProfile />
                            <DiscoverList titleSearch="Khám phá máy chủ Giải Trí" />
                        </main>
                    }
                ></Route>
                <Route
                    path="/studenthubs"
                    element={
                        <main className="main-chat">
                            <DiscoverCategories />
                            <UserProfile />
                        </main>
                    }
                ></Route>
            </Routes>
        </div>
    );
}
