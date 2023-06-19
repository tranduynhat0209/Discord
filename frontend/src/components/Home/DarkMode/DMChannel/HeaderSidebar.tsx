import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";

import useSideBarMenu from "./useSideBarMenu";
import SideBarMenu from "./SideBarMenu";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getGuild } from "../../../../store/guilds";
export default function HeaderSidebar() {
  const { isExpanded, toggleMenu } = useSideBarMenu();
  const { guildId } = useParams();
  const guild = useSelector(getGuild(guildId));
  return (
    <div className="header-sidebar">
      <div className={`header-title ${isExpanded && "hover"}`}>
        <div onClick={toggleMenu} className="header-container">
          <div className="title">{guild && guild.name}</div>
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
