import "./SidebarRole.scss";

const SidebarRole = ({ title, showDeleteServerForm }) => {
    return (
        <div
            className="sidebar-roles"
            onClick={showDeleteServerForm ? showDeleteServerForm : () => {}}
        >
            {title}
        </div>
    );
};

export default SidebarRole;
