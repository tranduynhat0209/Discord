import { useState } from "react";

const useShowHideRoles = () => {
    const [showRole, setShowRole] = useState(false);
    const handleShowRole = () => {
        setShowRole(true);
    };
    const handleHideRole = () => {
        setShowRole(false);
    };
    return { showRole, handleHideRole, handleShowRole };
};

export default useShowHideRoles;
