import headerLogo from "../../../../assets/image/header-img-home.svg";

export default function Backsplash({ ...props }) {
    console.log("props in blacksplash", props);
    return (
        <div className="back-splash">
            <div className="header">
                <h1 className="title">
                    {`Tìm những cộng đồng dành cho bạn trên Discord`}
                </h1>
                <h2 className="description">
                    From gaming, to music, to learning, there's a place for you.
                </h2>
                <div className="explore-communities">
                    <input
                        type="text"
                        placeholder={
                            props.titleSearch
                                ? `Khám phá ${props.titleSearch}`
                                : ""
                        }
                    />
                </div>
            </div>
            <div className="image">
                <img src={headerLogo} />
            </div>
        </div>
    );
}
