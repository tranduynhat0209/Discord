import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { AppState } from "../../../../store";

export default function UserInfo() {
  const user = useSelector((state: AppState) => state.auth.user);
  return (
    user && (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src={`${process.env.REACT_APP_CDN_URL}${user?.avatarURL}`}
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            margin: "5px",
          }}
        />

        <p
          style={{
            color: "white",
          }}
        >
          {user?.username + "#" + user?.discriminator}
        </p>
      </Box>
    )
  );
}
