import { useState } from "react";
import WestIcon from "@mui/icons-material/West";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import NameRole from "./NameRole";
import Permission from "./Permisstion";
import "./EditRole.scss";

export const useShowHideRoles = () => {
    const [showEditRole, setShowEditRole] = useState(false);
    const handleSetShowEditRole = () => {
        setShowEditRole(true);
    };
    const handleSetHideEditRole = () => {
        setShowEditRole(false);
    };
    return { showEditRole, handleSetHideEditRole, handleSetShowEditRole };
};

const permissions = [
    {
        title: "Administrator",
        description:
            "Members with this permission will have every permission and will also bypass all channel specific permissions or restrictions (for example, these members would get access to all private channels). ",
    },
];

export default function EditRoles() {
    return (
        <div className="edit-role--wrap">
            <div className="content">
                <div className="edit-role-sidebar">
                    <div className="sidebar-container">
                        <div className="title-container">
                            <div className="title">
                                <WestIcon className="back-icon" />
                                <div className="text">Back</div>
                            </div>
                            <div className="add-role">
                                <AddIcon className="add-icon" />
                            </div>
                        </div>
                        <div className="list-name-roles">
                            <NameRole nameRole="new role" />
                        </div>
                    </div>
                </div>
                <div className="edit-role-container">
                    <div className="header">
                        <div className="title">Edit role</div>
                        <div className="nav-permissions">Permissions</div>
                        <div className="search-permissions">
                            <input
                                type="text"
                                placeholder="Search permissions"
                            />
                            <SearchIcon className="search-permissions-icon" />
                        </div>
                    </div>
                    <div className="container">
                        {permissions.map((permission) => (
                            <Permission
                                title={permission.title}
                                description={permission.description}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
