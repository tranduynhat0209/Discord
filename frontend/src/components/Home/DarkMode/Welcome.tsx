import { Box } from "@mui/material";
import discordIcon from "../../../assets/image/home/pngfind.com-discord-icon-png-1187431.png";

export function Welcome() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "#313338",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        style={{
          height: "100px",
        }}
        src={discordIcon}
      />
      <h1
        style={{
          marginTop: "20px",
          color: "white",
        }}
      >
        Welcome to Discord!
      </h1>
    </Box>
  );
}
