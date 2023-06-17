import "./ConfigRoles.scss";
import SidebarRole from "./SidebarRole";
import DeleteServerForm from "./DeleteServerForm";
import { useDeleteServerForm } from "./DeleteServerForm";
import RolesContainer from "./RolesContainer";

import { useState } from "react";
import EditRoles from "./EditRoles";

const ConfigRoles = () => {
    const [showEditRole, setShowEditRole] = useState(true);
    const handleSetShowEditRole = () => {
        setShowEditRole(true);
    };
    const handleSetHideEditRole = () => {
        setShowEditRole(false);
    };
    const {
        showDeleteServerForm,
        handleShowDeleteServerForm,
        handleHideDeleteServerForm,
    } = useDeleteServerForm();
    return (
        <div className="roles-container">
            <nav className="side-bar">
                <div className="main-sidebar">
                    <div className="header">
                        <h1>May chu cua abc</h1>
                    </div>
                    <div className="group-sidebar-roles">
                        <SidebarRole title="Role" showDeleteServerForm={""} />
                        <SidebarRole
                            title="Delete Server"
                            showDeleteServerForm={handleShowDeleteServerForm}
                        />
                    </div>
                </div>
            </nav>
            {showEditRole ? <EditRoles /> : <RolesContainer />}
            {showDeleteServerForm && (
                <DeleteServerForm
                    hideDeleteServerForm={handleHideDeleteServerForm}
                />
            )}
        </div>
    );
};

export default ConfigRoles;
