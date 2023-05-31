import Category from "./Category";

export default function Categories() {
    return (
        <div className="categories">
            <div className="list-categories">
                <Category path="/discover/home" text="Home" />
                <Category path="/discover/gaming" text="Gaming" />
                <Category path="/discover/amnhac" text="Âm nhạc" />
                <Category path="/discover/giaoduc" text="Giáo dục" />
                <Category
                    path="/discover/khoahoc&congnghe"
                    text="Khoa học & công nghệ"
                />
                <Category path="/discover/giaitri" text="Giải trí" />
                <Category path="/discover/studenthubs" text="Student Hubs" />
            </div>
        </div>
    );
}
