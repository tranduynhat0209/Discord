import { useState, useEffect, useRef } from "react";
import "./DeleteServerForm.scss";

export const useDeleteServerForm = () => {
    const [showDeleteServerForm, setShowDeleteServerForm] = useState(false);
    const handleShowDeleteServerForm = () => {
        setShowDeleteServerForm(true);
    };
    const handleHideDeleteServerForm = () => {
        setShowDeleteServerForm(false);
    };
    return {
        showDeleteServerForm,
        handleHideDeleteServerForm,
        handleShowDeleteServerForm,
    };
};

export default function DeleteServerForm({ hideDeleteServerForm }) {
    const overlayRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // console.log(overlayRef.current);
            if (
                overlayRef.current &&
                !overlayRef.current.contains(event.target as Node)
            ) {
                hideDeleteServerForm();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [hideDeleteServerForm]);
    // console.log(overlayRef);
    return (
        <div className="overlay-delete-server">
            <div className="delete-server-form" ref={overlayRef}>
                <div className="title">Delete 'abc's server'</div>
                <div className="main">
                    <div className="title">
                        Are you sure you want to delete <b>abc's server</b>?
                        This action cannot be undone
                    </div>
                    <div className="input-server">
                        <label htmlFor="input-server-name">
                            Enter server name
                        </label>
                        <input type="text" id="input-server-name" />
                    </div>
                </div>
                <footer className="footer">
                    <div className="cancel-form" onClick={hideDeleteServerForm}>
                        Cancel
                    </div>
                    <div className="delete">Delete Server</div>
                </footer>
            </div>
        </div>
    );
}
