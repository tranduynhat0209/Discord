import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";

import useSideBarMenu from "./useSideBarMenu";
import SideBarMenu from "./SideBarMenu";
export default function HeaderSidebar() {
    const { isExpanded, toggleMenu } = useSideBarMenu();

    return (
        <div className="header-sidebar">
            <div className={`header-title ${isExpanded && "hover"}`}>
                <div onClick={toggleMenu} className="header-container">
                    <div className="title">abc</div>
                    <button className="menu-sidebar">
                        {isExpanded ? (
                            <KeyboardArrowDownIcon />
                        ) : (
                            <CloseIcon fontSize={"small"} />
                        )}
                    </button>
                </div>
                {isExpanded && <SideBarMenu />}
            </div>
        </div>
    );
}
