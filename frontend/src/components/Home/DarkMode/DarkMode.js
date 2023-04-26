import React from "react";

import HomeIcon from "./HomeIcon/HomeIcon";
// import TopbarNavigation from "./TopbarNavigation/TopbarNavigation";
// import DirectMessagesAndNavigation from "./DiectMessagesAndNavigation/DirectMessagesAndNavigation";
// import Content from "./Content/Content";
import DiscoverCategories from "./DiscoverCategories/DiscoverCategories";
import UserProfile from "./UserProfile/UserProfile";
import DiscoverList from "./DiscoverList/DiscoverList";

import "../../../style/scss/DarkMode/DarkMode.scss";

export default function DarkMode() {
    return (
        <>
            <HomeIcon />
            {/* <TopbarNavigation /> */}
            <main className="main-chat">
                {/* <DirectMessagesAndNavigation /> */}
                {/* <Content /> */}
                <DiscoverCategories />
                <UserProfile />
                <DiscoverList />
            </main>
        </>
    );
}
