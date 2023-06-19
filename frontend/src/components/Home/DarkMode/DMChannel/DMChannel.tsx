import { Box } from "@mui/material";
import MainChat from "./MainChat";
import SideBar from "./SideBar";
function ChatChanel() {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
      }}
    >
      <Box height={"100%"} minWidth={"241px"}>
        <SideBar />
      </Box>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <MainChat />
      </Box>
    </Box>
  );
}

export default ChatChanel;
