import React from "react";

import HomeIcon from "./HomeIcon/HomeIcon";
import TopbarNavigation from "./TopbarNavigation/TopbarNavigation";
import DirectMessagesAndNavigation from "./DiectMessagesAndNavigation/DirectMessagesAndNavigation";
import Content from "./Content/Content";

import "../../../style/scss/DarkMode/DarkMode.scss";

export default class DarkMode extends React.Component {
    render() {
        return (
            <>
                <HomeIcon />
                <TopbarNavigation />
                <main className="main-chat">
                    <DirectMessagesAndNavigation />
                    <Content />
                </main>
            </>
        );
    }
}
