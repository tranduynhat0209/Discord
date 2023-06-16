import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../store";
import { uploadUserAvatar } from "../../../store/users";

export const Me: React.FunctionComponent = () => {
    const [file, setFile] = useState<File>();
    const dispatch = useDispatch();
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };
    const user = useSelector((state: AppState) => state.auth.user);
    return (
        <div>
            <div>{JSON.stringify(user)}</div>
            <div>
                <input type="file" onChange={handleFileChange} />
            </div>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    //@ts-ignore
                    if (file) dispatch(uploadUserAvatar(file));
                }}
            >
                Change avatar
            </button>
        </div>
    );
};
