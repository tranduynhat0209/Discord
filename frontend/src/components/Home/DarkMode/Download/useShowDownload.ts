import { useState, useRef, useEffect } from "react";

const useShowDownload = () => {
    const [showDownload, setShowDownload] = useState(false);
    const handleShowDownload = () => {
        console.log("show download");
        setShowDownload(true);
    };
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const downloadComponentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                downloadComponentRef.current &&
                !downloadComponentRef.current.contains(event.target as Node) &&
                closeButtonRef.current &&
                !closeButtonRef.current.contains(event.target as Node)
            ) {
                setShowDownload(false);
            }
        };

        const handleButtonClick = () => {
            setShowDownload(true);
        };

        const handleDismissClick = () => {
            setShowDownload(false);
        };

        if (showDownload) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        if (closeButtonRef.current) {
            closeButtonRef.current.addEventListener("click", handleButtonClick);
        }

        if (downloadComponentRef.current) {
            const dismissButton =
                downloadComponentRef.current.querySelector(".close-button");
            if (dismissButton) {
                dismissButton.addEventListener("click", handleDismissClick);
            }
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            if (closeButtonRef.current) {
                closeButtonRef.current.removeEventListener(
                    "click",
                    handleButtonClick
                );
            }
            if (downloadComponentRef.current) {
                const dismissButton =
                    downloadComponentRef.current.querySelector(
                        ".dismiss-button"
                    );
                if (dismissButton) {
                    dismissButton.removeEventListener(
                        "click",
                        handleDismissClick
                    );
                }
            }
        };
    }, [showDownload]);

    return {
        showDownload,
        setShowDownload,
        closeButtonRef,
        downloadComponentRef,
        handleShowDownload,
    };
};

export default useShowDownload;
