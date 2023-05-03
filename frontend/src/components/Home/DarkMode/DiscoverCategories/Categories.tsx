import { NavLink, Routes, Route } from "react-router-dom";
import DiscoverList from "../DiscoverList/DiscoverList";
import Category from "./Category";
import DarkMode from "../DarkMode";

export default function Categories() {
    return (
        <div className="categories">
            <div className="list-categories">
                <Category path="/" text="Home" />
                <Category path="/gaming" text="Gaming" />
                <Category path="/amnhac" text="Âm nhạc" />
                <Category path="/giaoduc" text="Giáo dục" />
                <Category
                    path="/khoahoc&congnghe"
                    text="Khoa học & công nghệ"
                />
                <Category path="/giaitri" text="Giải trí" />
                <Category path="/studenthubs" text="Student Hubs" />
                {/* <Routes>
                    <Route
                        path="/"
                        element={<Category path="/" text="Home" />}
                    />
                    <Route
                        path="/gaming"
                        element={<Category path="/gaming" text="Gaming" />}
                    />
                    <Route
                        path="/amnhac"
                        element={<Category text="Âm nhạc" />}
                    />
                    <Route
                        path="/khoahoc-congnghe"
                        element={<Category text="Khoa học & công nghệ" />}
                    />
                </Routes> */}
            </div>
        </div>
    );
}
