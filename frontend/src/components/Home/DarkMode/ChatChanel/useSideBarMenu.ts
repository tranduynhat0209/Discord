import { useState } from "react";

export default function useSideBarMenu() {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleMenu = () => {
        setIsExpanded(!isExpanded);
    };

    return {
        isExpanded,
        toggleMenu,
    };
}
