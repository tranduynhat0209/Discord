import React from "react";

import Servers from "./Servers";
import Backsplash from "./Backsplash";

import "./DiscoverList.scss";

export default function DiscoverList({ ...props }) {
    console.log(props);
    return (
        <div className="discover-list">
            <Backsplash
                titleSearch={props.titleSearch ? props.titleSearch : ""}
            />
            <Servers />
        </div>
    );
}
