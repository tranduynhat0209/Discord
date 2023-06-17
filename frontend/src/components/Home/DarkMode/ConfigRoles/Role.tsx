import moveRoleIcon from "../../../../assets/image/role/move.png";
import icon from "../../../../assets/image/role/avata.png";
import PersonIcon from "@mui/icons-material/Person";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import "./Role.scss";
const Role = () => {
    return (
        <div className="role">
            <div className="move-icon">
                <img src={moveRoleIcon} alt="" />
            </div>
            <div className="role-name">
                <div className="icon">
                    <img src={icon} alt="" />
                </div>
                <div className="name">vai tro moi</div>
            </div>
            <div className="member-count" title="View member">
                <span>0</span>
                <PersonIcon className="persion-icon" />
            </div>
            <div className="buttons">
                <div className="edit">
                    <ModeEditIcon />
                </div>
                <div
                    className="more"
                    title="chinh sua
                "
                >
                    <MoreHorizIcon />
                </div>
            </div>
        </div>
    );
};

export default Role;
