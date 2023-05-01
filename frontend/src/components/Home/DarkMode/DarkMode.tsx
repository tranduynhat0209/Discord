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
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <HomeIcon />
                        <main className="main-chat">
                            <DiscoverCategories />
                            <UserProfile />
                            <DiscoverList />
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
                path="/mc"
                element={
                    <main className="main-chat">
                        <DiscoverCategories />
                        <UserProfile />
                        <DiscoverList />
                    </main>
                }
            ></Route>
        </Routes>
    );
}
