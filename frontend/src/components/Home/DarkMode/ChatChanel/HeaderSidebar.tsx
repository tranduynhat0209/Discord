import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";

import useSideBarMenu from "./useSideBarMenu";
import SideBarMenu from "./SideBarMenu";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getGuild } from "../../../../store/guilds";
import { AppState } from "../../../../store";
export default function HeaderSidebar() {
  const { isExpanded, toggleMenu } = useSideBarMenu();
  const ui = useSelector((state: AppState) => state.ui!);
  const guild = ui.activeGuild!;
  return (
    <div className="header-sidebar">
      <div className={`header-title ${isExpanded && "hover"}`}>
        <div onClick={toggleMenu} className="header-container">
          <h2>{guild.name}</h2>
          <button className="menu-sidebar">
            {isExpanded ? (
              <CloseIcon fontSize={"small"} />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </button>
        </div>
        {isExpanded && <SideBarMenu />}
      </div>
    </div>
  );
}
