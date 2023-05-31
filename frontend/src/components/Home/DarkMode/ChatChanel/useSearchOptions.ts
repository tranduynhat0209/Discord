import { useState, useRef, useEffect } from "react";

function useSearchOptions() {
    const [showOptions, setShowOptions] = useState<boolean>(false);

    const searchItemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchItemRef.current &&
                !searchItemRef.current.contains(event.target as Node)
            ) {
                setShowOptions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchItemRef]);

    const handleSearchItemClick = () => {
        if (showOptions) {
            return;
        }
        setShowOptions(!showOptions);
    };

    return {
        showOptions,
        searchItemRef,
        handleSearchItemClick,
    };
}

export default useSearchOptions;
