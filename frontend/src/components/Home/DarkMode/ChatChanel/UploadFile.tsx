import React, { ChangeEvent } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface FileUploadButtonProps {
    onUpload: (file: File) => void;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({ onUpload }) => {
    const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onUpload(file);
        }
    };

    return (
        <>
            <input
                type="file"
                id="myFileInput"
                onChange={handleFileInputChange}
                style={{ display: "none" }}
            />
            <label htmlFor="myFileInput" title="">
                <CloudUploadIcon />
            </label>
        </>
    );
};

export default FileUploadButton;
