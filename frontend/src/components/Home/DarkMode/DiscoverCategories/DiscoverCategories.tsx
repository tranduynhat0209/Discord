import React from "react";

import Categories from "./Categories";
import UserProfile from "../UserProfile/UserProfile";

import "./DiscoverCategories.scss";

export default function DiscoverCategories() {
    return (
        <div className="discover-categories">
            <h1 className="title">Discover</h1>
            <Categories />
            <UserProfile />
        </div>
    );
}
