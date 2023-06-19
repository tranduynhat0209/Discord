import "./Account.scss";
import { AppState } from "../../../../store";
import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSelf, updateUserAvatar } from "../../../../store/users";
import { Box } from "@mui/material";
export default function Account() {
  const dispatch = useDispatch();
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      dispatch(
        //@ts-ignore
        updateUserAvatar(e.target.files[0])
      );
    }
  };

  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [newUsername, setNewUsername] = useState<string>("");

  const user = useSelector((state: AppState) => state.auth.user);
  // console.log(JSON.stringify(user));
  return (
    <div className="account">
      <div className="header">My Account</div>
      <div>
        <label htmlFor="input-avatar">
          <img
            src={`${process.env.REACT_APP_CDN_URL}${user?.avatarURL}`}
            style={{
              border: "1px solid black",
              width: "100px",
              height: "100px",
              borderRadius: "50%",
            }}
          />
        </label>
        <input
          type="file"
          name=""
          id="input-avatar"
          onChange={handleFileChange}
          style={{
            display: "none",
          }}
        />
      </div>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: "10px",
        }}
      >
        <Box>
          <h3>Username</h3>
          {isUpdating ? (
            <input
              style={{
                backgroundColor: "#1e1f22",
                color: "#d0d3d6",
                border: "none",
                outline: "none",
                height: "40px",
                width: "300px",
                padding: "10px",
              }}
              type="text"
              defaultValue={user?.username}
              onChange={(e) => {
                setNewUsername(e.target.value);
              }}
            />
          ) : (
            <p>{user?.username + "#" + user?.discriminator}</p>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
          }}
        >
          {isUpdating && (
            <button
              style={{
                width: "80px",
                height: "40px",
                marginRight: "5px",
              }}
              onClick={() => {
                // @ts-ignore
                dispatch(updateSelf({ username: newUsername }));
                setIsUpdating(false);
              }}
            >
              Update
            </button>
          )}
          <button
            style={{
              width: "80px",
              height: "40px",
            }}
            onClick={() => setIsUpdating((prev) => !prev)}
          >
            {isUpdating ? "Cancel" : "Edit"}
          </button>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          my: "10px",
        }}
      >
        <Box>
          <h3>Email</h3>
          <p>{user?.email}</p>
        </Box>
      </Box>
    </div>
  );
}
