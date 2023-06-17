import "./Account.scss";
import { AppState } from "../../../../store";
import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadUserAvatar, updateSelf } from "../../../../store/users";
export default function Account() {
    const [file, setFile] = useState<File>();
    const dispatch = useDispatch();
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("hello");
        if (e.target.files) {
            setFile(e.target.files[0]);
            console.log(file);
            dispatch(
                //@ts-ignore
                uploadUserAvatar(e.target.files[0])
            );
        }
    };
    const [editingUsername, setEditingUsername] = useState<boolean>(false);
    const [newUsername, setNewUsername] = useState<string>("");
    const handleShowEditingUsername = () => {
        setEditingUsername(true);
    };
    const handleHideEditingUsername = () => {
        setEditingUsername(false);
    };

    const user = useSelector((state: AppState) => state.auth.user);
    // console.log(JSON.stringify(user));
    return (
        <div className="account">
            <div className="header">My Account</div>
            <div className="main">
                <div className="info">
                    <div className="user-info">
                        <div className="header-info">
                            <div className="avatar">
                                <img
                                    src={`${process.env.REACT_APP_CDN_URL}${user?.avatarURL}`}
                                    alt="abc"
                                />
                            </div>
                            <div className="name">{`${user?.username}#${user?.discriminator}`}</div>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                id="upload-avatar"
                            />
                            <label
                                htmlFor="upload-avatar"
                                className="change-avatar"
                                // onClick={() => {
                                //     if (file)
                                //         dispatch(
                                //             //@ts-ignore
                                //             uploadUserAvatar(file)
                                //         );
                                // }}
                            >
                                Change User Avatar
                            </label>
                        </div>
                    </div>
                    <div className="profile">
                        <div className="username">
                            {editingUsername ? (
                                <>
                                    <div className="edit-username">
                                        <label htmlFor="edit-username">
                                            Nhap ten moi cua ban
                                        </label>
                                        <input
                                            type="text"
                                            onChange={(e) =>
                                                setNewUsername(e.target.value)
                                            }
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    console.log(newUsername);
                                                }
                                            }}
                                            value={newUsername}
                                            id="edit-username"
                                        />
                                    </div>
                                    <button
                                        onClick={() => {
                                            dispatch(
                                                //@ts-ignore
                                                updateSelf({
                                                    username: newUsername,
                                                })
                                            );
                                            setNewUsername("");
                                            handleHideEditingUsername();
                                        }}
                                    >
                                        luu
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="name">
                                        <h1>username</h1>
                                        <h2>{`${user?.username}#${user?.discriminator}`}</h2>
                                    </div>
                                    <button onClick={handleShowEditingUsername}>
                                        edit
                                    </button>
                                </>
                            )}
                        </div>
                        <div className="email">
                            <h1>email</h1>
                            <h2>{user?.email}</h2>
                        </div>
                    </div>
                </div>
                <div className="change-password">
                    <div className="title">Password and Authentication</div>
                    <button className="change-password-btn">
                        Change password
                    </button>
                </div>
            </div>
        </div>
    );
}
