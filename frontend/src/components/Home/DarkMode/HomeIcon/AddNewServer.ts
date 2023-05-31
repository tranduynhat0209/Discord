import { useState } from "react";

export default function AddNewServer() {
    const [showAddServer, setShowAddServer] = useState(false);
    const handleAddClick = () => {
        setShowAddServer(true);
        // console.log(showAddServer);
    };
    return { showAddServer, handleAddClick };
}
