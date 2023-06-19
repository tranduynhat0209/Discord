import { Box } from "@mui/material";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
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
        <Outlet/>
      </Box>
    </Box>
  );
}

export default ChatChanel;
