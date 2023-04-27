import React from "react";

import Servers from "./Servers";
import Backsplash from "./Backsplash";

import "../../../../style/scss/DarkMode/DiscoverList.scss";

export default function DiscoverList() {
    return (
        <div className="discover-list">
            <Backsplash />
            <Servers />
        </div>
    );
}
