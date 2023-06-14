import SidebarMenuGroup from "./SidebarMenuGroup";
import "./SideBarMenu.scss";

export default function SideBarMenu() {
    return (
        <div className="sidebar-menu">
            <SidebarMenuGroup
                titles={["Nang cap may chu"]}
                activeDefault={[false]}
            />
            <div className="line"></div>
            <SidebarMenuGroup
                titles={["Nang cap may chu", "abc", "def"]}
                activeDefault={[true, false, false]}
            />
            <div className="line"></div>
            <SidebarMenuGroup
                titles={["Nang cap may chu", "mmm"]}
                activeDefault={[false, false]}
            />
            <div className="line"></div>
            <SidebarMenuGroup
                titles={["Nang cap may chu", "ooo"]}
                activeDefault={[false, false]}
            />
        </div>
    );
}
